import { useEffect, useState } from "react";
import "./App.css";
import TaskPage from "./Components/TaskPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import Home from "./Components/Home";
export const DataColumns = createContext();
function App() {
  // DATA
  // all the TaskData4

  // ! retrieving data from local storage

  const [pickUpColumnIndex, setpickUpColumnIndex] = useState(null);
  const [draggedTaskIndex, setdraggedTaskIndex] = useState(null);
  const [statusColumnNo, setStatusColumnNo] = useState(null);
  const [columnsDropGuidelines, setColumnsDropGuidelines] = useState(false);
  const [newStatusNameInput, setNewStatusNameInput] = useState("");
  const [newStatusColorInput, setNewStatusColorInput] = useState("");
  const [newStatusName, setnewStatusName] = useState("");

  const [taskData, setTaskData] = useState(() => {
    const localData = localStorage.getItem("taskDataValues");
    return localData !== null
      ? JSON.parse(localData)
      : [
          {
            name: "Not Started",
            Tasks: [],
            color: "#5A5A5A",
          },
          {
            name: "In Progress",
            Tasks: [],
            color: "#28456C",
          },
          {
            name: "Done",
            Tasks: [],
            color: "#2b593f",
          },
        ];
  });

  // Functions
  // Dropping Index
  const onTaskDrop = (dropStatusName, dropPositionIndex, dropColumnIndex) => {
    if (draggedTaskIndex == null || draggedTaskIndex === undefined) return;
    // you can drag a card and drop it back on its own column
    if (pickUpColumnIndex == dropColumnIndex) {
      const newArr = [...taskData[pickUpColumnIndex].Tasks];
      const [taskToMove] = newArr.splice(draggedTaskIndex, 1);
      let tempPosition = dropPositionIndex;

      if (tempPosition > draggedTaskIndex) {
        tempPosition = tempPosition - 1;
      }

      newArr.splice(tempPosition, 0, taskToMove);
      taskData[pickUpColumnIndex].Tasks = newArr;
    } else {
      // drag a card and drop it into another column
      const taskToMove = taskData[pickUpColumnIndex].Tasks[draggedTaskIndex];
      // Delete the card from the initial column (pickUpColumnIndex)
      taskData[pickUpColumnIndex].Tasks.splice(draggedTaskIndex, 1);
      // Add the card to the new column
      taskData[dropColumnIndex].Tasks.splice(dropPositionIndex, 0, taskToMove);
    }

    const updatedColumns = taskData.map((column) => {
      if (column.name === dropStatusName) {
        return {
          ...column,
          Tasks: column.Tasks.map((task, taskIndex) => {
            if (taskIndex === dropPositionIndex) {
              return { ...task };
            }
            return task;
          }),
        };
      }
      return column;
    });
    setTaskData(updatedColumns);
    setColumnsDropGuidelines(false);
  };
  // Editing Tasks
  function handleTaskEdit(columnName, taskID, text) {
    console.log(columnName);
    const newTaskData = taskData.map((column) => {
      if (column.name === columnName) {
        return {
          ...column,
          Tasks: column.Tasks.map((task) => {
            if (task.id == taskID) {
              return { ...task, text };
            }
            return task;
          }),
        };
      }
      return column;
    });
    setTaskData(newTaskData);
  }
  //  Adding  Tasks
  function handleTaskCreate(columnName) {
    const newTask = {
      id: crypto.randomUUID(),
      text: "",
      description: "",
    };

    const newColumns = taskData.map((column) => {
      if (column.name === columnName) {
        console.log(taskData);
        console.log(column);
        console.log(column.Tasks);
        return { ...column, Tasks: [...column.Tasks, newTask] };
      }
      return column;
    });

    setTaskData(newColumns);
  }
  function addNewStatusColumn() {
    setTaskData((prevTaskData) => [
      ...prevTaskData,
      {
        name: newStatusName,
        Tasks: [],
        color: newStatusColorInput,
      },
    ]);
  }
  console.log(taskData);
  useEffect(() => {
    localStorage.setItem("taskDataValues", JSON.stringify(taskData));
    console.log(taskData);
  }, [taskData]);
  // ! return
  return (
    <DataColumns.Provider
      value={{
        taskData,
        setTaskData,
        onTaskDrop,
        draggedTaskIndex,
        setdraggedTaskIndex,
        pickUpColumnIndex,
        setpickUpColumnIndex,
        handleTaskCreate,
        statusColumnNo,
        setStatusColumnNo,
        handleTaskEdit,
        columnsDropGuidelines,
        setColumnsDropGuidelines,
        setnewStatusName,
        newStatusNameInput,
        newStatusColorInput,
        setNewStatusColorInput,
        setNewStatusNameInput,

        addNewStatusColumn,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={"/taskpage/:name/:id"} element={<TaskPage />} />
        </Routes>
      </BrowserRouter>
    </DataColumns.Provider>
  );
}

export default App;
