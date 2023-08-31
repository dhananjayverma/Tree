import React, { useState } from "react";
import "./TagView.css";

const TagView = ({ tag, onUpdate, onAddChild }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(tag.name);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNameEditEnd = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
      onUpdate({ ...tag, name });
    }
  };

  const handleDataChange = (event) => {
    onUpdate({ ...tag, data: event.target.value });
  };

  const handleAddChild = () => {
    const updatedTag = { ...tag };
    if (!updatedTag.children) {
      updatedTag.children = [];
    }
    updatedTag.children.push({ name: "New Child", data: "Data" });
    onUpdate(updatedTag);
  };

  return (
    <div className="tag">
      <div className="tag-header">
        <button onClick={handleCollapse}>
          <span>{collapsed ? ">" : "v"}</span>
        </button>

        {editing ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameEditEnd}
            onKeyDown={handleNameEditEnd}
          />
        ) : (
          <span onClick={handleEdit}>{tag.name}</span>
        )}
        {tag.data !== undefined && (
          <input type="text" value={tag.data} onChange={handleDataChange} />
        )}
        <div>
        <button onClick={handleAddChild}>Add Child</button>
        </div>
      </div>
      


      {!collapsed && tag.children && (
        <div className="children">
          {tag.children.map((child, index) => (
            <TagView
              key={index}
              tag={child}
              onUpdate={(updatedChild) => {
                const updatedChildren = [...tag.children];
                updatedChildren[index] = updatedChild;
                onUpdate({ ...tag, children: updatedChildren });
              }}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TagView;
