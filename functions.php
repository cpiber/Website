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

    $script_asset_path = "$dir/build/index.asset.php";
    if (!file_exists($script_asset_path)) {
        throw new \Error(
            'You need to run `npm start` or `npm run build` first.'
        );
    }
    $index_js     = '/build/index.js';
    $script_asset = require($script_asset_path);
    \wp_register_script(
        "$script_base-block-editor",
        \get_stylesheet_directory_uri() . $index_js,
        $script_asset['dependencies'],
        $script_asset['version']
    );
    \wp_set_script_translations("$script_base-block-editor", THEME_PIBER_DOMAIN);

    $editor_css = '/build/index.css';
    \wp_register_style(
        "$script_base-block-editor",
        \get_stylesheet_directory_uri() . $editor_css,
        array(),
        filemtime("$dir/$editor_css")
    );

    $style_css = '/build/style-index.css';
    \wp_register_style(
        "$script_base-block",
        \get_stylesheet_directory_uri() . $style_css,
        array(),
        filemtime("$dir/$style_css")
    );

    blocks\register_blocks($script_base);
}
\add_action('init', __NAMESPACE__ . '\block_init');


function enqueue_styles() {
    // https://developer.wordpress.org/themes/advanced-topics/child-themes/#3-enqueue-stylesheet
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
}
\add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_styles');

function theme_setup() {
    load_child_theme_textdomain(THEME_PIBER_DOMAIN, get_stylesheet_directory() . '/languages');
}
\add_action('after_setup_theme', __NAMESPACE__ . '\theme_setup');
