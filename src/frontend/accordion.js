if (!window.ResizeObserver) window.ResizeObserver = function() { return { observe: () => { /* to avoid errors */ } } };

const accInput = '.wp-block-theme-piber-accordion .block-accordion--input';

/**
 * @param {import('jquery')} $ jQuery fn
 */
export const acc = $ => {
    /**
     * @param {HTMLInputElement} e Input
     */
    const setAccHeight = e => {
        const $content = $(e).siblings('.block-accordion--content');
        const h = e.checked ? $content.prop('scrollHeight') : 0;
        $content.toggleClass('in-transition', h !== Math.round($content.height())).css('height', h)
            .parent().toggleClass('closed', !e.checked);
    };

    $(document.body).on('change', accInput, function () {
        if (this.type === 'radio')
            $(`[name="${this.name}"][type=radio]`).parent().addClass('closed').children('.block-accordion--content').css('height', 0);
        setAccHeight(this);
    }).on('transitionend', '.block-accordion--content', function () {
        $(this).removeClass('in-transition');
    });

    const resetAccHeights = () => $(accInput).each((_, e) => {
        $(e).siblings('.block-accordion--content').css('height', '');
        setTimeout(setAccHeight, 0, e);
    });
    $(window).on('resize', resetAccHeights);
    const observer = new ResizeObserver(resetAccHeights);
    $('.block-accordion--content').each((_, e) => observer.observe(e.firstElementChild)).find('img').on('load', resetAccHeights);
    resetAccHeights();

    $('.wp-block-theme-piber-accordion')
        .filter((_, e) => e.nextElementSibling === null || !e.nextElementSibling.classList.contains('wp-block-theme-piber-accordion'))
        .addClass('last-in-group');
    
    const expandHash = () => $(location.hash).filter('.wp-block-theme-piber-accordion').find('input:not(:checked)').trigger('click');
    $(window).on('hashchange', expandHash);
    expandHash();
}