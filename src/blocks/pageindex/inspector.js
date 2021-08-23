import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { _x, __ } from '@wordpress/i18n';
import { i18nDomain } from '../../config';

export const Inspector = ({ orderby, order, onChangeOrderBy, onChangeOrder }) => {
    return (
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
                    onChange={onChangeOrderBy}
                />
                <SelectControl
                    label={_x('Order', 'Label for selecting order of posts', i18nDomain)}
                    value={order}
                    options={[
                        { label: __('Descending', i18nDomain), value: 'DESC' },
                        { label: __('Ascending', i18nDomain), value: 'ASC' },
                    ]}
                    onChange={onChangeOrder}
                />
            </PanelBody>
        </InspectorControls>
    )
}