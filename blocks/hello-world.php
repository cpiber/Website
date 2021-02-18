<?php

namespace piber\template\blocks;

class BlockHelloWorld extends Block {
    public function __construct() {
        self::loadModule("hello-world");
    }

    function renderBlock($props) {
        \var_dump($props);
        echo "<div class=\"";
        echo self::$module->get_class_name('block');
        echo $props['hasFixedBackground'] ? ' bg-fixed' : '';
        echo "\">Hi!</div>";
    }
}
