import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"
import { useParams } from "react-router-dom";

function TaskPage() {
    const [resData,setResData] = useState({message:"",issuedDate:"",endDate:"",subjectName:""}) 
    const {id}=useParams();
    const token = localStorage.getItem("token");
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchTaskByID = async ()=>{
            try {
                
            const response = await fetch(`http://localhost:8080/task/by/${id}`,
                {
                    method: "GET",
                     headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
                }
            );
           
            if(response.status===302){
                const data = await response.json();
                setResData(data);
            }
            else{
                const text =await response.text();
                toast.error(text);
            }
        } 
        catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Error in subjectPage frontend");
        }
    }
    fetchTaskByID()
    },[])
  return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* Header */}
      <div className="bg-blue-600 px-8 py-6">
        <h1 className="text-2xl font-bold text-white">
          Task Details
        </h1>
      </div>

      {/* Content */}
      <div className="p-8">

        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          {resData.subjectName}
        </h2>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
            {resData.message}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-green-700 mb-2">
              Issued Date
            </h3>
            <p className="text-slate-700">
              {resData.issuedDate}
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="font-semibold text-red-700 mb-2">
              Due Date
            </h3>
            <p className="text-slate-700">
              {resData.endDate}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  </div>
)
}

export default TaskPage
