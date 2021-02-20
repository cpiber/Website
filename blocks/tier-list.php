<?php

namespace piber\template\blocks;

class BlockTierList extends Block {
    public function __construct() {
        $this->loadModule("tier-list");
    }

    function renderBlock($props, $content) {
        if (!\array_key_exists('list', $props))
            return false;
        $id = "tier-line-" . uniqid();
        
        ?><svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 0; height: 0; overflow: hidden;">
            <defs>
                <pattern id="<?php echo $id; ?>" patternUnits="userSpaceOnUse" x="0" y="0" width="8" height="46">
                    <use xlink:href="#line-segment" href="#line-segment" x="0" y="8" width="8" height="30" />
                </pattern>
            </defs>
        </svg><?php
        foreach ($props['list'] as $item) {
            $item = \array_merge(array(
                'title' => '',
                'text'  => '',
            ), $item);
            if (trim($item['title']) === '') continue;
            $item['text'] = \preg_replace("/([^*])\\*([^*])/", "$1<i class=\"asterisk\"></i>$2", $item['text']);
            ?>
            <div class="<?php echo $this->module->get_class_name('content') ?>">
                <div class="<?php echo $this->module->get_class_name('side') ?>">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <rect fill="url(#<?php echo $id; ?>)" width="8" height="100%" />
                    </svg>
                </div>
                <div class="<?php echo $this->module->get_class_name('item') ?>">
                    <h3 class="<?php echo $this->module->get_class_name('title') ?>"><?php echo $item['title'] ?></h3>
                    <p class="<?php echo $this->module->get_class_name('text') ?>"><?php echo $item['text'] ?></p>
                </div>
            </div>
        <?php }
    }
}
