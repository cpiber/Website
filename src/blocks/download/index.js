import { BlockControls, MediaPlaceholder, MediaReplaceFlow, RichText, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Flex, FlexBlock, FlexItem, Icon, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { _x, __ } from '@wordpress/i18n';
import * as icons from '@wordpress/icons';
import { blockBase, i18nDomain } from '../../config';
import Inspector from './inspector';
import styles from './style.module.scss';
const { block } = styles;

registerBlockType(`${blockBase}/download`, {
    apiVersion: 2,
    title: _x(
        'Download',
        'block title',
        i18nDomain
    ),
    description: __(
        'Provides a nice download with an icon.',
        i18nDomain
    ),
    category: 'widgets',
    icon: 'download',
    attributes: {
        usedashicon: {
            type: 'boolean',
            default: true,
        },
        dashicon: {
            type: 'string',
            default: 'download',
        },
        iconid: {
            type: 'number',
        },
        iconurl: {
            type: 'string',
        },
        downloadid: {
            type: 'number',
        },
        download: {
            type: 'string',
            source: 'attribute',
            selector: 'a',
            attribute: 'href',
        },
        filename: {
            type: 'string',
            source: 'html',
            selector: 'span',
        },
        newtab: {
            type: 'boolean',
            default: false,
            source: 'attribute',
            selector: 'a',
            attribute: 'target',
        },
        border: {
            type: 'string',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { usedashicon, dashicon, iconid, iconurl, downloadid, download, filename, newtab, border } = attributes;

        const onSelectFile = (newMedia) => {
            if (newMedia && newMedia.url) {
                setAttributes({
                    downloadid: newMedia.id,
                    download: newMedia.url,
                    filename: newMedia.title,
                });
            }
        };
        const icon = usedashicon || !iconurl
            ? icons[dashicon]
            : <img src={iconurl} />;

        return (
            <div {...blockProps}>
                <Inspector
                    usedashicon={usedashicon}
                    toggleUsedashicon={() => setAttributes({ usedashicon: !usedashicon })}
                    dashicon={dashicon}
                    onDashiconChange={i => setAttributes({ dashicon: i })}
                    iconid={iconid}
                    iconurl={iconurl}
                    onIconChange={i => setAttributes({ iconid: i.id, iconurl: i.sizes.thumbnail.url || i.url })}
                    border={border}
                    onBorderChange={b => setAttributes({ border: b })}
                />
                {download && (
                    <BlockControls>
                        <ToolbarGroup>
                            <ToolbarButton
                                label={__('Open in new tab', i18nDomain)}
                                icon='external'
                                isActive={newtab}
                                onClick={() => setAttributes({ newtab: !newtab })}
                            />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <MediaReplaceFlow
                                mediaId={downloadid}
                                mediaURL={download}
                                accept="*"
                                onSelect={onSelectFile}
                            />
                        </ToolbarGroup>
                    </BlockControls>
                )}
                {download && (
                    <Flex className={block} style={{ borderStyle: border }}>
                        <FlexItem>
                            <Icon icon={icon} />
                        </FlexItem>
                        <FlexBlock>
                            <RichText
                                tagName="div"
                                value={filename}
                                placeholder={_x('Filename', 'placeholder', i18nDomain)}
                                withoutInteractiveFormatting
                                onChange={text => setAttributes({ filename: text })}
                            />
                        </FlexBlock>
                    </Flex>
                )}
                {!download && (
                    <MediaPlaceholder
                        mediaId={downloadid}
                        mediaURL={download}
                        accept="*"
                        onSelect={onSelectFile}
                    />
                )}
            </div>
        );
    },
    save: ({ attributes }) => {
        const { usedashicon, dashicon, iconurl, download, filename, newtab, border } = attributes;
        if (!download) return;
        const icon = usedashicon || !iconurl
            ? icons[dashicon]
            : <img src={iconurl} />;
        const blockProps = useBlockProps.save({
            className: block,
            style: {
                borderStyle: border
            },
        });

        return (
            <div {...blockProps}>
                <a href={download} target={newtab && '_blank'} rel="noopener">
                    <Icon icon={icon} />
                    <span>{filename}</span>
                </a>
            </div>
        );
    }
});