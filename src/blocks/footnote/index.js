import { RichText, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType, createBlock } from '@wordpress/blocks';
import { Flex, FlexBlock, FlexItem } from "@wordpress/components";
import { __ } from '@wordpress/i18n';
import { blockBase, i18nDomain } from '../../config';
import { pre } from './editor.module.scss';
import { block, asterisk, content } from "./style.module.scss";

registerBlockType(`${blockBase}/footnote`, {
    apiVersion: 2,
    title: __(
        /* translators: Footnote block title */
        'Footnote',
        i18nDomain
    ),
    description: __(
        'Puts an asterisk and small text.',
        i18nDomain
    ),
    category: 'widgets',
    icon: 'warning',
    // supports: {
    //     html: false,
    // },
    example: {
        attributes: {
            /* translators: Footnote block example */
            text: `<p>${__('Some Footnote text', i18nDomain)}</p>`,
        },
    },
    transforms: {
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
    },
    attributes: {
        text: {
            type: 'string',
            default: '',
            source: 'html',
            selector: `.${content} p`
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { text } = attributes;
        return (
            <Flex {...blockProps}>
                <FlexItem className={pre}>[&#10034;]</FlexItem>
                <FlexBlock>
                    <RichText
                        value={text}
                        tagName='p'
                        onChange={val => setAttributes({ text: val })}
                        placeholder={__('Footnote', i18nDomain)}
                    ></RichText>
                </FlexBlock>
            </Flex>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
        const { text } = attributes;
        blockProps.className += ` ${block}`;
        return (
            <div {...blockProps}>
                <p className={asterisk}>&#10034;</p>
                <div className={content}>
                    <RichText.Content value={text || ''} tagName='p'></RichText.Content>
                </div>
            </div>
        );
    },
});