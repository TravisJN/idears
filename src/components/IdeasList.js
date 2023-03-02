import { List, Button, Popconfirm } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { db } from "../firestore";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import "./IdeasList.css";

const COLLECTION = "ideas";

export function IdeasList({ userId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ideas = [];
      snapshot.forEach((doc) => {
        ideas.push({ ...doc.data(), id: doc.id });
      });
      setData(ideas);
    });

    return unsubscribe;
  }, []);

  const handleDelete = async (item) => {
    try {
      await deleteDoc(doc(db, COLLECTION, item.id));
    } catch (err) {
      alert(`Error deleting idea: ${err.message}`);
    }
  };

  const renderListItem = (item) => {
    const isAuthor = item.author_id === userId;
    const tags = item?.tags ? Object.keys(item.tags) : ["No Tags"];

    return (
      <List.Item
        className="list-item-container"
        actions={tags.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
        key={item.id}
      >
        <List.Item.Meta
          description={dayjs(item.date?.toDate?.()).format("MMM DD YYYY")}
        />
        <p className="idea-item-text">{item.text}</p>
        {isAuthor && (
          <Popconfirm
            title="Delete this idea?"
            onConfirm={(e) => handleDelete(item)}
            okText="Yes"
            cancelText="No"
          >
            <Button shape="circle" type="ghost" className="delete-button">
              <DeleteTwoTone twoToneColor="#eb2f96" />
            </Button>
          </Popconfirm>
        )}
      </List.Item>
    );
  };

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
