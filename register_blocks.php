<?php

namespace piber\template\blocks;

require "blocks/hello-world.php";

function register_blocks($script_base) {
    $base = "theme-piber";

    $blocks = array(
        'hello-world' => array(__NAMESPACE__ . '\BlockHelloWorld', 'render'),
    );

    foreach ($blocks as $block => $render_callback) {
        \register_block_type(
            "$base/$block",
            array(
                'editor_script'   => "$script_base-block-editor",
                'editor_style'    => "$script_base-block-editor",
                'style'           => "$script_base-block",
                'render_callback' => $render_callback,
            )
        );
    }
}
