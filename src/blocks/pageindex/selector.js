import { Flex, FlexBlock, SelectControl } from '@wordpress/components';
import { _x, __ } from '@wordpress/i18n';

export const Selector = ({ posttype, posttypes, pages, pageid, onChangeType, onChangeId }) => {
    return (
        <Flex>
            <FlexBlock>
                { !posttypes && __('Loading', 'theme-piber')}
                { posttypes && posttypes.length === 0 && __('No Post Types found', 'theme-piber')}
                { posttypes && posttypes.length > 0 && (
                    <SelectControl
                        label={_x('Post Type', 'Label for post type selector', 'theme-piber')}
                        value={posttype || -1}
                        options={[
                            { value: -1, label: __('Select a post type', 'theme-piber'), disabled: true },
                            ...posttypes.map(p => ({ label: p.label, value: p.name }))
                        ]}
                        onChange={onChangeType}
                    />
                )}
            </FlexBlock>
            <FlexBlock>
                { posttype && !pages && __('Loading', 'theme-piber') }
                { posttype && pages && pages.length === 0 && __('No posts found', 'theme-piber') }
                { posttype && pages && pages.length > 0 && (
                    <SelectControl
                        label={_x('Post to index children of', 'Label for selecting post', 'theme-piber')}
                        value={typeof pageid === 'number' ? pageid : -1}
                        options={[
                            { value: -1, label: __('Select a post', 'theme-piber'), disabled: true },
                            { value: 0, label: __('Top level', 'theme-piber') },
                            ...pages.map(p => ({ label: `${p.title.rendered} (#${p.id})`, value: p.id }))
                        ]}
                        onChange={onChangeId}
                    />
                )}
            </FlexBlock>
        </Flex>
    )
}