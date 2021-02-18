<?php

namespace piber\template;

define('THEME_PIBER_DOMAIN', 'theme-piber');

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
            'You need to run `npm start` or `npm run build` first.'
        );
    }
    $index_js     = '/build/blocks/index.js';
    $script_asset = require($script_asset_path);
    \wp_register_script(
        "$script_base-block-editor",
        \get_stylesheet_directory_uri() . $index_js,
        $script_asset['dependencies'],
        $script_asset['version']
    );
    \wp_set_script_translations("$script_base-block-editor", THEME_PIBER_DOMAIN);

    $editor_css = '/build/blocks/index.css';
    \wp_register_style(
        "$script_base-block-editor",
        \get_stylesheet_directory_uri() . $editor_css,
        array(),
        filemtime("$dir/$editor_css")
    );

    $style_css = '/build/blocks/style-index.css';
    if (file_exists($script_asset_path . $style_css)) {
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
            'You need to run `npm start` or `npm run build` first.'
        );
    }
    $index_js     = '/build/frontend/index.js';
    $script_asset = require($script_asset_path);
    \wp_enqueue_script(
        "$script_base-frontend",
        \get_stylesheet_directory_uri() . $index_js,
        $script_asset['dependencies'],
        $script_asset['version']
    );
    \wp_set_script_translations("$script_base-frontend", THEME_PIBER_DOMAIN);

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
}
\add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts_styles');

function theme_setup() {
    load_child_theme_textdomain(THEME_PIBER_DOMAIN, get_stylesheet_directory() . '/languages');
}
\add_action('after_setup_theme', __NAMESPACE__ . '\theme_setup');



/**
 * Class for loading css modules
 * @see https://gist.github.com/jonathantneal/41e2c14e835c5b51727be600bddcfc04
 */
class CSSModule {
    private $collection = array();

    public function __construct($json_file) {
        if (!isset($json_file) || !file_exists($json_file)) {
            return false;
        }
        // push the JSON data into this instance
        $this->collection = json_decode(file_get_contents($json_file), true);
    }

    public function get_class_name($class_name) {
        if (!isset($class_name) || !array_key_exists($class_name, $this->collection)) {
            return false;
        }
        return $this->collection[$class_name];
    }
}
