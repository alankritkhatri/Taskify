import { useContext } from "react";
import StatusColumn from "./StatusColumn";
import { DataColumns } from "../App";

const Home = () => {
  const {
    taskData,
    handleTaskCreate,
    handleTaskEdit,
    addNewStatusColumn,
    setnewStatusName,
    newStatusNameInput,
    newStatusColorInput,
    setNewStatusColorInput,
    setNewStatusNameInput,
  } = useContext(DataColumns);
  const addingStatusColumn = () => {
          if (
                    taskData.some((task) => task.name === newStatusNameInput) &&
                    newStatusNameInput != "" &&
                    newStatusColorInput != ""
                  ) {
                    alert(
                      `${newStatusNameInput} already exists Please Enter a name which doesnt exist`
                    );
                  } else if (
                    [
                      "Yellow",
                      "Red",
                      "Orange",
                      "yellow",
                      "red",
                      "orange",
                      "Green",
                      "green",
                    ].includes(newStatusColorInput)
                  ) {
                    addNewStatusColumn();
                  } else {
                    alert(
                      "Enter column name and color( Red Yellow and Orange,Green) without any spaces"
                    );
                  }
  }
  
  return (
    <div>
      <div className="app flex flex-col items-center gap-16">
        <div className="div flex flex-col items-center mt-12 gap-2">
          <h1 className="text-white text-3xl font-black">Taskify</h1>
          <h6 className="font-semibold">
            Where Tasks get converted into Output 🔥
          </h6>
        </div>
        <div className="div">
          <div className="flex justify-around flex-wrap ">
            <div className="flex  items-center my-2 flex-wrap ">
              <span className="material-symbols-outlined">view_week</span>
              <h1 className="font-bold ml-1">Board View</h1>
            </div>
            <div className="flex gap-4 items-center flex-wrap  justify-center ">
              <button
                onClick={() => {
                  addingStatusColumn()
                }}
                className=" bg-blue-500 p-1 text-white  font-semibold rounded-md"
              >
                Add Status Column
              </button>
              <input
                className="text-black outline-none border-none  rounded-md  p-1   "
                onChange={(e) => {
                  setnewStatusName(e.target.value);
                  setNewStatusNameInput(e.target.value);
                }}
                placeholder="New Status Name"
              />
              <input
                className="text-black outline-none border-none  rounded-md  p-1 cursor-pointer"
                onChange={(e) => {
                  setNewStatusColorInput(e.target.value);
                }}
                placeholder="Add Color Name from Red Yellow and Orange"
              />
            </div>
          </div>
          <div className="statuses flex-wrap mx-20   flex gap-6  justify-center">
            {taskData.map((column, index) => {
              return (
                <StatusColumn
                  key={column.name}
                  IndividualTaskData={column}
                  handleTaskCreate={() => handleTaskCreate(column.name)}
                  onEditTask={handleTaskEdit}
                  color={column.color}
                  name={column.name}
                  StatusColumnindex={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
