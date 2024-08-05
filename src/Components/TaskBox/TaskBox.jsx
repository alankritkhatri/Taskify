// import { useState } from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataColumns } from "../../App";

const TaskBox = ({
  onEditTask,
  text,
  id,
  index,
  StatusColumnindex,
  name,
  taskCounter,
}) => {
  const {
    taskData,
    setTaskData,
    onDrop,
    activeCard,
    setActiveCard,
    pickUpcolumn,
    setPickUpcolumn,
    handleTaskCreate,

    setStatusColumnNo,
    handleTaskEdit,
  } = useContext(DataColumns);

  let { i } = useParams();
  i = index;
  return (
    <Link
      onClick={() => {}}
      to={{
        pathname: `/taskpage/${name}/${i + 1}`,
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
          setActiveCard(index);
          setPickUpcolumn(StatusColumnindex);
        }}
        onDragEnd={() => {
          setActiveCard(null);
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
