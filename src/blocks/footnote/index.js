import { RichText, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Flex, FlexBlock, FlexItem } from "@wordpress/components";
import { __ } from '@wordpress/i18n';
import { blockBase, i18nDomain } from '../../config';
import './editor.scss';

registerBlockType(`${blockBase}/footnote`, {
    apiVersion: 2,
    title: __(
        'Footnote',
        i18nDomain
    ),
    description: __(
        'Puts an asterisk and small text.',
        i18nDomain
    ),
    category: 'widgets',
    icon: 'warning',
    supports: {
        html: false,
    },
    attributes: {
        text: {
            type: 'string',
            default: '',
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { text } = attributes;
        return (
            <Flex {...blockProps}>
                <FlexItem className='pre'>[&#10034;]</FlexItem>
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
    }
});