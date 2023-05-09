import { useCallback } from 'react';
import { List, Button, Popconfirm, Tag } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { db } from '../firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import * as dayjs from 'dayjs';
import './IdeasList.css';

const { CheckableTag } = Tag;

const COLLECTION = 'ideas';

export function IdeasList({ userId, onSelectTag, ideas, tags }) {
    const handleDelete = useCallback(async (item) => {
        try {
            await deleteDoc(doc(db, COLLECTION, item.id));
        } catch (err) {
            alert(`Error deleting idea: ${err.message}`);
        }
    }, []);

    const renderListItem = useCallback(
        (item) => {
            const isAuthor = item.author_id === userId;
            const itemTags = item?.tags ? Object.keys(item.tags) : ['No Tags'];

            return (
                <List.Item
                    className="list-item-container"
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
                        <div className="right-content-container">
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
                        description={dayjs(item.date?.toDate?.()).format(
                            'MMM DD YYYY'
                        )}
                    />
                    <p className="idea-item-text">{item.text}</p>
                </List.Item>
            );
        },
        [userId, handleDelete, onSelectTag]
    );

    return (
        <List
            itemLayout="vertical"
            dataSource={ideas}
            renderItem={renderListItem}
            bordered
            loading={!ideas?.length}
        />
    );
}
