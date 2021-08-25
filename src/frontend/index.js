import jQuery from 'jquery';
import { acc } from './accordion';
import './style.scss';

jQuery($ => {
    $(document.body).toggleClass('no-js js');
    acc($);
});

