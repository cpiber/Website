import { InspectorAdvancedControls, InspectorControls } from '@wordpress/block-editor';
import { ColorPicker, PanelBody, RadioControl, TextControl, ToggleControl } from '@wordpress/components';
import { _x, __ } from '@wordpress/i18n';
import { Fragment } from 'react';

export const Inspector = ({ name, onChangeName, type, onChangeType, checked, onChangeChecked, color, onChangeColor, hide, onChangeHide }) => {
    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Input', 'theme-piber')}>
                    <RadioControl
                        label={_x('Type', 'Accordion type label.', 'theme-piber')}
                        selected={type || 'checkbox'}
                        onChange={onChangeType}
                        options={[
                            { label: 'Checkbox', value: 'checkbox' },
                            { label: 'Radio', value: 'radio' },
                        ]}
                    />
                    {type === 'radio' && (<TextControl
                        label={_x('Name', 'Accordion name label.', 'theme-piber')}
                        value={name}
                        onChange={onChangeName}
                    />)}
                    <ToggleControl
                        label={_x('Default Open', 'Accordion default open label.', 'theme-piber')}
                        checked={checked}
                        onChange={onChangeChecked}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorAdvancedControls >
                <ToggleControl
                    label={__('Hide content when not selected', 'theme-piber')}
                    checked={hide}
                    onChange={onChangeHide}
                />
                <ColorPicker
                    label={__('Title background and content border', 'theme-piber')}
                    color={color}
                    onChangeComplete={onChangeColor}
                    disableAlpha
                />
            </InspectorAdvancedControls>
        </Fragment>
    )
}