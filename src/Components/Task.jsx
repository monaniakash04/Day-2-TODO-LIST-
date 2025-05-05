import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { memo } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Task = memo((props) => {
  const {
    id,
    time,
    idx,
    task,
    isCompleted,
    setTasks,
    tasks,
    idForTheUpdate,
    setIdForTheUpdate,
    setInput,
    setBtntext,
    setTime,
  } = props;

  return (
    <div className="max-w-xl min-h-[70px] border-yellow-50 items-center justify-center flex flex-wrap gap-3">
      <ToastContainer />
      {isCompleted ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            let newArrayy=tasks;
            newArrayy[idx].isCompleted=false;
            console.log(newArrayy)
            setTasks(newArrayy);
          }}
          className="px-4   py-[5px] rounded-md border-2 text-white hover:shadow-2xl duration-700 cursor-pointer bg-red-500  "
        >
          <IoCloseSharp />
        </button>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            let newArrayy=tasks;
            newArrayy[idx].isCompleted=true;
            console.log(newArrayy)
            setTasks(newArrayy);
          }}
          className="px-4 py-[5px] rounded-md border-2 text-white hover:shadow-2xl duration-700 cursor-pointer bg-green-500   "
        >
          <IoCheckmarkDoneSharp />
        </button>
      )}

      <div
        className={`md:text-xl text-md text-white ${
          isCompleted && "line-through"
        } `}
      >
        {task}
      </div>
      <button
        type="button"
        onClick={() => {
          setInput(task);
          setBtntext("EDIT");
          setTime(time);
          setIdForTheUpdate(id);
        }}
        className="px-4 py-[5px] rounded-md border-2 text-white hover:shadow-2xl duration-700 cursor-pointer hover:bg-white hover:text-black shadow-white  border-white "
      >
        <FaRegEdit />
      </button>
      <button
        type="button"
        onClick={() => {
          toast.success("Task Deleted Succesfully");
          setTimeout(() => {
            setTasks(
              tasks.filter((item) => {
                return item.id != id;
              })
            );
          }, 1000);
        }}
        className="px-4 py-[5px] rounded-md border-2 text-white hover:shadow-2xl duration-700 cursor-pointer hover:bg-white hover:text-black shadow-white  border-white "
      >
        <MdDelete />
      </button>
      <div className="text-white font-bold">{time}</div>
    </div>
  );
});

export default Task;
