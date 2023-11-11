import React, { useEffect, useState } from 'react'
import profileImage from "../assets/images/profile.jpg";
import PlusIcon from '../assets/icons/PlusIcon'
import ListIcon from "../assets/icons/ListIcon"
import ChevronIcon from "../assets/icons/ChevronIcon";
import CheckCircleIcon from "../assets/icons/CheckCircleIcon";
import DotIcon from "../assets/icons/DotIcon";
import { db } from '../firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
const initilaState = {
    userTask: ""
}
function Todos() {

    const [task, setTask] = useState(initilaState)
    const [userData, setUserData] = useState([])
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskId, setTaskId] = useState("")
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
    }
    useEffect(() => {
        fetchData()
    }, [task])

    //  <------------- Add and Update Function -------------->
    const addOrUpdateTodo = async () => {
        const VenueId = Math.random().toString(36).substring(2);
        const venue = {
            userTask: task.userTask,
            id: VenueId,
            createdAt: serverTimestamp(),
            status: "Not Completed"
        };

        try {
            if (taskId) {
                await updateDoc(doc(db, "userTask", taskId), {
                    userTask: task.userTask,
                    updatedAt: serverTimestamp(),
                });
                setTaskId("")
            } else {
                await setDoc(doc(db, "userTask", VenueId), venue);
            }

            setTask(initilaState);
        } catch (error) {
            console.error("Error adding or updating document: ", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((pre) => ({
            ...pre,
            [name]: value
        }));
    };
    const handleClick = (index) => {
        setSelectedTask((prevSelectedTask) => (prevSelectedTask === index ? null : index));
    };

    //    <--------------- Function for Delet Task -------------->
    const deletTask = async (id) => {
        try {
            await deleteDoc(doc(db, "userTask", id));
            const todoTask = userData.filter((item) => item.id != id);
            setUserData(todoTask)
            selectedTask(null)
        } catch (error) {
            console.error("Error removing document(s): ", error);
        }

    }

    // <---------------- Function for Edit Task ------------->

    const editTask = async (id) => {
        setTaskId(id)
        const docRef = doc(db, "userTask", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log(docSnap.exists(), "docSnap.exists()", docSnap.data())
            setTask(docSnap.data());
        } else {
            console.log("No such document!");
        }
    }
    const handleTask = async (id, status) => {
        const washingtonRef = doc(db, "userTask", id);
        console.log(status, "111")
        if (status == "Completed") {
            await updateDoc(washingtonRef, {
                status: "Not Completed"
            });
            let updatedArray = userData.map(obj => {
                if (obj.id === id) {
                    return { ...obj, status: " Not Completed" };
                } else {
                    return obj;
                }
            });
            setUserData(updatedArray)
        } else {
            await updateDoc(washingtonRef, {
                status: "Completed"
            });
            let updatedArray = userData.map(obj => {
                if (obj.id === id) {
                    return { ...obj, status: "Completed" };
                } else {
                    return obj;
                }
            });
            console.log(updatedArray, "updatedArray")
            setUserData(updatedArray)
        }

    }
    return (
        <div className="flex  flex-col items-center justify-center h-screen w-[285px]">

            {/* <------------- Profile Secton ------------->  */}


            <div>
                <img src={profileImage} alt="sdf" className='rounded-full w-20 h-20 border-gray-200 border-4 ' />
            </div>

            {/* <--------------- Add Task Section ---------------> */}

            <div className='bg-white flex p-1 rounded-md my-5'>
                <input type="text" name="userTask" value={task.userTask} placeholder='Add new task' onChange={handleChange} className='outline-none' />
                <div className='bg-primary cursor-pointer rounded-md' onClick={() => addOrUpdateTodo()}>
                    <PlusIcon />
                </div>
            </div>


            {/* <------------------ your todos Section ------------------> */}
            <div className='relative cursor-pointer rounded-md flex w-full border-gray-100 border justify-between items-center px-1 mb-2'>
                <div className='flex items-center relative z-10'>
                    <ListIcon />
                    <p className='p-1 text-white'>Your todos</p>
                </div>
                <div className="absolute top-0 left-0 w-full h-full rounded-md backdrop-blur-md   z-0"></div>
                <ChevronIcon className="w-5 h-5 z-10" />
            </div>

            {/* <------------------ Task Section ------------------>   */}

            <div className='relative w-full h-[30%] overflow-y-auto flex  items-center flex-col'>
                <div className="absolute top-0 left-0 w-full h-full rounded-md backdrop-blur-md bg-white bg-opacity-60 z-0"></div>
                {
                    !userData.length ? (
                        <p className="z-10 h-full flex justify-center items-center">No task today</p>
                    ) : (
                        userData.map((item, index) => {
                            const timestamp = item.createdAt
                            const date = timestamp.toDate();
                            const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
                            const dateObject = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
                            const month = dateObject.getMonth() + 1;
                            const day = dateObject.getDate();
                            const year = dateObject.getFullYear();
                            const formattedDate = `${month}/${day}/${year}`;
                            return (
                                <div key={index} className='z-10 flex   flex-col items-center  justify-between w-full  border-b border-secondry  backdrop-blur-md bg-white bg-opacity-60 ' >
                                    <div className='flex items-center justify-between py-2  relative z-10 cursor-pointer w-full px-2' >
                                        <div className='flex items-center'>
                                            <div onClick={() => handleTask(item.id, item.status)}>
                                                <CheckCircleIcon className="w-5 h-5" />
                                            </div>
                                            <p className='p-1 text-sm' onClick={() => handleClick(index)} >{item.userTask}</p>
                                        </div>
                                        <div onClick={() => editTask(item.id)} className='cursor-pointer'>
                                            <DotIcon className="w-5 h-5 z-10" />
                                        </div>
                                    </div>

                                    {selectedTask === index && (
                                        <div className=" bottom-0 left-0 right-0 p-2 w-full  bg-white">
                                            <p>Completed: {`${item?.status}`}</p>
                                            <p>{`Created At:  ${formattedDate} , ${formattedTime}`}</p>
                                            <button className='w-full py-1 bg-red-200 rounded-md text-red-500' onClick={() => deletTask(item.id)}>Delet</button>
                                        </div>
                                    )}
                                </div>
                            )
                        }

                        )
                    )
                }

            </div>

        </div>
    )
}

export default Todos