import Droparea from "./Droparea";
import TaskBox from "../Components/TaskBox";
import { DataColumns } from "../App";
import { useContext } from "react";

const StatusColumn = ({
  handleTaskCreate,
  onEditTask,
  color,
  IndividualTaskData,
  StatusColumnindex,
  name,
}) => {
  const { onTaskDrop, columnsDropGuidelines, pickUpColumnIndex } =
    useContext(DataColumns);

  return (
    <div
      className={`status flex flex-col items-start

        ${
          columnsDropGuidelines && pickUpColumnIndex != StatusColumnindex
            ? "bg-green-900"
            : null
        }
        `}
    >
      <div className="flex items-center gap-2">
        <h1
          className={`statusNames rounded-2xl px-2 my-4 font-semibold`}
          style={{ backgroundColor: color }}
        >
          {IndividualTaskData.name}
        </h1>
        <h2 className="opacity-25">{IndividualTaskData?.Tasks?.length}</h2>
      </div>
      <div className="flex flex-col w-64">
        <Droparea
          onTaskDrop={() =>
            onTaskDrop(IndividualTaskData.name, 0, StatusColumnindex)
          }
        />

        {IndividualTaskData?.Tasks?.map((Task, index) => (
          <div key={index}>
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
              onTaskDrop={() =>
                onTaskDrop(
                  IndividualTaskData.name,
                  index + 1,
                  StatusColumnindex
                )
              }
            />
          </div>
        ))}
        <div
          onClick={handleTaskCreate}
          className=" addTask flex opacity-25 items-center mx-2 my-1 p-2 cursor-pointer rounded-md"
        >
          <span className="material-symbols-outlined text-2x1">add</span>
          <button>Add</button>
        </div>
      </div>
    </div>
  );
};

export default StatusColumn;
