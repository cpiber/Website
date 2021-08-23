<?php

namespace piber\template\blocks;

class BlockHelloWorld extends Block {
    public function __construct() {
        $this->loadModule("hello-world");
    }

    function renderBlock($props, $content) {
        $props = \array_merge(array(
            'className' => '',
        ), $props); // defaults
        \var_dump($props);
    }
}
