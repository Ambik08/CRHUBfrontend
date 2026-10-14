import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate, useParams} from "react-router-dom"

function CRAddTaskPage() {
  const [formData,setFormData] = useState({subject:"",message:"",endDate:""})
  const navigate=useNavigate();
  const {subjectName} = useParams();
  const token = localStorage.getItem("token");
  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
          const response = await fetch(`http://localhost:8080/task/${subjectName}`,
              {
                  method: "POST",
                   headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
                  body: JSON.stringify({
                        head:formData.subject,
                        message:formData.message,
                        endDate:formData.endDate,
                  }),
              }
          );
          console.log(formData);
          const text = await response.text();
          if(response.status===201){
            toast.success(text);
             setTimeout(() => {
                  navigate(`/CRsubject/${subjectName}`);
              }, 2000);
          }
          else{
            toast.error(text);
          }
      } 
    catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error in adding notice frontend");
    }
  }
  return (
  <div className="min-h-screen bg-[#F6F8FC] flex items-center justify-center px-6 py-10">

    <div className="w-full max-w-3xl">

      {/* Back Button */}

      <button
        onClick={() => navigate(`/CRsubject/${subjectName}`)}
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
            Add Task
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Create a new task for
            <span className="font-bold text-violet-600">
              {" "}{subjectName}
            </span>
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
        >

          {/* Subject */}

          <div>

            <label className="block mb-2 font-bold text-slate-600">
              Subject
            </label>

            <input
              type="text"
              placeholder="Subject Name"
              value={formData.subject}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subject: e.target.value,
                })
              }
              className="
                w-full
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                focus:ring-2
                focus:ring-violet-500
                outline-none
              "
            />

          </div>

          {/* Message */}

          <div>

            <label className="block mb-2 font-bold text-slate-600">
              Task Description
            </label>

            <textarea
              rows="5"
              placeholder="Enter task details..."
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              className="
                w-full
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                resize-none
                focus:ring-2
                focus:ring-violet-500
                outline-none
              "
            />

          </div>

          {/* Due Date */}

          <div>

            <label className="block mb-2 font-bold text-slate-600">
              Due Date
            </label>

            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endDate: e.target.value,
                })
              }
              className="
                w-full
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                focus:ring-2
                focus:ring-violet-500
                outline-none
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
            + Add Task
          </button>

        </form>

      </div>

    </div>

  </div>
);

}

export default CRAddTaskPage
