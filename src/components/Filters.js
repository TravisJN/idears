import { Tag } from "antd";
import "./Filters.css";

const { CheckableTag } = Tag;

export function Filters({ tags, onSelectTag }) {
  if (!tags?.length) {
    return null;
  }

  return (
    <div className="filters-container">
      Filters:
      {tags.map((tag) => (
        <CheckableTag
          key={tag}
          onClick={() => onSelectTag(tag)}
          className="tag"
        >
          {tag}
        </CheckableTag>
      ))}
    </div>
  );
}
