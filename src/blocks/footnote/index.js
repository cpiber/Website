import { RichText, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { _x, __ } from '@wordpress/i18n';
import { blockBase } from '../../config';
import eStyles from './editor.module.scss';
import styles from './style.module.scss';
import transforms from './transforms';
const { pre, content: eContent } = eStyles;
const { asterisk, block, content } = styles;

registerBlockType(`${blockBase}/footnote`, {
    apiVersion: 2,
    title: _x(
        'Footnote',
        'block title',
        'theme-piber'
    ),
    description: __(
        'Puts an asterisk and small text.',
        'theme-piber'
    ),
    category: 'widgets',
    icon: 'warning',
    // supports: {
    //     html: false,
    // },
    example: {
        attributes: {
            /* translators: Footnote block example */
            text: `<p>${__('Some Footnote text', 'theme-piber')}</p>`,
        },
    },
    transforms,
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
                <FlexBlock className={eContent}>
                    <RichText
                        value={text}
                        tagName='p'
                        onChange={val => setAttributes({ text: val })}
                        placeholder={_x('Footnote', 'placeholder', 'theme-piber')}
                    ></RichText>
                </FlexBlock>
            </Flex>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: block
        });
        const { text } = attributes;
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