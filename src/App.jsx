import { useState,useEffect } from "react"
import Task from "./Components/Task"
import { ToastContainer, toast } from 'react-toastify';
import {v4 as uuid} from "uuid";
  

function App() {
  const [input,setInput]=useState("");
  const [time,setTime]=useState("");
  const [btnText,setBtnText]=useState("ADD TASK");
  const [tasks,setTasks]=useState([]);
  const [idForTheUpdate,setIdForTheUpdate]=useState(null);

  useEffect(()=>{
    console.log(tasks);
    runCrawral();
  },[])
  

  const clearAllDetails=()=>{
    setInput("");
    setTime("");
  }

  const runCrawral=()=>{
    const date=new Date();
      const minute=date.getMinutes();
      const hour=date.getHours();
      console.log(tasks)
      console.log(tasks)
      const formateDate=`${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}`
        tasks.forEach((item,idx)=>{
          if(item.time== formateDate && !item.isCompleted){
              toast.error(`This ${idx+1} Task is incomplete`);
          }
        })
        setTimeout(runCrawral,10000);
  }
  
  
  const addOrEditTask=()=>{
     if(input.length==0 || time.length==0 ){
        toast.error("You Have To Fill All Filed");
        return;
      }

      if(btnText=="ADD TASK"){
          setTasks([...tasks,{id:uuid(),isCompleted:false,task:input,time:time}]);
          toast.success("Task Added")
          clearAllDetails(); 
      }
      else{
        console.log(idForTheUpdate)
        setTasks(
          tasks.map((item) => {
            return item.id == idForTheUpdate
              ? { ...item, task: input,time:time }
              : item;
          })
        );
        setBtnText("ADD TASK")
        clearAllDetails();
      }


  }
  return (
    <> 
      <div className="w-full bg-blue-950 flex justify-center min-h-screen"> 
        <ToastContainer/>
        <div className="container p-2 h-full border-2 border-white flex flex-col items-center">
            {/* search bar */}
            <h1 className="md:text-5xl text-xl text-white bg-transparent shadow-2xl shadow-white ">TODO LIST</h1>
            <div className="max-w-5xl min-h-[100px] flex flex-wrap gap-2 justify-center items-center ">
              <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Enter Task" className="border-white focus:bg-white focus:shadow-2xl shadow-white focus:text-black  border-2 outline-none text-white max-w-2xl h-[33px] rounded-md px-2 py-2 " name="" id="" />
              <input type="time"   value={time} onChange={(e)=>setTime(e.target.value)} className="border-white focus:bg-white focus:shadow-2xl shadow-white focus:text-black  border-2 outline-none text-white max-w-2xl h-[33px] rounded-md px-2 py-2 " name="" id="" />
              <button type="button" onClick={()=>addOrEditTask()} className="px-4 py-1 rounded-md border-2 text-white hover:shadow-2xl duration-700 cursor-pointer hover:bg-white hover:text-black shadow-white  border-white ">{btnText}</button>
            </div>  
            {/* List Of Task */}
            <h1 className="md:text-2xl text-md m-3 text-white bg-transparent shadow-2xl shadow-white ">TASKS</h1>


            <div className="max-w-2xl h-auto ">    
              {
                tasks.map((items)=>{
                  const {id,task,time,isCompleted}=items;
                  return <Task id={id} setTasks={setTasks} input={input} idForTheUpdate={idForTheUpdate} setIdForTheUpdate={setIdForTheUpdate} setInput={setInput}  btnText={btnText} setBtntext={setBtnText}  tasks={tasks} key={id} task={task} isCompleted={isCompleted} time={time}   setTime={setTime}/>
                })
              }
            </div>
        </div>
      </div>
    </>
  )
}

export default App
