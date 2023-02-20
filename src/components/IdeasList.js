import { List, Button, Divider, Popconfirm } from "antd";
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

    return (
      <List.Item
        className="list-item-container"
        actions={[
          <p key="action1">writing</p>,
          <p key="action2">science</p>,
          <p key="action3">climate</p>,
        ]}
        key={item.id}
      >
        <List.Item.Meta
          title={item.text}
          description={dayjs(item.date).format("MMM DD YYYY")}
        />
        <Divider />
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
    <List itemLayout="vertical" dataSource={data} renderItem={renderListItem} />
  );
}
