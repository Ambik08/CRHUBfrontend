import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"

function LoginPage() {
  const [formData,setFormData] = useState({userName:"",password:""})
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log("submit");
      try {
          const response = await fetch("http://localhost:8080/users/login",
              {
                  method: "POST",
                   headers: {
        "Content-Type": "application/json",
    },
                  body: JSON.stringify({
                      email:formData.userName,
                      password:formData.password
                  }),
              }
          );
          console.log(formData);
          if (!response.ok) {
    const errorMessage = await response.text();
    console.error(
        "API Error:",
        response.status,
        errorMessage
    );
    toast.error(`Request failed: ${response.status}`);
    return;
}
          // localStorage.setItem("organisationName",JSON.stringify(formData.orgName));
          
          if(response.status===200){
            const jwt = await response.text();
            toast.success("succesfully logged in");
            localStorage.setItem("token",jwt);
            if(formData.userName==="cr@gmail.com"){
              setTimeout(() => {
                  navigate("/CRdashboard");
              }, 2000);
            }
            else{
             setTimeout(() => {
                  navigate("/dashboard");
              }, 2000);
            }
          }
          else{
            const text = await response.text();
            toast.error(text);
          }
      } 
    catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error in signup frontend");
    }
  }
return (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Welcome Back
        </h1>
        <p className="text-slate-500 mt-2">
          Login to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={formData.userName}
            onChange={(e) =>
              setFormData({
                ...formData,
                userName: e.target.value,
              })
            }
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold transition duration-300"
        >
          Login
        </button>
      </form>

      <p className="text-center text-slate-500 mt-6">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-violet-600 font-semibold hover:text-violet-700"
        >
          Sign Up
        </Link>
      </p>
    </div>
  </div>
);

}
export default LoginPage;