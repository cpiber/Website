import { RichText, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { arrayMove, arrayRemove, List } from 'react-movable';
import { blockBase, i18nDomain } from '../../config';
import './editor.scss';
import { Tier } from './tier';


registerBlockType(`${blockBase}/tier-list`, {
    apiVersion: 2,
    title: __(
        'Tier List',
        i18nDomain
    ),
    description: __(
        'List of tiers.',
        i18nDomain
    ),
    category: 'widgets',
    icon: 'editor-ol',
    supports: {
        html: false,
    },
    attributes: {
        list: {
            type: 'array',
            default: [],
        },
    },
    edit: ({ attributes, setAttributes, isSelected }) => {
        const blockProps = useBlockProps();
        const { list } = attributes;
        return (
            <div {...blockProps}>
                {/* <h2>{__('Tier List', i18nDomain)}</h2> */}
                <List
                    values={list}
                    removableByMove
                    onChange={({ oldIndex, newIndex }) =>
                        setAttributes({ list: newIndex !== -1 ? arrayMove(list, oldIndex, newIndex) : arrayRemove(list, oldIndex) })
                    }
                    renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                    renderItem={({ value, props, index, isDragged }) =>
                        <li {...props} className='tier-list-item'>
                            <Tier
                                value={value}
                                isDragged={isDragged}
                                isSelected={isSelected}
                                onChange={val => {
                                    const newlist = [...list];
                                    newlist[index] = val;
                                    setAttributes({ list: newlist });
                                }}
                                onRemove={() => setAttributes({ list: arrayRemove(list, index) })}
                            ></Tier>
                        </li>
                    }
                />
                { (isSelected || (!isSelected && list.length === 0)) && (
                    <div class="controls">
                        <Button isPrimary onClick={ () => setAttributes({ list: [...list, {}] })}>{__('Add Element', i18nDomain)}</Button>
                        {list.length !== 0 && <Button isLink isDestructive isSmall onClick={ () => setAttributes({ list: [] })}>{__('Clear', i18nDomain)}</Button>}
                    </div>
                )}
            </div>
        );
    },
});
