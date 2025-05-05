import React, { useEffect } from "react";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("id")) {
      nav("/todo");
    }
  }, []);

  return (
    <div className="imgs w-full min-h-screen flex justify-center items-center">
      <div className="container  p-2  flex min-h-full justify-center items-center">
        <div className="max-w-xl gap-4   justify-center flex flex-col items-center min-h-[300px]">
          <h1 className="md:text-3xl text-xl text-white font-sans">
            WelCome To Todo List WebApp
          </h1>
          <div className="w-full gap-5  h-full flex justify-center">
            <button
              type="button"
              onClick={() => nav("/login")}
              className="border-white text-white max-w-md bg-transparent  border-2 px-3 py-1 rounded-xl shadow-2xl hover:shadow-white font-bold hover:bg-white hover:text-black"
            >
              LOG In
            </button>
            <button
              type="button"
              onClick={() => nav("/register")}
              className="border-white text-white bg-transparent  max-w-md border-2 px-3 py-1 rounded-xl shadow-2xl hover:shadow-white font-bold hover:bg-white hover:text-black"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
