import { RichText } from "@wordpress/block-editor";
import { Flex, FlexBlock, FlexItem, TextControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { ConditionalExcerpt } from "../excerpt";
import { HandleIcon, RemovableIcon } from "../icons";

export const Tier = (props) => {
    const { value, onChange, onRemove, isDragged, isSelected } = props;

    const updateProp = (prop, val) => {
        value[prop] = val;
        onChange(value);
    };
    
    return <Flex>
        <FlexItem>
            <button
                data-movable-handle
                style={{ cursor: isDragged ? 'grabbing' : 'grab' }}
                tabIndex={-1}
            >
                <HandleIcon />
            </button>
        </FlexItem>
        <FlexBlock>
            <ConditionalExcerpt showExcerpt={!isSelected} value={value.title || ""}>
                <TextControl
                    label={__('Tier', 'theme-piber')}
                    value={value.title || ""}
                    onChange={updateProp.bind(null, 'title')}
                />
            </ConditionalExcerpt>
        </FlexBlock>
        <FlexBlock>
            <ConditionalExcerpt showExcerpt={!isSelected} value={value.text || ""}>
                <RichText
                    label={__('Description', 'theme-piber')}
                    value={value.text || ""}
                    onChange={updateProp.bind(null, 'text')}
                    role='button'
                    placeholder={isSelected && __('Content', 'theme-piber')}
                />
            </ConditionalExcerpt>
        </FlexBlock>
        <FlexItem>
            <button onClick={onRemove}>
                <RemovableIcon />
            </button>
        </FlexItem>
    </Flex>
};