import { useState } from "react";
import { Collapse } from "antd";
import { AddIdeaForm } from "./AddIdeaForm";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  runTransaction,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firestore";

const { Panel } = Collapse;

export function AddIdea({ userId }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (values) => {
    const { idea, tags } = values;
    setErrorMessage(null);

    try {
      const tagsMap = tags.reduce((map, tag) => {
        map[tag] = true;
        return map;
      }, {});
      console.log(tagsMap);
      // First add the idea doc
      const ideaDoc = await addDoc(collection(db, "ideas"), {
        text: idea,
        date: serverTimestamp(),
        author_id: userId,
        tags: tagsMap ?? {},
      });

      return true;
    } catch (err) {
      console.log(err);
      setErrorMessage("Unable to save your idea. Please try again.");
      return false;
    }
  };

  const onResetForm = () => {
    setErrorMessage("");
  };

  return (
    <div className="add-idea-container">
      <Collapse defaultActiveKey={["1"]} bordered>
        <Panel header="Add Idea" key="1">
          <AddIdeaForm
            onSubmit={onSubmit}
            errorMessage={errorMessage}
            onResetForm={onResetForm}
          />
        </Panel>
      </Collapse>
    </div>
  );
}
