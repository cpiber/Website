<?php

namespace piber\website\blocks;

class BlockIndex extends Block {
    public function __construct() {
        $this->loadModule("index");
    }

    function renderBlock($props, $content) {
        if (!\array_key_exists('posttype', $props) || !\array_key_exists('pageid', $props))
            return;
        if ($props['pageid'] < 0) $props['pageid'] = 0;
        $posts = \get_posts(array(
            'numberposts'   => -1,
            'post_type'     => $props['posttype'],
            'post_parent'   => $props['pageid'],
            'orderby'       => \array_key_exists('orderby', $props) ? $props['orderby'] : 'ID',
            'order'         => \array_key_exists('order', $props) ? $props['order'] : 'DESC',
        ));
        ?>
        <ul class="<?php $this->module->get_class_name('content') ?> block-index--list"><?php
            foreach ($posts as $post) { ?>
                <li><a href="<?php \the_permalink($post) ?>"><?php echo $post->post_title ?></a></li>
            <?php }
        ?></ul>
    <?php }
}