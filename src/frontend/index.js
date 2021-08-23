import { i18nDomain } from "../config";
import './style.scss';

/**
 * @type {import('jquery')}
 */
jQuery($ => {
    $(document.body).toggleClass('no-js js');
});

console.log(i18nDomain);