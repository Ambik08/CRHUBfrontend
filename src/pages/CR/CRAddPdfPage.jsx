import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate, useParams} from "react-router-dom"

function CRAddPdfPage() {
    const [formData,setFormData] = useState({unit:"",unitUrl:""})
    const [uploading,setUploading] = useState(false);
  const navigate=useNavigate();
  const {subjectName} = useParams();
  const token = localStorage.getItem("token");
  const handleFileUpload = async (e)=>{
    const file =e.target.files[0];
    if(!file) return;
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset","crapp_ppandpdfs");
    data.append("cloud_name","dgcoqtkml");
    try {
        setUploading(true);
          const response = await fetch(`https://api.cloudinary.com/v1_1/dgcoqtkml/pdf/upload`,
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
          setFormData({...formData,unitUrl:securl})
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
                if (uploading) {
                toast.error("Please wait for upload to finish");
                return;
            }

            if (!formData.unitUrl) {
                toast.error("Please upload a PDF first");
                return;
            }
          const response = await fetch(`http://localhost:8080/pdf/${subjectName}`,
              {
                  method: "POST",
                  headers: {"Content-Type": "application/json",},
                  body: JSON.stringify({
                        unit:formData.unit,
                        unitUrl:formData.unitUrl,
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
      toast.error("Error in adding pdf frontend");
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
            Upload Study Material
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Upload a PDF for
            <span className="font-bold text-violet-600">
              {" "}{subjectName}
            </span>
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Unit */}

          <div>

            <label className="block mb-2 font-bold text-slate-600">
              Unit Name
            </label>

            <input
              type="text"
              placeholder="Unit 1"
              value={formData.unit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  unit: e.target.value,
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

          {/* PDF Upload */}

          <div>

            <label className="block mb-2 font-bold text-slate-600">
              Upload PDF
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="
                w-full
                border
                border-slate-200
                rounded-2xl
                p-3
                file:bg-violet-600
                file:text-white
                file:border-0
                file:px-5
                file:py-3
                file:rounded-xl
                file:cursor-pointer
                file:mr-4
              "
            />

            <p className="text-sm text-slate-400 mt-3">
              Upload lecture notes, assignments, or study material in PDF format.
            </p>

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
              disabled:cursor-not-allowed
            "
          >
            {uploading ? "Uploading PDF..." : "+ Upload PDF"}
          </button>

        </form>

      </div>

    </div>

  </div>
);
}

export default CRAddPdfPage
