import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { _x, __ } from '@wordpress/i18n';
import { blockBase } from '../../config';
import { Inspector } from './inspector';
import { Selector } from './selector';

registerBlockType(`${blockBase}/index`, {
    apiVersion: 2,
    title: _x(
        'Index',
        'block title',
        'theme-piber'
    ),
    description: __(
        'Displays all children of selected page as an index.',
        'theme-piber'
    ),
    category: 'widgets',
    icon: 'admin-page',
    supports: {
        anchor: true,
    },
    attributes: {
        posttype: {
            type: 'string',
        },
        pageid: {
            type: 'number',
        },
        orderby: {
            type: 'string',
            default: 'ID',
        },
        order: {
            type: 'string',
            default: 'DESC',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { posttype, pageid, orderby, order } = attributes;
        const posttypes = useSelect(select => select('core').getEntitiesByKind('postType'), [])?.filter(p => p.name !== 'attachment' && p.name != 'wp_block');
        const pages = useSelect(select => select('core').getEntityRecords('postType', posttype), [posttype]);

        return (
            <div {...blockProps}>
                <Selector
                    posttype={posttype}
                    posttypes={posttypes}
                    pages={pages}
                    pageid={pageid}
                    onChangeType={t => setAttributes({ posttype: t, pageid: -1 })}
                    onChangeId={i => setAttributes({ pageid: +i })}
                />
                <Inspector
                    order={order}
                    orderby={orderby}
                    onChangeOrderBy={o => setAttributes({ orderby: o })}
                    onChangeOrder={o => setAttributes({ order: o })}
                />
            </div>
        )
    },
});