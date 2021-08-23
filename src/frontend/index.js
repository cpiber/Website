import './style.scss';

const accInput = '.wp-block-theme-piber-accordion .block-accordion--input';

/**
 * @type {import('jquery')}
 */
jQuery($ => {
    /**
     * @param {HTMLInputElement} e Input
     */
    const setAccHeight = e => {
        const $content = $(e).siblings('[data-accordion-name]');
        $content.css('height', e.checked ? $content.get(0).scrollHeight : 0);
    };

    $(document.body).toggleClass('no-js js')
        .on('change', accInput, function () {
            if (this.type === 'radio')
                $(`[data-accordion-name="${this.name}"]`).css('height', 0);
            setAccHeight(this);
        });
    $(accInput).each((_, e) => setAccHeight(e));
});

