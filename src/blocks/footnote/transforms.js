import { createBlock } from '@wordpress/blocks';
import { blockBase } from '../../config';

const transforms = {
    from: [
        {
            type: 'block',
            blocks: ['core/paragraph'],
            transform: ({ content: text }) => {
                return createBlock(`${blockBase}/footnote`, {
                    text,
                });
            },
        },
        {
            type: 'prefix',
            prefix: '*',
            transform: text => {
                return createBlock(`${blockBase}/footnote`, {
                    text: `<p>${text}</p>`,
                });
            },
            priority: 5,
        }
    ],
    to: [
        {
            type: 'block',
            blocks: ['core/paragraph'],
            transform: ({ text }) => {
                return createBlock('core/paragraph', {
                    content: text,
                });
            },
        }
    ]
};
export default transforms;