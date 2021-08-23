import { Flex, FlexBlock, SelectControl } from '@wordpress/components';
import { _x, __ } from '@wordpress/i18n';
import { i18nDomain } from '../../config';

export const Selector = ({ posttype, posttypes, pages, pageid, onChangeType, onChangeId }) => {
    return (
        <Flex>
            <FlexBlock>
                { !posttypes && __('Loading', i18nDomain)}
                { posttypes && posttypes.length === 0 && __('No Post Types found', i18nDomain)}
                { posttypes && posttypes.length > 0 && (
                    <SelectControl
                        label={_x('Post Type', 'Label for post type selector', i18nDomain)}
                        value={posttype || -1}
                        options={[
                            { value: -1, label: __('Select a post type', i18nDomain), disabled: true },
                            ...posttypes.map(p => ({ label: p.label, value: p.name }))
                        ]}
                        onChange={onChangeType}
                    />
                )}
            </FlexBlock>
            <FlexBlock>
                { posttype && !pages && __('Loading', i18nDomain) }
                { posttype && pages && pages.length === 0 && __('No posts found', i18nDomain) }
                { posttype && pages && pages.length > 0 && (
                    <SelectControl
                        label={_x('Post to index children of', 'Label for selecting post', i18nDomain)}
                        value={typeof pageid === 'number' ? pageid : -1}
                        options={[
                            { value: -1, label: __('Select a post', i18nDomain), disabled: true },
                            { value: 0, label: __('Top level', i18nDomain) },
                            ...pages.map(p => ({ label: `${p.title.rendered} (#${p.id})`, value: p.id }))
                        ]}
                        onChange={onChangeId}
                    />
                )}
            </FlexBlock>
        </Flex>
    )
}