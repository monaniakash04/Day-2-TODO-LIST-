import React,{useEffect} from "react";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { register } from "../validation/Validation";
import { ToastContainer,toast } from "react-toastify";

const Register = () => {
    const nav=useNavigate();
  let initi = {
    id:uuid(),
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
  };
   useEffect(()=>{
      if(localStorage.getItem("id")){
          nav("/todo")
      }
    },[])

  const { values, handleChange, handleSubmit, errors } = useFormik({
    
    initialValues:initi,
    validationSchema:register,
    onSubmit:async(val)=>{
      const echkRes=await fetch(`http://localhost:3000/users?email=${val.email}`);
      const echkCount=await echkRes.json();
      console.log(echkCount)
      if(echkCount.length>0){
        toast.error("Email Must be Unique");
        return
      }
        const res=await fetch(`http://localhost:3000/users`,{
            method:"POST",
            body:JSON.stringify(val)
        })
        const result=await res.json();
        console.log(result)
        
    }

  })

  return (
    <div className="w-full imgs  min-h-screen flex justify-center font-sans">
        <ToastContainer/>
      <div className="container  min-h-[100px]  flex justify-center items-center">
        <div className="max-w-xl md:p-5 p-2 border-2 rounded-3xl shadow-2xl shadow-white backdrop-blur-none bg-white/10 flex-col min-h-[300px]  text-white flex items-center gap-5 ">
          <h1 className="md:text-4xl mb-4 text-xl text-white ">Register</h1>
          <div className=" gap-4 b0 max-w-lg h-auto flex p-2 flex-col items-center">
            <input
              type="text"
              value={values.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter Name"
              className="border-white max-w-full outline-none border-2 px-3 py-1 rounded-xl shadow-2xl focus:shadow-white"
              id="name"
            />
            <input
              type="text"
              value={values.email}
              onChange={handleChange}
              name="email"
              placeholder="Enter Email"
              className="border-white max-w-full outline-none border-2 px-3 py-1 rounded-xl shadow-2xl focus:shadow-white"
              id="email"
            />
            <input
              type="text"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="border-white outline-none max-w-full border-2 px-3 py-1 rounded-xl shadow-2xl focus:shadow-white"
              id="password"
            />
            <input
              type="text"
              name="cnfPassword"
              value={values.cnfPassword}
              onChange={handleChange}
              placeholder="Enter Confirm Password"
              className="border-white outline-none max-w-full border-2 px-3 py-1 rounded-xl shadow-2xl focus:shadow-white"
              id="cnfPassword"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
               if(errors.name || errors.email || errors.password || errors.cnfPassword){
                toast.error(errors.name || errors.email || errors.password || errors.cnfPassword)
                return;
               }
                handleSubmit();
              }}
              type="button"
              className="border-white min-w-full bg-transparent  max-w-full border-2 px-3 py-1 rounded-xl shadow-2xl hover:shadow-white font-bold hover:bg-white hover:text-black"
            >
              Register
            </button>
            <h1>OR</h1>
            <h1>Already Have An Account?<span className="underline cursor-pointer" onClick={()=>nav("/login")}>Login</span></h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
