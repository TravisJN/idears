import { useState } from "react";
import { Input, Button } from "antd";
import { db } from "../firestore";
import { collection, addDoc } from "firebase/firestore";

const { TextArea } = Input;

export function AddIdea() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await addDoc(collection(db, "ideas"), { text: value, date: Date.now() });
    } catch (err) {
      console.log(err);
    }
    setValue("");
    setIsLoading(false);
  };

  return (
    <div className="add-idea-container">
      <TextArea
        placeholder="What's the big idea?"
        autoSize
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        type="primary"
        onClick={handleSubmit}
        shape="round"
        disabled={!value}
        className="submit-button"
        loading={isLoading}
      >
        Submit
      </Button>
    </div>
  );
}
