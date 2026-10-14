import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"
function CRAddNoticePage() {
  const [formData,setFormData] = useState({subject:"",message:""})
  const navigate=useNavigate();
  const token = localStorage.getItem("token");
  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
          const response = await fetch("http://localhost:8080/notice",
              {
                  method: "POST",
                  headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                  body: JSON.stringify({
                        subject:formData.subject,
                        message:formData.message,
                  }),
              }
          );
          console.log(formData);
          const text = await response.text();
          if(response.status===200){
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
      toast.error("Error in adding notice frontend");
    }
  }
  return (
  <div className="min-h-screen bg-[#F6F8FC] flex items-center justify-center px-6 py-10">

    <div className="w-full max-w-3xl">

      {/* Back Button */}

      <button
        onClick={() => navigate("/CRdashboard")}
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
            Add Notice
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Publish an official notice for your students.
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
              placeholder="Operating Systems"
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
                outline-none
                focus:ring-2
                focus:ring-violet-500
              "
            />

          </div>

          {/* Message */}

          <div>

            <label className="block mb-2 font-bold text-slate-600">
              Notice Message
            </label>

            <textarea
              rows="6"
              placeholder="Write the notice here..."
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
            + Publish Notice
          </button>

        </form>

      </div>

    </div>

  </div>
);

}

export default CRAddNoticePage
