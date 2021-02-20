import { Flex, FlexBlock, FlexItem, TextControl, TextareaControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { i18nDomain } from "../../config";
import { ConditionalExcerpt } from "../excerpt";
import { HandleIcon, RemovableIcon } from "../icons";
import { RichText } from "@wordpress/block-editor";



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
                <TextControl label={__('Tier', i18nDomain)} value={value.title || ""} onChange={updateProp.bind(null, 'title')}></TextControl>
            </ConditionalExcerpt>
        </FlexBlock>
        <FlexBlock>
            <ConditionalExcerpt showExcerpt={!isSelected} value={value.text || ""}>
                <RichText label={__('Description', i18nDomain)} value={value.text || ""} onChange={updateProp.bind(null, 'text')} role='button'></RichText>
            </ConditionalExcerpt>
        </FlexBlock>
        <FlexItem>
            <button onClick={onRemove}>
                <RemovableIcon />
            </button>
        </FlexItem>
    </Flex>
};