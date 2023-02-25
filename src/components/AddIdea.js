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
      // First add the idea doc
      const ideaDoc = await addDoc(collection(db, "ideas"), {
        text: idea,
        date: serverTimestamp(),
        author_id: userId,
      });

      // Loop through each of the tags and create/set docs for each one
      await Promise.all(
        // need to use map here for async to work
        tags.map(async (tag) => {
          await runTransaction(db, async (transaction) => {
            const tagDoc = await transaction.get(doc(db, "tags", tag));
            if (!tagDoc.exists()) {
              await transaction.set(doc(db, "tags", tag), {
                created_at: serverTimestamp(),
                idea_ids: [ideaDoc.id],
              });
            } else {
              await transaction.update(doc(db, "tags", tag), {
                idea_ids: arrayUnion(ideaDoc.id),
              });
            }
          });
        })
      );

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
