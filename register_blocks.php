<?php

namespace piber\template\blocks;

require "blocks/tier-list.php";
require "blocks/footnote.php";

function register_blocks($script_base) {
    $base = "theme-piber";

    $blocks = array(
        'tier-list' => new BlockTierList(),
        'footnote'  => new BlockFootnote(),
    );

    foreach ($blocks as $block => $render_callback) {
        \register_block_type(
            "$base/$block",
            array(
                'editor_script'   => "$script_base-block-editor",
                'editor_style'    => "$script_base-block-editor",
                'style'           => "$script_base-block",
                'render_callback' => array($render_callback, 'render'),
            )
        );
    }
}


abstract class Block {
    private static $script_base = "theme-piber-module-";
    private static $modules = array(); // store for all blocks
    protected ?\piber\template\CSSModule $module = null;

    function loadModule(string $name) {
        if (\array_key_exists($name, self::$modules))
            return;
        self::$modules[$name] = new \piber\template\CSSModule(__DIR__ . "/build/css/blocks/$name.module.scss.json");
        $this->module = &self::$modules[$name];
        \wp_enqueue_style(
            self::$script_base . $name,
            \get_stylesheet_directory_uri() . "/build/css/blocks/$name.module.css",
            array(),
            filemtime(__DIR__ . "/build/css/blocks/$name.module.css")
        );
    }

    public static function get_class_name(string $module, string $class_name): string {
        return self::$modules[$module]->get_class_name($class_name);
    }

    function render($props) {
        \ob_start();
        $class = $this->module->get_class_name('block');
        if (\array_key_exists('className', $props)) $class .= " " . $props['className'];
        ?><div class="<?php echo $class ?>"><?php
        if ($this->renderBlock($props) === false) {
            \ob_end_clean();
            return "";
        }
        ?></div><?php
        return \ob_get_clean();
    }

    abstract protected function renderBlock($props);
}
