
import { createBlock } from '@wordpress/blocks';
import {
    create,
    join,
    split,
    toHTMLString, __UNSTABLE_LINE_SEPARATOR
} from '@wordpress/rich-text';
import { blockBase } from '../../config';

const transforms = {
    from: [
        {
            type: 'block',
            blocks: ['core/list'],
            transform: ({ values }) => {
                return createBlock(`${blockBase}/tier-list`, {
                    list: split(
                        create({
                            html: values,
                            multilineTag: 'li',
                            multilineWrapperTags: ['ul', 'ol'],
                        }),
                        __UNSTABLE_LINE_SEPARATOR
                    ).map(piece => {
                        const p = toHTMLString({ value: piece });
                        const match = p.match(/^\s*<b>([^<>]+)<\/b>: (.*)$/i);
                        return match
                            ? { title: match[1], text: match[2] }
                            : { title: p }
                    }),
                });
            },
        },
    ],
    to: [
        {
            type: 'block',
            blocks: ['core/list'],
            transform: ({ list }) => {
                return createBlock('core/list', {
                    values: toHTMLString({
                        value: join(list.map(o => join([create({ html: `<b>${o.title}</b>: ` }), create({ html: o.text })])), __UNSTABLE_LINE_SEPARATOR),
                        multilineTag: 'li'
                    })
                });
            },
        }
    ],
};
export default transforms;