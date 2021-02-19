<?php

namespace piber\template\blocks;

class BlockHelloWorld extends Block {
    public function __construct() {
        self::loadModule("hello-world");
    }

    function renderBlock($props) {
        $props = \array_merge(array(
            
        ), $props); // defaults
        \var_dump($props);
    }
}
