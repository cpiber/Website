import { InspectorControls, MediaPlaceholder, MediaReplaceFlow } from "@wordpress/block-editor";
import { PanelBody, RadioControl, SelectControl, ToggleControl } from "@wordpress/components";
import { _x, __ } from "@wordpress/i18n";
import * as icons from '@wordpress/icons';

export const Inspector = ({ usedashicon, toggleUsedashicon, dashicon, onDashiconChange, iconid, iconurl, onIconChange, border, onBorderChange }) => {
    const dashicons = Object.keys(icons).slice(1); // remove Icon

    return (
        <InspectorControls>
            <PanelBody title={_x('Icon', 'download icon panel title', 'theme-piber')}>
                <ToggleControl
                    label={__('Use Dashicon', 'theme-piber')}
                    checked={usedashicon}
                    onChange={toggleUsedashicon}
                />
                {usedashicon && (
                    <SelectControl
                        label={__('Select icon', 'theme-piber')}
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
            <PanelBody title={_x('Border', 'border panel title', 'theme-piber')}>
                <RadioControl
                    label={__('Border style', 'theme-piber')}
                    selected={border || 'hidden'}
                    options={[
                        { value: 'hidden', label: __('Hidden', 'theme-piber') },
                        { value: 'solid', label: __('Solid', 'theme-piber') },
                        { value: 'dashed', label: __('Dashed', 'theme-piber') },
                        { value: 'dotted', label: __('Dotted', 'theme-piber') },
                    ]}
                    onChange={onBorderChange}
                />
            </PanelBody>
        </InspectorControls>
    );
}