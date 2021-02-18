<?php

namespace piber\template\blocks;

require "blocks/hello-world.php";

function register_blocks($script_base) {
    $base = "theme-piber";

    $blocks = array(
        'hello-world' => array(new BlockHelloWorld(), 'render'),
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


abstract class Block {
    private static $script_base = "theme-piber-module-";
    protected static $module = null;

    static function loadModule($name) {
        if (self::$module !== null) {
            return;
        }
        self::$module = new \piber\template\CSSModule(__DIR__ . "/build/css/blocks/$name.module.scss.json");
        \wp_enqueue_style(
            self::$script_base . $name,
            \get_stylesheet_directory_uri() . "/build/css/blocks/$name.module.css",
            array(),
            filemtime(__DIR__ . "/build/css/blocks/$name.module.css")
        );
    }

    function render($props) {
        \ob_start();
        $this->renderBlock($props);
        return \ob_get_clean();
    }

    abstract protected function renderBlock($props);
}
