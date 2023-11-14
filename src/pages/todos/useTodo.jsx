import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

const initialState = {
  userTask: "",
};

export function useTodos() {
  const [taskId, setTaskId] = useState("");
  const [userData, setUserData] = useState([]);
  const [task, setTask] = useState(initialState);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocs(collection(db, "userTask"));
        const tempArray = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUserData(tempArray);
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };
    fetchData();
  }, [task]);

  //  <------------- Add and Update Function -------------->
  const addOrUpdateTodo = async () => {
    const VenueId = Math.random().toString(36).substring(2);
    const venue = {
      userTask: task.userTask,
      id: VenueId,
      createdAt: serverTimestamp(),
      status: "Not Completed",
    };

    try {
      if (taskId) {
        await updateDoc(doc(db, "userTask", taskId), {
          userTask: task.userTask,
          updatedAt: serverTimestamp(),
        });
        setTaskId("");
      } else {
        await setDoc(doc(db, "userTask", VenueId), venue);
      }

      setTask(initialState);
    } catch (error) {
      console.error("Error adding or updating document: ", error);
    }
  };

  //    <--------------- Function for Delet Task -------------->
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "userTask", id));
      const todoTask = userData.filter((item) => item.id != id);
      setUserData(todoTask);
      selectedTask(null);
    } catch (error) {
      console.error("Error removing document(s): ", error);
    }
  };

  // <---------------- Function for Edit Task ------------->

  const editTask = async (id) => {
    setTaskId(id);
    const docRef = doc(db, "userTask", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.exists(), "docSnap.exists()", docSnap.data());
      setTask(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const handleTask = async (id, status) => {
    const washingtonRef = doc(db, "userTask", id);
    if (status == "Completed") {
      await updateDoc(washingtonRef, {
        status: "Not Completed",
      });
      let updatedArray = userData.map((obj) => {
        if (obj.id === id) {
          return { ...obj, status: " Not Completed" };
        } else {
          return obj;
        }
      });
      setUserData(updatedArray);
    } else {
      await updateDoc(washingtonRef, {
        status: "Completed",
      });
      let updatedArray = userData.map((obj) => {
        if (obj.id === id) {
          return { ...obj, status: "Completed" };
        } else {
          return obj;
        }
      });

      setUserData(updatedArray);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleClick = (index) => {
    setSelectedTask((prevSelectedTask) =>
      prevSelectedTask === index ? null : index
    );
  };

  return {
    task,
    userData,
    editTask,
    deleteTask,
    handleTask,
    handleClick,
    selectedTask,
    handleChange,
    addOrUpdateTodo,
  };
}
