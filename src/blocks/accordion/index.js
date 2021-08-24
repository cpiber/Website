import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { _x, __ } from '@wordpress/i18n';
import uniqueString from 'unique-string';
import { blockBase } from '../../config';
import eStyles from './editor.module.scss';
import { Inspector } from './inspector';
import styles from './style.module.scss';
const { title: eTitle, inner } = eStyles;
const { heading, input, content } = styles;

registerBlockType(`${blockBase}/accordion`, {
    apiVersion: 2,
    title: _x(
        'Accordion',
        'block title',
        'theme-piber'
    ),
    description: __(
        'Expandable accordion.',
        'theme-piber'
    ),
    category: 'widgets',
    icon: 'table-row-after',
    supports: {
        anchor: true,
    },
    attributes: {
        id: {
            type: 'string',
            source: 'attribute',
            selector: 'input',
            attribute: 'id',
        },
        title: {
            type: 'string',
            source: 'html',
            selector: 'h2',
        },
        name: {
            type: 'string',
            source: 'attribute',
            selector: 'input',
            attribute: 'name',
        },
        type: {
            enum: ['checkbox', 'radio'],
            source: 'attribute',
            selector: 'input',
            attribute: 'type',
        },
        checked: {
            type: 'boolean',
            source: 'attribute',
            selector: 'input',
            attribute: 'checked',
        },
        color: {
            type: 'string',
            default: '#cecece',
        },  
        hide: {
            type: 'boolean',
        },
    },
    edit: ({ attributes, setAttributes, isSelected, clientId }) => {
        const blockProps = useBlockProps();
        const { title, name, type, checked, color, hide } = attributes;
        const isParentOfSelectedBlock = useSelect(select => select('core/block-editor').hasSelectedInnerBlock(clientId, true));

        return (
            <div {...blockProps}>
                <RichText
                    placeholder={__('Title', 'theme-piber')}
                    value={title}
                    onChange={t => setAttributes({ title: t })}
                    tagName='h2'
                    className={eTitle}
                    style={{ backgroundColor: color }}
                />
                <div className={inner} style={{ borderColor: color }}>
                    {isSelected || isParentOfSelectedBlock || !hide ? (<InnerBlocks />) : (<span>...</span>)}
                </div>
                <Inspector
                    name={name}
                    type={type}
                    checked={checked}
                    color={color}
                    hide={hide}
                    onChangeName={n => setAttributes({ name: n })}
                    onChangeType={t => setAttributes({ type: t })}
                    onChangeChecked={c => setAttributes({ checked: !!c })}
                    onChangeColor={c => setAttributes({ color: c })}
                    onChangeHide={h => setAttributes({ hide: !!h })}
                />
            </div>
        )
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
        const { title, name, type, checked, color } = attributes;
        const id = attributes.id || uniqueString();
 
        return (
            <div {...blockProps}>
                <input
                    id={id}
                    className={`${input} block-accordion--input`}
                    type={type || 'checkbox'}
                    name={name}
                    checked={checked}
                />
                <label for={id}>
                    <RichText.Content
                        value={title}
                        tagName='h2'
                        className={`${heading} block-accordion--heading`}
                        style={{ backgroundColor: color }}
                    />
                </label>
                <div className={`${content} block-accordion--content`} data-accordion-name={name || true} style={{ borderColor: color }}>
                    <InnerBlocks.Content />
                </div>
            </div>
        )
    },
})