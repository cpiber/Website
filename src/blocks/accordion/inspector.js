import { InspectorAdvancedControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RadioControl, TextControl, ToggleControl } from '@wordpress/components';
import { _x, __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { i18nDomain } from '../../config';

export const Inspector = ({ name, onChangeName, type, onChangeType, checked, onChangeChecked, hide, onChangeHide }) => {
    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Input', i18nDomain)}>
                    <RadioControl
                        label={_x('Type', 'Accordion type label.', i18nDomain)}
                        selected={type || 'checkbox'}
                        onChange={onChangeType}
                        options={[
                            { label: 'Checkbox', value: 'checkbox' },
                            { label: 'Radio', value: 'radio' },
                        ]}
                    />
                    {type === 'radio' && (<TextControl
                        label={_x('Name', 'Accordion name label.', i18nDomain)}
                        value={name}
                        onChange={onChangeName}
                    />)}
                    <ToggleControl
                        label={_x('Default Open', 'Accordion default open label.', i18nDomain)}
                        checked={checked}
                        onChange={onChangeChecked}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorAdvancedControls >
                <ToggleControl
                    label={__('Hide content when not selected', i18nDomain)}
                    checked={hide}
                    onChange={onChangeHide}
                />
            </InspectorAdvancedControls>
        </Fragment>
    )
}