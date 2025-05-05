import React,{useEffect} from "react";
import { useFormik } from "formik";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { login } from "../validation/Validation";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const nav = useNavigate();
  let initi = {
    email: "",
    password: "",
  };

  useEffect(()=>{
    if(localStorage.getItem("id")){
        nav("/todo")
    }
  },[])

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initi,
    validationSchema: login,
    onSubmit: async (val) => {
        console.log(val)
      const res = await fetch(`http://localhost:3000/users?email:${val.email}&password:${val.password}`);
      const result = await res.json();
      console.log(result)
        if(result.length==0){
                toast.error("Username Or Password Wrong");
                return;
        }else{
                result.forEach((item)=>{
                    const {email,password,id}=item;
                    if(email==val.email && password==val.password)
                    {
                            nav("/")   
                            localStorage.setItem("id",id);
                    }
                })
                toast.error("Username Or Password Wrong")
        }
    },
  });

  return (
    <div className="w-full imgs  min-h-screen flex justify-center font-sans">
      <ToastContainer />
      <div className="container  min-h-[100px]  flex justify-center items-center">
        <div className="max-w-xl md:p-5 p-2 border-2 rounded-3xl shadow-2xl shadow-white backdrop-blur-none bg-white/10 flex-col min-h-[300px]  text-white flex items-center gap-5 ">
          <h1 className="md:text-4xl mb-4 text-xl text-white ">LOG IN</h1>
          <div className=" gap-4 b0 max-w-lg h-auto flex p-2 flex-col items-center">
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
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (errors.email || errors.password) {
                  toast.error(errors.email || errors.password);
                  return;
                }
                handleSubmit();
              }}
              className="border-white min-w-full bg-transparent  max-w-full border-2 px-3 py-1 rounded-xl shadow-2xl hover:shadow-white font-bold hover:bg-white hover:text-black"
            >
              LOG IN
            </button>
            <h1>OR</h1>
            <h1>
              Don't Have An Account?
              <span
                className="underline cursor-pointer"
                onClick={() => nav("/register")}
              >
                Register
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
