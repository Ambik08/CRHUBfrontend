import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"

function CRAddSubjectPage() { 
const [formData,setFormData] = useState({subjectName:"",facultyName:"",facultyImageURL:"",cabinNumber:"",mobileNumber:"",email:""})
  const navigate=useNavigate();
  const token = localStorage.getItem("token");
  const [uploading,setUploading] = useState(false);
   const handleFileUpload = async (e)=>{
    const file =e.target.files[0];
    if(!file) return;
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset","crapp_ppandpdfs");
    data.append("cloud_name","dgcoqtkml");
    try {
        setUploading(true);
          const response = await fetch(`https://api.cloudinary.com/v1_1/dgcoqtkml/image/upload`,
              {
                  method: "POST",
                   headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
                  body: data
              }
          );
          
          const Url = await response.json();
          const securl= Url.secure_url;
          setFormData({...formData,facultyImageURL:securl})
          setUploading(false);
          console.log(file);
            console.log(file.type);
            console.log(file.name);
            console.log(file.size);
      } 
    catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error in adding pdf frontend");
    }
  }
  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
          const response = await fetch("http://localhost:8080/subject",
              {
                  method: "POST",
                  headers: {"Content-Type": "application/json","Authorization": `Bearer ${token}`},
                  body: JSON.stringify({
                      subjectName:formData.subjectName,
                      facultyName:formData.facultyName,
                      facultyImageURL:formData.facultyImageURL,
                      cabinNumber:formData.cabinNumber,
                      mobileNumber:formData.mobileNumber,
                      email:formData.email,
                  }),
              }
          );
          console.log(formData);
          const text = await response.text();
          if(response.status===201){
            toast.success("Subject succesfully added");
             setTimeout(() => {
                  navigate("/CRdashboard");
              }, 2000);
          }
          else{
            toast.error("error in backend adding subject or else try differnt name");
          }
      } 
    catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error in adding subject frontend");
    }
  }
return (
  <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center px-6 py-12">

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

      <div className="bg-white rounded-[35px] shadow-2xl p-10">

        {/* Header */}
        <div className="mb-10 text-center">

          <h1 className="text-5xl font-black text-slate-800">
            Add Subject
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Create a new subject for your students.
          </p>

        </div>

        {/* Your existing form continues here */}

      <form
        onSubmit={handleSubmit}
        className="space-y-7"
      >

        {/* Subject */}

        <div>

          <label className="block text-sm font-bold text-slate-600 mb-2">
            Subject Name
          </label>

          <input
            type="text"
            placeholder="Artificial Intelligence"
            value={formData.subjectName}
            onChange={(e) =>
              setFormData({
                ...formData,
                subjectName: e.target.value,
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

        {/* Faculty */}

        <div>

          <label className="block text-sm font-bold text-slate-600 mb-2">
            Faculty Name
          </label>

          <input
            type="text"
            placeholder="Dr. Kameshwari"
            value={formData.facultyName}
            onChange={(e) =>
              setFormData({
                ...formData,
                facultyName: e.target.value,
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

        {/* Image */}

        <div>

          <label className="block text-sm font-bold text-slate-600 mb-2">
            Faculty Profile Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="
              file:bg-violet-600
              file:text-white
              file:border-0
              file:px-5
              file:py-3
              file:rounded-xl
              file:cursor-pointer
              w-full
              border
              border-slate-200
              rounded-2xl
              p-3
            "
          />

        </div>

        {/* Cabin */}

        <div>

          <label className="block text-sm font-bold text-slate-600 mb-2">
            Cabin Number
          </label>

          <input
            type="text"
            placeholder="8206"
            value={formData.cabinNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                cabinNumber: e.target.value,
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

          <label className="block text-sm font-bold text-slate-600 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="faculty@gmail.com"
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

        {/* Phone */}

        <div>

          <label className="block text-sm font-bold text-slate-600 mb-2">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="9876543210"
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                mobileNumber: e.target.value,
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
          disabled={uploading}
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
            disabled:opacity-60
          "
        >
          {uploading ? "Adding Subject..." : "Add Subject"}
        </button>

      </form>

    </div>
             </div>
  </div>
);
}

export default CRAddSubjectPage
