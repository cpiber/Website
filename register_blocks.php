<?php

namespace piber\template\blocks;

require "blocks/hello-world.php";

function register_blocks($script_base) {
    $base = "theme-piber";

    $blocks = array(
        'hello-world' => new BlockHelloWorld(),
    );

    foreach ($blocks as $block => $render_callback) {
        $atts = array(
            'editor_script'   => "$script_base-block-editor",
            'editor_style'    => "$script_base-block-editor",
            'style'           => "$script_base-block",
        );
        if (\is_string($render_callback) || \is_array($render_callback))
            $atts['render_callback'] = $render_callback; // function or scope
        elseif ($render_callback !== null)
            $atts['render_callback'] = array($render_callback, 'render'); // Block instance
        \register_block_type(
            "$base/$block",
            $atts
        );
    }
}


abstract class Block {
    private static $modules = array(); // store for all blocks
    protected ?\piber\template\CSSModule $module = null;

    function loadModule(string $name) {
        if (\array_key_exists($name, self::$modules))
            return;
        self::$modules[$name] = new \piber\template\CSSModule(__DIR__ . "/build/css/blocks/$name.module.scss.json");
        $this->module = &self::$modules[$name];
    }

    public static function get_class_name(string $module, string $class_name): string {
        return self::$modules[$module]->get_class_name($class_name);
    }

    function render(array $props, string $content) {
        \ob_start();
        $class = $this->module->get_class_name('block');
        if (\array_key_exists('className', $props)) $class .= " " . $props['className'];
        ?><div class="<?php echo $class ?>"><?php
        if ($this->renderBlock($props, $content) === false) {
            \ob_end_clean();
            return "";
        }
        ?></div><?php
        return \ob_get_clean();
    }

    abstract protected function renderBlock(array $props, string $content);
}
