import { useEffect, useState } from "react";
import "./App.css";

import TaskPage from "./Components/TaskPage";
import { Route, Routes } from "react-router-dom";
import { createContext } from "react";
import Home from "./Components/Home";
export const DataColumns = createContext();
function App() {
  // DATA
  // all the TaskData
  // ! retrieving data from local storage
  const taskStorage = localStorage.getItem("taskDataValues");
  const localStorageTaskdata = JSON.parse(taskStorage);
  const [pickUpcolumn, setPickUpcolumn] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [statusColumnNo, setStatusColumnNo] = useState(null);

  const [taskData, setTaskData] = useState([
    {
      name: "Not Started",
      Tasks: localStorageTaskdata ? localStorageTaskdata[0]?.Tasks : [],
      color: "#5A5A5A",
    },
    {
      name: "In Progress",
      Tasks: localStorageTaskdata ? localStorageTaskdata[1]?.Tasks : [],
      color: "#28456C",
    },
    {
      name: "Done",
      Tasks: localStorageTaskdata ? localStorageTaskdata[2]?.Tasks : [],
      color: "#2b593f",
    },
  ]);

  // Functions
  const onDrop = (status, position, statusColumnindex) => {
    if (activeCard == null || activeCard === undefined) return;

    // you can drag a card and drop it back on its own column
    if (pickUpcolumn == statusColumnindex) {
      const newArr = [...taskData[pickUpcolumn].Tasks];
      const [elementToMove] = newArr.splice(activeCard, 1);
      let tempPosition = position;

      if (tempPosition > activeCard) {
        tempPosition = Math.max(0, tempPosition - 1);
      }

      newArr.splice(tempPosition, 0, elementToMove);
      taskData[pickUpcolumn].Tasks = newArr;
    } else {
      // drag a card and drop it into another column
      const taskToMove = taskData[pickUpcolumn].Tasks[activeCard];
      // Delete the card from the initial column (pickUpcolumn)
      taskData[pickUpcolumn].Tasks.splice(activeCard, 1);

      // Add the card to the new column
      taskData[statusColumnindex].Tasks.splice(position, 0, taskToMove);
    }

    const updatedColumns = taskData.map((column) => {
      if (column.name === status) {
        return {
          ...column,
          Tasks: column.Tasks.map((task, index) => {
            if (index === position) {
              return { ...task };
            }
            return task;
          }),
        };
      }
      return column;
    });
    setTaskData(updatedColumns);
  };

  function handleTaskEdit(columnName, taskID, text) {
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
  function handleTaskCreate(columnName) {
    const newTask = {
      id: crypto.randomUUID(),
      text: "",
      description: "",
    };
    // column
    // { name: "Not Started", tasks: [ { id: "1", text: "" } ], color: "red" }
    const newColumns = taskData.map((column) => {
      if (column.name === columnName) {
        // "Not Started" ["Not Started", "Done", "In Progress"]
        console.log(column);
        // ...column <- { ...{ } }
        // [ All the tasks, plus the new task ]
        return { ...column, Tasks: [...column.Tasks, newTask] };
      }
      return column;
    });
    console.log(newColumns);
    setTaskData(newColumns);
  }
  console.log(taskData);
  useEffect(() => {
    localStorage.setItem("taskDataValues", JSON.stringify(taskData));
  }, [taskData]);
  // ! return
  return (
    <DataColumns.Provider
      value={{
        taskData,
        setTaskData,
        onDrop,
        activeCard,
        setActiveCard,
        pickUpcolumn,
        setPickUpcolumn,
        handleTaskCreate,
        statusColumnNo,
        setStatusColumnNo,
        handleTaskEdit,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={"/taskpage/:name/:id"} element={<TaskPage />} />
      </Routes>
    </DataColumns.Provider>
  );
}

export default App;
