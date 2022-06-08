import { List } from "antd";
import { db } from "../firestore";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

export function IdeasList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "ideas"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ideas = [];
      snapshot.forEach((doc) => {
        ideas.push(doc.data());
      });
      setData(ideas);
    });

    return unsubscribe;
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item.text} description={item.date} />
        </List.Item>
      )}
    />
  );
}
