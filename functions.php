<?php

namespace piber\website;

\define('piber\THEME_PIBER_L_PATH', __DIR__ . '/languages');

require "register_blocks.php";

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function block_init() {
    $dir = __DIR__;
    $script_base = "theme-piber";

    $script_asset_path = "$dir/build/blocks/index.asset.php";
    if (!file_exists($script_asset_path)) {
        throw new \Error(
            __('You need to run `npm start` or `npm run build` first.', 'theme-piber')
        );
    }
    $index_js     = '/build/blocks/index.js';
    $script_asset = require($script_asset_path);
    \wp_register_script(
        "$script_base-block-editor",
        \get_stylesheet_directory_uri() . $index_js,
        $script_asset['dependencies'],
        $script_asset['version'],
        true
    );
    \wp_set_script_translations("$script_base-block-editor", 'theme-piber', \piber\THEME_PIBER_L_PATH);

    $editor_css = '/build/blocks/index.css';
    \wp_register_style(
        "$script_base-block-editor",
        \get_stylesheet_directory_uri() . $editor_css,
        array(),
        filemtime("$dir/$editor_css")
    );

    $style_css = '/build/blocks/style-index.css';
    if (file_exists($dir . $style_css)) {
        \wp_register_style(
            "$script_base-block",
            \get_stylesheet_directory_uri() . $style_css,
            array(),
            filemtime("$dir/$style_css")
        );
    }

    blocks\register_blocks($script_base);
}
\add_action('init', __NAMESPACE__ . '\block_init');


/**
 * Register scripts and styles
 * Also enqueues parent theme styles
 * 
 * @see https://developer.wordpress.org/themes/advanced-topics/child-themes/#3-enqueue-stylesheet
 */
function enqueue_scripts_styles() {
    $parenthandle = 'mik-style';
    $theme = \wp_get_theme();
    \wp_enqueue_style(
        $parenthandle,
        \get_template_directory_uri() . '/style.css',
        array(), // if the parent theme code has a dependency, copy it to here
        $theme->parent()->get('Version')
    );
    \wp_enqueue_style(
        'child-style',
        \get_stylesheet_uri(),
        array($parenthandle),
        $theme->get('Version') // this only works if you have Version in the style header
    );


    $dir = __DIR__;
    $script_base = "theme-piber";

    $script_asset_path = "$dir/build/frontend/index.asset.php";
    if (!file_exists($script_asset_path)) {
        throw new \Error(
            __('You need to run `npm start` or `npm run build` first.', 'theme-piber')
        );
    }
    $index_js     = '/build/frontend/index.js';
    $script_asset = require($script_asset_path);
    \wp_enqueue_script(
        "$script_base-frontend",
        \get_stylesheet_directory_uri() . $index_js,
        $script_asset['dependencies'],
        $script_asset['version'],
        true
    );
    \wp_set_script_translations("$script_base-frontend", 'theme-piber', \piber\THEME_PIBER_L_PATH);

    $css = '/build/frontend/index.css';
    if (file_exists($dir . $css)) {
        \wp_enqueue_style(
            "$script_base-frontend",
            \get_stylesheet_directory_uri() . $css,
            array(),
            filemtime("$dir/$css")
        );
    }

    $css2 = '/build/frontend/style-index.css';
    if (file_exists($dir . $css2)) {
        \wp_enqueue_style(
            "$script_base-frontend2",
            \get_stylesheet_directory_uri() . $css2,
            array(),
            filemtime("$dir/$css2")
        );
    }

    $modules = '/build/css/modules.css';
    if (file_exists($dir . $modules)) {
        \wp_enqueue_style(
            "$script_base-modules",
            \get_stylesheet_directory_uri() . $modules,
            array(),
            filemtime("$dir/$modules")
        );
    }
}
\add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts_styles');

function body_class($classes) {
    return array_merge($classes, array('no-js'));
}
\add_filter('body_class', __NAMESPACE__ . '\body_class');

function theme_setup() {
    $langdir = get_stylesheet_directory() . '/languages';
    \load_child_theme_textdomain('theme-piber', $langdir);
    \load_theme_textdomain('mik', $langdir); // provide parent translations
}
\add_action('after_setup_theme', __NAMESPACE__ . '\theme_setup');

function script_translation_file($file, $handle, $domain) {
    $d = 'default' === $domain ? '' : $domain . '-';
    $matches = null;
    if (\is_readable($file) || !\preg_match("/^(.*\/${d}de)_[A-Z]{2}(?:_formal)?(-(?:$handle|[a-f0-9]{32})\.json)$/", $file, $matches))
        return $file;
    return $matches[1] . $matches[2]; // fallback to de
}
\add_filter('load_script_translation_file', __NAMESPACE__ . '\script_translation_file', 10, 3);

function textdomain_mofile($file, $domain) {
    $matches = null;
    if (\is_readable($file) || !\preg_match("/^((.*\/)(${domain}-)?de)(_[A-Z]{2}(?:_formal)?)\.mo$/", $file, $matches))
        return $file;
    $file = $matches[2] . $domain . "-de" . $matches[4] . ".mo"; // insert domain (themes don't include domain)
    if ($matches[3] === "" && \is_readable($file))
        return $file;
    $file = $matches[1] . ".mo"; // fallback to de
    if (\is_readable($file))
        return $file;
    $file = $matches[2] . $domain . "-de.mo"; // fallback with domain
    if ($matches[3] === "" && \is_readable($file))
        return $file;
}
\add_filter('load_textdomain_mofile', __NAMESPACE__ . '\textdomain_mofile', 10, 2);

function footer() {
    \fpassthru(\fopen(__DIR__ . "/icons.svg", 'rb'));
}
\add_action('wp_footer', __NAMESPACE__ . '\footer', 99);

function after_switch_theme() {
    /* translators: Demo user role name */
    \add_role('demo', __('Demo', 'theme-piber'), get_role('administrator')->capabilities);
    \wp_insert_user(array(
        'user_login'    => 'demo',
        'user_pass'     => 'demo',
        'role'          => 'demo',
    ));
}
\add_action('after_switch_theme', __NAMESPACE__ . '\after_switch_theme');

function query($query) {
    if (\preg_match("/^\\s*(SELECT|SHOW)/i", $query))
        return $query; // always allow retrieval
    if (\get_current_user_id() !== 0 && \in_array('demo', \wp_get_current_user()->roles))
        return null; // demo role may not change anything
    return $query;
}
\add_filter('query', __NAMESPACE__ . '\query');

function login_errors(\WP_Error $errors) {
    $errors->add('demo',
        /* translators: Message on login screen with username and password for demo user */
        sprintf(__('For a demo user, login with username %1$s and password %1$s', 'theme-piber'), '<code>demo</code>'),
        'message');
    return $errors;
}
\add_filter('wp_login_errors', __NAMESPACE__ . '\login_errors');



/**
 * Class for loading css modules
 * @see https://gist.github.com/jonathantneal/41e2c14e835c5b51727be600bddcfc04
 */
class CSSModule {
    private $collection = array();

    public function __construct(string $css_file) {
        if (!isset($css_file) || !file_exists($css_file)) {
            return false;
        }
        // push the module data into this instance
        $a = include $css_file;
        if (\is_array($this->collection)) $this->collection = $a;
    }

    public function get_class_name(string $class_name): string {
        if (!isset($class_name) || !array_key_exists($class_name, $this->collection)) {
            return false;
        }
        return $this->collection[$class_name];
    }
}
