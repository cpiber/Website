import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { blockBase, i18nDomain } from '../../config';
import './editor.scss';
import './style.scss';

registerBlockType(`${blockBase}/hello-world`, {
    apiVersion: 2,
    title: __(
        'Hello World',
        i18nDomain
    ),
    description: __(
        'Example block written with ESNext standard and JSX support – build step required.',
        i18nDomain
    ),
    category: 'widgets',
    icon: 'smiley',
    supports: {
        html: false,
    },
    attributes: {
        hasFixedBackground: {
            type: 'boolean',
            default: false
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { hasFixedBackground } = attributes;
        const toggleFixedBackground = () => setAttributes({ hasFixedBackground: !hasFixedBackground });
        if (hasFixedBackground) blockProps.className += ' bg-fixed';
        return (
            <div {...blockProps}>
                <ToggleControl
                    label="Fixed Background"
                    help={hasFixedBackground ? 'Has fixed background.' : 'No fixed background.'}
                    checked={hasFixedBackground}
                    onChange={toggleFixedBackground}
                />
                <p>{__('Hello World!', i18nDomain)}</p>
            </div>
        );
    },
});
