<?php

namespace piber\template\blocks;

class BlockFootnote extends Block {
    public function __construct() {
        $this->loadModule("footnote");
    }

    function renderBlock($props, $content) {
        $props = \array_merge(array(
            'text'      => '',
        ), $props); // defaults
        if (trim($props['text']) === '')
            return false;
        
        ?>
        <p class="<?php echo $this->module->get_class_name('asterisk') ?>">&#10034;</p>
        <div class="<?php echo $this->module->get_class_name('content') ?>"><?php echo $content ?></div>
    <?php }
}
