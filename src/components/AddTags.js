import { useState } from "react";
import { Input, Tag } from "antd";
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
      <Tag key={tag} closable onClose={() => onDeleteTag(tag)}>
        {tag}
      </Tag>
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
