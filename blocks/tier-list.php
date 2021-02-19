<?php

namespace piber\template\blocks;

class BlockTierList extends Block {
    public function __construct() {
        $this->loadModule("tier-list");
    }

    function renderBlock($props) {
        if (!\array_key_exists('list', $props))
            return;
        
        ?><div class="<?php echo $this->module->get_class_name('block') ?>"><?php
        foreach ($props['list'] as $item) {
            $item = \array_merge(array(
                'title' => '',
                'text'  => '',
            ), $item);
            if (trim($item['title']) === '') continue;
            $item['text'] = \preg_replace("/([^*])\\*([^*])/", "$1<i class=\"asterisk\"></i>$2", $item['text']);
            ?>
            <h3 class="<?php echo $this->module->get_class_name('title') ?>"><?php echo $item['title'] ?></h3>
            <p class="<?php echo $this->module->get_class_name('content') ?>"><?php echo $item['text'] ?></p>
        <?php }
        ?></div><?php
    }
}
