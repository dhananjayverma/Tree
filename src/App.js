import React, { useState } from "react";
import TagView from "./Components/TagView";
import "./App.css";

const initialTree = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" }
      ]
    },
    { name: "child2", data: "c2 World" }
  ]
};

const App = () => {
  const [tree, setTree] = useState(initialTree);
  const [exportedData, setExportedData] = useState("");
  const handleUpdateTree = (updatedTree) => {
    setTree(updatedTree);
  };

  const handleExport = () => {
    const exportedTree = JSON.stringify(tree, ["name", "children", "data"], 2);
    console.log(exportedTree);
    setExportedData(exportedTree);
  };

  return (
    <div className="app">
      <h1>Nested Tags Tree</h1>
      <TagView
        tag={tree}
        onUpdate={handleUpdateTree}
        onAddChild={handleUpdateTree}
      />
      <button className="export-btn" onClick={handleExport}>
        Export
      </button>
      <div className="exported-data">
        <h2>Exported Data:</h2>
        <pre>{exportedData}</pre>
      </div>
    </div>
  );
};

export default App;



