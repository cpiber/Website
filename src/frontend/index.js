import jQuery from 'jquery';
import './style.scss';

const accInput = '.wp-block-theme-piber-accordion .block-accordion--input';

jQuery($ => {
    /**
     * @param {HTMLInputElement} e Input
     */
    const setAccHeight = e => {
        const $content = $(e).siblings('[data-accordion-name]');
        $content.css('height', e.checked ? $content.get(0).scrollHeight : 0)
            .parent().toggleClass('closed', !e.checked);
    };

    $(document.body).toggleClass('no-js js')
        .on('change', accInput, function () {
            if (this.type === 'radio')
                $(`[data-accordion-name="${this.name}"]`).css('height', 0).parent().addClass('closed');
            setAccHeight(this);
        });
    $(accInput).each((_, e) => setAccHeight(e));
    $('.wp-block-theme-piber-accordion')
        .filter((_, e) => e.nextElementSibling === null || !e.nextElementSibling.classList.contains('wp-block-theme-piber-accordion'))
        .addClass('last-in-group');
});

