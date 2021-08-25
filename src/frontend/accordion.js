
const accInput = '.wp-block-theme-piber-accordion .block-accordion--input';

/**
 * @param {import('jquery')} $ jQuery fn
 */
export const acc = $ => {
    /**
     * @param {HTMLInputElement} e Input
     */
    const setAccHeight = e => {
        const $content = $(e).siblings('[data-accordion-name]');
        $content.css('height', e.checked ? $content.prop('scrollHeight') : 0)
            .parent().toggleClass('closed', !e.checked);
    };

    $(document.body).on('change', accInput, function () {
        if (this.type === 'radio')
            $(`[data-accordion-name="${this.name}"]`).css('height', 0).parent().addClass('closed');
        setAccHeight(this);
    });

    const resetAccHeights = () => $(accInput).each((_, e) => setAccHeight(e));
    $(window).on('resize', resetAccHeights);
    $(accInput).find('img').on('load', resetAccHeights);
    resetAccHeights();

    $('.wp-block-theme-piber-accordion')
        .filter((_, e) => e.nextElementSibling === null || !e.nextElementSibling.classList.contains('wp-block-theme-piber-accordion'))
        .addClass('last-in-group');
}