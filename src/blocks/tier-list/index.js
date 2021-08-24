import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { sprintf, _n, __ } from '@wordpress/i18n';
import uniqueString from 'unique-string';
import { blockBase } from '../../config';
import styles from './style.module.scss';
import './tier';
const { block } = styles;

registerBlockType(`${blockBase}/tier-list`, {
    apiVersion: 2,
    title: __(
        'Tier List',
        'theme-piber'
    ),
    description: __(
        'List of tiers.',
        'theme-piber'
    ),
    category: 'widgets',
    icon: 'editor-ol',
    example: {
        innerBlocks: [
            {
                name: `${blockBase}/tier-item`,
                attributes: {
                    /** translators: Title numbers (list of example titles) */
                    title: sprintf(_n('Title %d', 'Title %d', 1, 'theme-piber'), 1),
                    text: __('Some text', 'theme-piber'),
                },
            },
            {
                name: `${blockBase}/tier-item`,
                attributes: {
                    title: sprintf(_n('Title %d', 'Title %d', 2, 'theme-piber'), 2),
                    text: __('Some more text', 'theme-piber'),
                },
            },
        ],
    },
    attributes: {
        id: {
            type: 'string',
            source: 'attribute',
            selector: 'pattern',
            attribute: 'id',
        }
    },
    edit: ({ clientId }) => {
        const blockProps = useBlockProps();
        // https://github.com/WordPress/gutenberg/blob/1971a3c205b56879683c2a9e426c4c3cdba805ac/packages/block-library/src/column/edit.js#L46
        const hasChildBlocks = useSelect(select => select('core/block-editor').getBlockOrder(clientId).length > 0, [clientId]);
        return (
            <div {...blockProps}>
                <InnerBlocks
                    allowedBlocks={[`${blockBase}/tier-item`]}
                    renderAppender={hasChildBlocks ? undefined : InnerBlocks.ButtonBlockAppender}
                />
            </div>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: block,
        });
        const id = attributes.id || uniqueString();
        return (
            <div {...blockProps}>
                <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 0; height: 0; overflow: hidden;">
                    <defs>
                        <pattern id={id} patternUnits="userSpaceOnUse" x="0" y="0" width="8" height="46">
                            <use href="#line-segment" x="0" y="8" width="8" height="30" />
                        </pattern>
                    </defs>
                </svg>
                <InnerBlocks.Content />
            </div>
        );
    },
});
