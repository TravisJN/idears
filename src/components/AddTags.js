import { useState } from "react";
import { Input } from "antd";
import "./AddTags.css";

export function AddTags({ onPressEnter, onDeleteTag, tags }) {
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
      <div // should probably be a button element but I don't want it to be selected when Enter is pressed
        key={tag}
        className="tag-item-container"
        onClick={() => onDeleteTag(tag)}
      >
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
      className="tag-input"
    />
  );
}
