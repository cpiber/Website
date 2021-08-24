import { RichText, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from '@wordpress/blocks';
import { Flex, FlexBlock } from "@wordpress/components";
import { useSelect } from '@wordpress/data';
import { __ } from "@wordpress/i18n";
import { blockBase } from '../../config';
import styles from './style.module.scss';
const { content, side, item, title: sTitle, text: sText } = styles;

registerBlockType(`${blockBase}/tier-item`, {
    apiVersion: 2,
    title: __(
        'Tier Item',
        'theme-piber'
    ),
    description: __(
        'Item element, to be used in the tier list.',
        'theme-piber'
    ),
    category: 'widgets',
    icon: 'marker',
    parent: [`${blockBase}/tier-list`],
    supports: {
        anchor: true,
    },
    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: 'h3',
        },
        text: {
            type: 'array',
            source: 'children',
            selector: 'p',
        },
        id: {
            type: 'string',
        },
    },
    edit: ({ attributes, setAttributes, clientId }) => {
        const blockProps = useBlockProps();
        const { title, text } = attributes;

        const { id } = useSelect(select => {
            const { getBlockRootClientId, getBlockAttributes } = select('core/block-editor');
            const rootId = getBlockRootClientId(clientId);
            return getBlockAttributes(rootId);
        }, [clientId]);
        if (id !== attributes.id) setTimeout(setAttributes, 0, { id });

        return (
            <Flex {...blockProps}>
                <FlexBlock>
                    <RichText
                        label={__('Tier', 'theme-piber')}
                        value={title || ""}
                        onChange={t => setAttributes({ title: t })}
                        placeholder={__('Title', 'theme-piber')}
                        tagName="h3"
                    />
                </FlexBlock>
                <FlexBlock>
                    <RichText
                        label={__('Description', 'theme-piber')}
                        value={text || ""}
                        onChange={t => setAttributes({ text: t })}
                        role='button'
                        placeholder={__('Content', 'theme-piber')}
                        tagName="p"
                    />
                </FlexBlock>
            </Flex>
        )
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: content,
        });
        const { title, text, id } = attributes;
        if (title.trim() === '') return null;
        return (
            <div {...blockProps}>
                <div className={side}>
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <rect fill={`url(#${id})`} width="8" height="100%" />
                    </svg>
                </div>
                <div className={item}>
                    <RichText.Content className={sTitle} value={title} tagName="h3" />
                    <RichText.Content className={sText} value={text} tagName="p" />
                </div>
            </div>
        )
    },
});

