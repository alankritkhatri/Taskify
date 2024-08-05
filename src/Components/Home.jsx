import { useContext } from "react";
import StatusColumn from "./StatusColumn";
import { DataColumns } from "../App";

const Home = () => {
  const { taskData, onDrop, handleTaskCreate, handleTaskEdit } =
    useContext(DataColumns);

  return (
    <div>
      <div className="app flex flex-col items-center gap-16 overflow-x-auto ">
        <div className="div flex flex-col items-center mt-12 gap-2">
          <h1 className="text-white text-3xl font-black">Taskify</h1>
          <h6 className="font-semibold">
            Where Tasks get converted into Output 🔥
          </h6>
        </div>
        <div className="div">
          <div className="flex  items-center my-2">
            <span className="material-symbols-outlined">view_week</span>
            <h1 className="font-bold ml-1">Board View</h1>
          </div>
          <div className="statuses flex gap-6 flex-wrap justify-center">
            {taskData.map((column, index) => {
              return (
                <StatusColumn
                  key={column.name}
                  taskData={column}
                  onAddTask={() => handleTaskCreate(column.name)}
                  onEditTask={handleTaskEdit}
                  color={column.color}
                  name={column.name}
                  StatusColumnindex={index}
                  onDrop={onDrop}
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
