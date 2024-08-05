import { act, useContext, useEffect, useState } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { DataColumns } from "../App";

const TaskPage = () => {
  const { taskData, setTaskData, handleTaskEdit } = useContext(DataColumns);

  let { state } = useLocation();

  let { pickedupCard, statusColumnNo, name, id } = state;
  console.log(pickedupCard, statusColumnNo, name, id);

  const changeStatus = (newColumnName) => {
    const taskToMove = taskData[statusColumnNo].Tasks[pickedupCard];
    let newTaskData = taskData;
    // deleteing
    newTaskData[statusColumnNo].Tasks.splice(pickedupCard, 1);
    // swtiching colums
    newTaskData = newTaskData.map((column) => {
      if (newColumnName == column.name) {
        return {
          ...column,
          Tasks: [...column.Tasks, taskToMove],
        };
      }
      return column;
    });
    setTaskData(newTaskData);
  };
  const handleTaskDesciption = (columnName, taskID, description) => {
    const newTaskData = taskData.map((column) => {
      if (column.name === columnName) {
        return {
          ...column,
          Tasks: column.Tasks.map((task) => {
            if (task.id == taskID) {
              return { ...task, description };
            }
            return task;
          }),
        };
      }
      return column;
    });
    setTaskData(newTaskData);
  };
  const deleteTask = () => {
    let taskDataafterDeleting = [...taskData];
    taskDataafterDeleting[statusColumnNo].Tasks.splice(pickedupCard, 1);
    taskDataafterDeleting = taskDataafterDeleting.map((column, index) => {
      return {
        ...column,
        Tasks: [...column.Tasks],
      };
    });
    setTaskData(taskDataafterDeleting);
  };
  return (
    <div className="task-page flex flex-col w-1/2 mx-auto my-52 gap-6">
      <div className="flex items-center ">
        <Link className="bg-yellow-500 p-1 rounded-md" to="/">
          Go back
        </Link>
        <Link to="/" onClick={deleteTask}>
          <button className="bg-red-500 p-1 rounded-md ml-8">
            Delete Task
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-4 opacity-60 ">
        <input
          placeholder="Untitled"
          className=" bg-transparent border-none outline-none font-medium text-5xl "
          contentEditable
          onChange={(e) => {
            handleTaskEdit(name, id, e.target.value);
          }}
          defaultValue={taskData[statusColumnNo].Tasks[pickedupCard]?.text}
        />
        <div className="flex gap-16">
          <div className="flex justify-center items-center g">
            <span class="material-symbols-outlined text-base ">
              progress_activity
            </span>
            <h1 className="ml-2">Status:</h1>
          </div>

          <select
            defaultValue={name}
            className="bg-transparent"
            onChange={(e) => {
              changeStatus(e.target.value);
            }}
          >
            {taskData.map((i, index) => (
              <option
                className={`text-black bg-${i.color}-500`}
                id={index}
                key={index}
                value={i.name}
              >
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-16">
          <h1>Description </h1>
          <textarea
            onChange={(e) => handleTaskDesciption(name, id, e.target.value)}
            placeholder="Add a task description"
            className=" bg-none bg-transparent outline-none border-none "
            name=""
            id=""
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
