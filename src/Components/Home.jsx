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
          <div className="flex justify-around ">
            <div className="flex  items-center my-2">
              <span className="material-symbols-outlined">view_week</span>
              <h1 className="font-bold ml-1">Board View</h1>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
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
                    ].includes(newStatusColorInput)
                  ) {
                    addNewStatusColumn();
                  } else {
                    alert(
                      "Please enter new column name and color from Red Yellow and Orange without any spaces"
                    );
                  }
                }}
                className=" bg-blue-500 p-1.5 text-whitefont-semibold rounded-md"
              >
                Add Status Column
              </button>
              <input
                className="text-black outline-none border-none  rounded-md p-2"
                onChange={(e) => {
                  setnewStatusName(e.target.value);
                  setNewStatusNameInput(e.target.value);
                }}
                placeholder="New Status Name"
              />
              <input
                className="text-black outline-none border-none  rounded-md cursor-pointer p-2"
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
