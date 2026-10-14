import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"
import { useParams } from "react-router-dom";

function CRNoticePage() {
    const [resData,setResData] = useState({message:"",issuedDate:""}) 
    const {id}=useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchTaskByID = async ()=>{
            try {
                
            const response = await fetch(`http://localhost:8080/notice/${id}`,
                {
                    method: "GET",
                     headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
                }
            );
           
            if(response.status===200){
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
  <div className="min-h-screen bg-[#F6F8FC] py-10 px-6">

    <div className="max-w-5xl mx-auto">

      {/* Back Button */}

      <button
        onClick={() => navigate("/CRDashboard")}
        className="
          mb-8
          flex
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

      {/* Header */}

      <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-[35px] p-10 shadow-xl mb-10 text-white">

        <p className="uppercase tracking-[0.3em] text-rose-100 text-sm font-bold">
          Official Notice
        </p>

        <h1 className="text-5xl font-black mt-2">
          Notice Details
        </h1>

      </div>

      {/* Notice Card */}

      <div className="bg-white rounded-[35px] shadow-xl p-10">

        <span className="inline-block bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-bold">
          NOTICE
        </span>

        <h2 className="text-3xl font-bold text-slate-900 mt-6">
          Announcement
        </h2>

        <p className="text-slate-600 text-lg leading-8 mt-4">
          {resData.message}
        </p>

        <div className="mt-10">

          <div className="bg-slate-50 rounded-2xl p-6 border">

            <p className="uppercase text-xs text-slate-400 font-bold">
              Issued Date
            </p>

            <h3 className="text-2xl font-bold mt-2 text-slate-800">
              {resData.issuedDate}
            </h3>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}

export default CRNoticePage
