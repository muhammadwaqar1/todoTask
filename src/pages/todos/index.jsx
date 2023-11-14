import React from "react";
import { useTodos } from "./useTodo";
import Profile from "../../components/profile";
import DotIcon from "../../assets/icons/DotIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import CheckCircleIcon from "../../assets/icons/CheckCircleIcon";
import YourTodos from "../../components/yourTodos";

function Todos() {
  const {
    task,
    userData,
    editTask,
    deleteTask,
    handleTask,
    handleClick,
    selectedTask,
    handleChange,
    addOrUpdateTodo,
  } = useTodos();

  return (
    <div className="flex  flex-col items-center justify-center h-screen w-[285px]">
      {/* <------------- Profile Secton ------------->  */}
      <Profile />

      {/* <--------------- Add Task Section ---------------> */}

      <div className="bg-white flex p-1 rounded-md my-5 w-full justify-between px-2 ">
        <input
          type="text"
          name="userTask"
          value={task.userTask}
          placeholder="Add new task"
          onChange={handleChange}
          className="outline-none"
        />
        <div
          className="bg-primary cursor-pointer rounded-md"
          onClick={() => addOrUpdateTodo()}
        >
          <PlusIcon />
        </div>
      </div>

      {/* <------------------ your todos Section ------------------> */}
      <YourTodos />

      {/* <------------------ Task Section ------------------>   */}

      <div className="relative w-full h-[30%] overflow-y-auto flex  items-center flex-col">
        <div className="absolute top-0 left-0 w-full h-full rounded-md backdrop-blur-md bg-white bg-opacity-60 z-0"></div>
        {!userData.length ? (
          <p className="z-10 h-full flex justify-center items-center">
            No task today
          </p>
        ) : (
          userData.map((item, index) => {
            const timestamp = item.createdAt;
            const date = timestamp.toDate();
            const formattedTime = date.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            });
            const dateObject = new Date(
              timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6
            );
            const month = dateObject.getMonth() + 1;
            const day = dateObject.getDate();
            const year = dateObject.getFullYear();
            const formattedDate = `${month}/${day}/${year}`;
            return (
              <div
                key={index}
                className="z-10 flex   flex-col items-center  justify-between w-full  border-b border-secondry  backdrop-blur-md bg-white bg-opacity-60 "
              >
                <div className="flex items-center justify-between py-2  relative z-10 cursor-pointer w-full px-2">
                  <div className="flex items-center">
                    <div onClick={() => handleTask(item.id, item.status)}>
                      <CheckCircleIcon className="w-5 h-5" />
                    </div>
                    <p
                      className="p-1 text-sm"
                      onClick={() => handleClick(index)}
                    >
                      {item.userTask}
                    </p>
                  </div>
                  <div
                    onClick={() => editTask(item.id)}
                    className="cursor-pointer"
                  >
                    <DotIcon className="w-5 h-5 z-10" />
                  </div>
                </div>

                {selectedTask === index && (
                  <div className=" bottom-0 left-0 right-0 p-2 w-full  bg-white">
                    <p>Completed: {`${item?.status}`}</p>
                    <p>{`Created At:  ${formattedDate} , ${formattedTime}`}</p>
                    <button
                      className="w-full py-1 bg-red-200 rounded-md text-red-500"
                      onClick={() => deleteTask(item.id)}
                    >
                      Delet
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Todos;
