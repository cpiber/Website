import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { _x, __ } from '@wordpress/i18n';

export const Inspector = ({ orderby, order, onChangeOrderBy, onChangeOrder }) => {
    return (
        <InspectorControls>
            <PanelBody title={__('Ordering', 'theme-piber')}>
                <SelectControl
                    label={_x('Order by', 'Label for selecting order of posts', 'theme-piber')}
                    value={orderby}
                    options={[
                        { label: __('ID', 'theme-piber'), value: 'ID' },
                        { label: __('Title', 'theme-piber'), value: 'title' },
                        { label: __('Name', 'theme-piber'), value: 'name' },
                        { label: __('Date', 'theme-piber'), value: 'date' },
                        { label: __('Modified', 'theme-piber'), value: 'modified' },
                        { label: __('Menu order', 'theme-piber'), value: 'menu_order' },
                    ]}
                    onChange={onChangeOrderBy}
                />
                <SelectControl
                    label={_x('Order', 'Label for selecting order of posts', 'theme-piber')}
                    value={order}
                    options={[
                        { label: __('Descending', 'theme-piber'), value: 'DESC' },
                        { label: __('Ascending', 'theme-piber'), value: 'ASC' },
                    ]}
                    onChange={onChangeOrder}
                />
            </PanelBody>
        </InspectorControls>
    )
}