<?php

namespace piber\template\blocks;

class BlockHelloWorld {
    static function render($props) {
        return \var_export($props, true);
    }
}
