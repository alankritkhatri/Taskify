import { useState } from "react";

const Droparea = ({ onDrop, StatusColumnindex }) => {
  const [dropGuidelines, setDropGuidelines] = useState(false);
  return (
    <div
      onDragEnter={() => setDropGuidelines(true)}
      onDragLeave={() => setDropGuidelines(false)}
      onDrop={() => {
        onDrop();
        setDropGuidelines(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={`drop-area  rounded-md ${
        dropGuidelines ? "opacity-100 h-10" : "opacity-0 h-2"
      }`}
    ></div>
  );
};

export default Droparea;
