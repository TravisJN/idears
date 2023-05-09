import { useState, useEffect } from 'react';
import { List, Button, Popconfirm, Tag } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import * as dayjs from 'dayjs';
import './IdeasListItem.css';

const { CheckableTag } = Tag;

export function IdeasListItem({
    item,
    index,
    userId,
    tags,
    onSelectTag,
    handleDelete,
}) {
    const isAuthor = item.author_id === userId;
    const itemTags = item?.tags ? Object.keys(item.tags) : ['No Tags'];

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), index * 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <List.Item
            className={`${loaded ? 'list-item-container' : 'item'}`}
            actions={itemTags.map((tag) => (
                <CheckableTag
                    key={tag}
                    onClick={() => onSelectTag(tag)}
                    className={tags.includes(tag) ? '' : 'tag'}
                    checked={tags.includes(tag)}
                >
                    {tag}
                </CheckableTag>
            ))}
            key={item.id}
            extra={
                <div className={`right-content-container`}>
                    {isAuthor && (
                        <Popconfirm
                            title="Delete this idea?"
                            onConfirm={() => handleDelete(item)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                shape="circle"
                                type="ghost"
                                className="delete-button"
                            >
                                <DeleteTwoTone twoToneColor="#eb2f96" />
                            </Button>
                        </Popconfirm>
                    )}
                </div>
            }
        >
            <List.Item.Meta
                description={dayjs(item.date?.toDate?.()).format('MMM DD YYYY')}
            />
            <p className="idea-item-text">{item.text}</p>
        </List.Item>
    );
}
