import { useState } from "react";
import { Collapse } from "antd";
import { AddIdeaForm } from "./AddIdeaForm";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firestore";

const { Panel } = Collapse;

export function AddIdea({ userId }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (values) => {
    const { idea, tags } = values;
    setErrorMessage(null);

    // TODO: Create/set Tag document on firestore at same time as adding idea doc
    try {
      await addDoc(collection(db, "ideas"), {
        text: idea,
        date: Date.now(),
        author_id: userId,
      });
      return true;
    } catch (err) {
      console.log(err);
      setErrorMessage("Unable to save your idea. Please try again.");
      return false;
    }
  };

  return (
    <div className="add-idea-container">
      <Collapse defaultActiveKey={["1"]} ghost>
        <Panel header="Add Idea" key="1">
          <AddIdeaForm onSubmit={onSubmit} errorMessage={errorMessage} />
        </Panel>
      </Collapse>
    </div>
  );
}
