import { useState } from "react";
import { Input } from "antd";
import "./AddTags.css";

export function AddTags({ onPressEnter, tags }) {
  const [inputText, setInputText] = useState("");

  const onTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handlePressEnter = () => {
    // save the current text as a tag
    setInputText("");
    onPressEnter(inputText);
  };

  const renderTags = () => {
    return tags.map((tag) => (
      <div key={tag} className="tag-item-container">
        {tag}
      </div>
    ));
  };

  return (
    <Input
      prefix={renderTags()} // map of tags that have already been entered
      value={inputText}
      onChange={onTextChange}
      onPressEnter={handlePressEnter}
      placeholder={"Tags"}
    />
  );
}
