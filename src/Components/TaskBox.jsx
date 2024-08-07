// import { useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataColumns } from "../App";

const TaskBox = ({ text, id, index, StatusColumnindex, name }) => {
  const { setdraggedTaskIndex, setpickUpColumnIndex, handleTaskEdit } =
    useContext(DataColumns);

  let { taskNo } = useParams();
  taskNo = index;
  return (
    <Link
      onClick={() => {}}
      to={{
        pathname: `/taskpage/${name}/${taskNo + 1}`,
      }}
      state={{
        pickedupCard: index,
        statusColumnNo: StatusColumnindex,
        name: name,
        id: id,
      }}
    >
      <div
        className={`taskBox flex w-60 h-10 mx-auto m-1`}
        draggable
        onDragStart={() => {
          setdraggedTaskIndex(index);
          setpickUpColumnIndex(StatusColumnindex);
        }}
        onDragEnd={() => {
          setdraggedTaskIndex(null);
        }}
      >
        <input
          type="text"
          className="task-input outline-none border-none w-full px-4 rounded-md cursor-pointer"
          placeholder="Add your task"
          onInput={(e) => {
            handleTaskEdit(name, id, e.target.value);
          }}
          value={text}
          autoFocus={true}
        />
      </div>
    </Link>
  );
};

export default TaskBox;
