import { useState } from "react";

const Droparea = ({ onTaskDrop }) => {
  const [dropGuidelines, setDropGuidelines] = useState(false);
  return (
    <div
      onDragEnter={() => setDropGuidelines(true)}
      onDragLeave={() => setDropGuidelines(false)}
      onDrop={() => {
        onTaskDrop();
        setDropGuidelines(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={`drop-area  rounded-md ${
        dropGuidelines ? "opacity-100 h-10" : "opacity-0 h-3"
      }`}
    ></div>
  );
};

export default Droparea;
