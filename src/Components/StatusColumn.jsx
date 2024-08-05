// import React, { useState } from "react";
import Droparea from "./droparea.jsx/Droparea";
import TaskBox from "./TaskBox/TaskBox";
import { DataColumns } from "../App";
import React, { useContext } from "react";

//  onAddTask={() => handleTaskCreate(column.name)}
//       onEditTask={(id, text) => handleTaskEdit(column.name, id, text)}
const StatusColumn = ({
  onAddTask,
  onEditTask,
  color,
  taskData,
  StatusColumnindex,
  name,
}) => {
  const { onDrop } = useContext(DataColumns);

  return (
    <div className="status flex flex-col items-start ">
      <div className="flex items-center gap-2">
        <h1
          className={`statusNames rounded-2xl px-2 my-4 font-semibold`}
          style={{ backgroundColor: color }}
        >
          {taskData.name}
        </h1>
        <h2 className="opacity-25">{taskData.Tasks.length}</h2>
      </div>
      <div className="flex flex-col w-64 ">
        <Droparea
          onDrop={() =>
            onDrop(taskData.name, 0, StatusColumnindex, taskData.colIndex)
          }
        />
        {taskData.Tasks.map((Task, index) => (
          <React.Fragment key={index}>
            <TaskBox
              index={index}
              text={Task?.text}
              name={name}
              id={Task?.id}
              key={Task?.id}
              onEditTask={onEditTask}
              StatusColumnindex={StatusColumnindex}
            />

            <Droparea
              onDrop={() => onDrop(taskData.name, index + 1, StatusColumnindex)}
            />
          </React.Fragment>
        ))}
        <div
          onClick={onAddTask}
          className=" addTask flex opacity-25 items-center mx-2 my-1 p-2 cursor-pointer rounded-md"
        >
          <span className="material-symbols-outlined text-2x1">add</span>
          <button className="">Add</button>
        </div>
      </div>
    </div>
  );
};

export default StatusColumn;
