import { useCallback, useEffect, useState } from "react";
import { List, Button, Popconfirm, Tag } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { db } from "../firestore";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import * as dayjs from "dayjs";
import "./IdeasList.css";

const { CheckableTag } = Tag;

const COLLECTION = "ideas";

export function IdeasList({ userId }) {
  const [data, setData] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    let q = query(collection(db, COLLECTION), orderBy("date", "desc"));

    if (selectedTag) {
      q = query(q, where(`tags.${selectedTag}`, "==", true));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ideas = [];
      snapshot.forEach((doc) => {
        ideas.push({ ...doc.data(), id: doc.id });
      });
      setData(ideas);
    });

    return unsubscribe;
  }, [selectedTag]);

  const handleDelete = useCallback(async (item) => {
    try {
      await deleteDoc(doc(db, COLLECTION, item.id));
    } catch (err) {
      alert(`Error deleting idea: ${err.message}`);
    }
  }, []);

  const handleTagClick = useCallback(
    (tag) => {
      setSelectedTag(selectedTag === tag ? null : tag);
    },
    [selectedTag]
  );

  const renderListItem = useCallback(
    (item) => {
      const isAuthor = item.author_id === userId;
      const tags = item?.tags ? Object.keys(item.tags) : ["No Tags"];

      return (
        <List.Item
          className="list-item-container"
          actions={tags.map((tag) => (
            <CheckableTag key={tag} onClick={() => handleTagClick(tag)} className="tag">
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
                  <Button shape="circle" type="ghost" className="delete-button">
                    <DeleteTwoTone twoToneColor="#eb2f96" />
                  </Button>
                </Popconfirm>
              )}
            </div>
          }
        >
          <List.Item.Meta
            description={dayjs(item.date?.toDate?.()).format("MMM DD YYYY")}
          />
          <p className="idea-item-text">{item.text}</p>
        </List.Item>
      );
    },
    [userId, handleTagClick, handleDelete]
  );

  return (
    <List
      itemLayout="vertical"
      dataSource={data}
      renderItem={renderListItem}
      bordered
      loading={!data?.length}
    />
  );
}
