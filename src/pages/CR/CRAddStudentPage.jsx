import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"

function CRAddStudentPage() {
  const [formData,setFormData] = useState({name:"",password:"",rollNo:"",email:""})
  const navigate=useNavigate();
  const token = localStorage.getItem("token");
  const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log("submit");
      try {
          const response = await fetch("http://localhost:8080/student/addStudent",
              {
                  method: "POST",
                   headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
                  body: JSON.stringify({
                      rollNo:formData.rollNo,
                      email:formData.email,
                      name:formData.name,
                      password:formData.password,
                  }),
              }
          );
          console.log(formData);
          localStorage.setItem("organisationName",JSON.stringify(formData.orgName));
          const text = await response.text();
          if(response.status===202){
            toast.success(text);
             setTimeout(() => {
                  navigate("/CRdashboard");
              }, 2000);
          }
          else{
            toast.error(text);
          }
      } 
    catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error in signup frontend");
    }
  }
  return (
  <div className="min-h-screen bg-[#F6F8FC] flex items-center justify-center px-6 py-10">

    <div className="w-full max-w-3xl">

      {/* Back Button */}

      <button
        onClick={() => navigate("/CRmanageStudent")}
        className="
          mb-8
          inline-flex
          items-center
          gap-2
          bg-white
          px-6
          py-3
          rounded-2xl
          shadow-md
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
          font-semibold
          text-slate-700
        "
      >
        ← Back
      </button>

      {/* Form Card */}

      <div className="bg-white rounded-[35px] shadow-2xl p-10">

        <div className="mb-10">

          <h1 className="text-5xl font-black text-slate-900">
            Add Student
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Register a new student to your class.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
        >

          {/* Roll Number */}

          <div>

            <label className="block mb-2 font-bold text-slate-600">
              Roll Number
            </label>

            <input
              type="text"
              placeholder="23311A05XX"
              value={formData.rollNo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rollNo: e.target.value,
                })
              }
              className="
                w-full
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:ring-2
                focus:ring-violet-500
              "
            />

          </div>

          {/* Name */}

          <div>

            <label className="block mb-2 font-bold text-slate-600">
              Student Name
            </label>

            <input
              type="text"
              placeholder="Enter student name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="
                w-full
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:ring-2
                focus:ring-violet-500
              "
            />

          </div>

          {/* Email */}

          <div>

            <label className="block mb-2 font-bold text-slate-600">
              Email Address
            </label>

            <input
              type="email"
              placeholder="student@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="
                w-full
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:ring-2
                focus:ring-violet-500
              "
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-bold text-slate-600">
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
              className="
                w-full
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:ring-2
                focus:ring-violet-500
              "
            />

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="
              w-full
              bg-gradient-to-r
              from-violet-600
              to-indigo-600
              hover:from-violet-700
              hover:to-indigo-700
              text-white
              text-lg
              font-bold
              py-4
              rounded-2xl
              shadow-xl
              transition
            "
          >
            + Add Student
          </button>

        </form>

      </div>

    </div>

  </div>
);
}

export default CRAddStudentPage
