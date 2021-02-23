import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useSelect, withSelect } from '@wordpress/data';
import { _x, __ } from '@wordpress/i18n';
import { blockBase, i18nDomain } from '../../config';
import { Selector } from './selector';

registerBlockType(`${blockBase}/index`, {
    apiVersion: 2,
    title: _x(
        'Index',
        'block title',
        i18nDomain
    ),
    description: __(
        'Displays all children of selected page as an index.',
        i18nDomain
    ),
    category: 'widgets',
    icon: 'admin-page',
    attributes: {
        posttype: {
            type: 'string',
        },
        pageid: {
            type: 'number',
        },
        orderby: {
            type: 'string',
            default: 'ID',
        },
        order: {
            type: 'string',
            default: 'DESC',
        },
    },
    edit: withSelect(select => ({
        posttypes: select('core').getEntitiesByKind('postType'),
    }))(({ attributes, setAttributes, posttypes }) => {
        const blockProps = useBlockProps();
        const { posttype, pageid, orderby, order } = attributes;
        if (posttypes)
            posttypes = posttypes.filter(p => p.name !== 'attachment' && p.name != 'wp_block');
        const pages = useSelect(select => select('core').getEntityRecords('postType', posttype), [posttype]);

        return (
            <div {...blockProps}>
                <Selector
                    posttype={posttype}
                    posttypes={posttypes}
                    pages={pages}
                    pageid={pageid}
                    onChangeType={t => setAttributes({ posttype: t})}
                    onChangeId={i => setAttributes({ pageid: i })}
                    />
                <InspectorControls>
                    <PanelBody title={__('Ordering', i18nDomain)}>
                        <SelectControl
                            label={_x('Order by', 'Label for selecting order of posts', i18nDomain)}
                            value={orderby}
                            options={[
                                { label: __('ID', i18nDomain), value: 'ID' },
                                { label: __('Title', i18nDomain), value: 'title' },
                                { label: __('Name', i18nDomain), value: 'name' },
                                { label: __('Date', i18nDomain), value: 'date' },
                                { label: __('Modified', i18nDomain), value: 'modified' },
                                { label: __('Menu order', i18nDomain), value: 'menu_order' },
                            ]}
                            onChange={o => setAttributes({ orderby: o })}
                            />
                        <SelectControl
                            label={_x('Order', 'Label for selecting order of posts', i18nDomain)}
                            value={order}
                            options={[
                                { label: __('Descending', i18nDomain), value: 'DESC' },
                                { label: __('Ascending', i18nDomain), value: 'ASC' },
                            ]}
                            onChange={o => setAttributes({ order: o })}
                            />
                    </PanelBody>
                </InspectorControls>
            </div>
        )

    }),
});