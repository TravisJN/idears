import { useCallback } from 'react';
import { List, Tag } from 'antd';
import { db } from '../firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import './IdeasList.css';
import { IdeasListItem } from './IdeasListItem';

const COLLECTION = 'ideas';

export function IdeasList({ userId, onSelectTag, ideas, tags }) {
    const handleDelete = useCallback(async (item) => {
        try {
            await deleteDoc(doc(db, COLLECTION, item.id));
        } catch (err) {
            alert(`Error deleting idea: ${err.message}`);
        }
    }, []);

    return (
        <List
            itemLayout="vertical"
            dataSource={ideas}
            renderItem={(item, index) => (
                <IdeasListItem
                    item={item}
                    index={index}
                    userId={userId}
                    tags={tags}
                    onSelectTag={onSelectTag}
                    handleDelete={handleDelete}
                />
            )}
            bordered
            loading={!ideas?.length}
        />
    );
}
