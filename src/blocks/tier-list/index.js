import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { _n, __ } from '@wordpress/i18n';
import { arrayMove, arrayRemove, List } from 'react-movable';
import { blockBase } from '../../config';
import styles from './editor.module.scss';
import { Tier } from './tier';
import transforms from "./transforms";
const { block, controls, item } = styles;

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
        attributes: {
            list: [
                {
                    title: _n('Title {0}', 'Title {0}', 1, 'theme-piber').format(1),
                    text: __('Some text', 'theme-piber')
                },
                {
                    title: _n('Title {0}', 'Title {0}', 2, 'theme-piber').format(2),
                    text: __('Some more text', 'theme-piber')
                },
            ],
        },
    },
    transforms,
    attributes: {
        list: {
            type: 'array',
            default: [],
        },
    },
    edit: ({ attributes, setAttributes, isSelected }) => {
        const blockProps = useBlockProps();
        const { list } = attributes;
        blockProps.className += ` ${block}`;
        return (
            <div {...blockProps}>
                {/* <h2>{__('Tier List', 'theme-piber')}</h2> */}
                <List
                    values={list}
                    removableByMove
                    onChange={({ oldIndex, newIndex }) =>
                        setAttributes({ list: newIndex !== -1 ? arrayMove(list, oldIndex, newIndex) : arrayRemove(list, oldIndex) })
                    }
                    renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                    renderItem={({ value, props, index, isDragged }) =>
                        <li {...props} className={item}>
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
                    <div class={controls}>
                        <Button isPrimary onClick={() => setAttributes({ list: [...list, {}] })}>{__('Add Element', 'theme-piber')}</Button>
                        {list.length !== 0 && <Button isLink isDestructive isSmall onClick={() => setAttributes({ list: [] })}>{__('Clear', 'theme-piber')}</Button>}
                    </div>
                )}
            </div>
        );
    },
});
