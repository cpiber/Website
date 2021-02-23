import { InspectorControls, MediaPlaceholder, MediaReplaceFlow } from "@wordpress/block-editor";
import { PanelBody, RadioControl, SelectControl, ToggleControl } from "@wordpress/components";
import { _x, __ } from "@wordpress/i18n";
import * as icons from '@wordpress/icons';
import { i18nDomain } from "../../config";

const Inspector = ({ usedashicon, toggleUsedashicon, dashicon, onDashiconChange, iconid, iconurl, onIconChange, border, onBorderChange }) => {
    const dashicons = Object.keys(icons).slice(1); // remove Icon

    return (
        <InspectorControls>
            <PanelBody title={_x('Icon', 'download icon panel title', i18nDomain)}>
                <ToggleControl
                    label={__('Use Dashicon', i18nDomain)}
                    checked={usedashicon}
                    onChange={toggleUsedashicon}
                />
                {usedashicon && (
                    <SelectControl
                        label={__('Select icon', i18nDomain)}
                        value={dashicon}
                        options={dashicons.map(i => ({ label: i }))}
                        onChange={onDashiconChange}
                    />
                )}
                {!usedashicon && iconurl && (
                    <MediaReplaceFlow
                        mediaId={iconid}
                        mediaURL={iconurl}
                        accept="image"
                        onSelect={onIconChange}
                    />
                )}
                {!usedashicon && !iconurl && (
                    <MediaPlaceholder
                        value={{ id: iconid }}
                        mediaId={iconid}
                        mediaURL={iconurl}
                        accept="image"
                        onSelect={onIconChange}
                    />
                )}
            </PanelBody>
            <PanelBody title={_x('Border', 'border panel title', i18nDomain)}>
                <RadioControl
                    label={__('Border style', i18nDomain)}
                    selected={border || 'hidden'}
                    options={[
                        { value: 'hidden', label: __('Hidden', i18nDomain) },
                        { value: 'solid', label: __('Solid', i18nDomain) },
                        { value: 'dashed', label: __('Dashed', i18nDomain) },
                        { value: 'dotted', label: __('Dotted', i18nDomain) },
                    ]}
                    onChange={onBorderChange}
                />
            </PanelBody>
        </InspectorControls>
    );
}
export default Inspector;