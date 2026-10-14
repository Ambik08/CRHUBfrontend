import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"
import { useParams } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";

function CRSubjectPage() {
    const [formData, setFormData] = useState({
        subjectName: "",
        facultyName: "",
        facultyImageURL: "",
        cabinNumber: "",
        mobileNumber: "",
        email: "",
        tasks: [],
        pdf: []
    });   
    const {id}=useParams();
    const navigate=useNavigate();
    const token = localStorage.getItem("token");
    useEffect(()=>{
        const fetchSubject = async ()=>{
            try {
                
            const response = await fetch(`http://localhost:8080/subject/${id}`,
                {
                    method: "GET",
                     headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
                }
            );
            console.log("Subject ID:", id);
            console.log("Response status:", response.status);
            console.log("Response body:", text);
           
            if (response.ok) {
              const data = await response.json();

              setFormData({
                  ...data,
                  tasks: data.tasks ?? [],
                  pdf: data.pdf ?? []
              });
          }
            else{
                const text =await response.text();
                console.log(text);
                toast.error("error in getting ssubject from backend");
            }
        } 
        catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Error in subjectPage frontend");
        }
    }
    fetchSubject()
    },[])

  return (
  <div className="min-h-screen bg-[#F6F8FC] py-10 px-6">

    <div className="max-w-7xl mx-auto">

      {/* ================= SUBJECT HEADER ================= */}

      <div className="bg-white rounded-[35px] shadow-xl p-10 mb-12">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          <div className="flex items-center gap-8">

            <img
              src={
                formData.facultyImageURL ||
                "https://via.placeholder.com/180"
              }
              alt={formData.facultyName}
              className="w-40 h-40 rounded-full object-cover border-[6px] border-violet-100 shadow-lg"
            />

            <div>

              <p className="uppercase tracking-[0.3em] text-violet-600 text-sm font-bold">
                Subject
              </p>

              <h1 className="text-6xl font-black text-slate-900 mt-2">
                {formData.subjectName}
              </h1>

              <h3 className="text-3xl text-slate-500 mt-2">
                {formData.facultyName}
              </h3>

            </div>

          </div>

          <div className="grid grid-cols-3 gap-12">

            <div>

              <p className="text-xs uppercase text-slate-400 font-bold">
                Cabin
              </p>

              <p className="font-bold text-lg mt-2">
                {formData.cabinNumber}
              </p>

            </div>

            <div>

              <p className="text-xs uppercase text-slate-400 font-bold">
                Email
              </p>

              <p className="font-bold text-lg mt-2 break-all">
                {formData.email}
              </p>

            </div>

            <div>

              <p className="text-xs uppercase text-slate-400 font-bold">
                Phone
              </p>

              <p className="font-bold text-lg mt-2">
                {formData.mobileNumber}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= TASKS ================= */}

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-4xl font-black">
          Tasks
        </h2>

        <button
          onClick={() => navigate(`/CRAddTaskPage/${id}`)}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition"
        >
          + Add Task
        </button>

      </div>

      {formData.tasks.length !== 0 ? (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-14">

          {formData.tasks.map(task => (

            <div
              key={task.id}
              className="bg-white rounded-[28px] p-7 shadow-lg hover:shadow-xl transition"
            >

              <span className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-xs font-bold">
                TASK
              </span>

              <h2 className="text-2xl font-bold mt-4">
                {task.subjectName}
              </h2>

              <p className="text-slate-600 mt-3">
                {task.message}
              </p>

              <div className="mt-6 border-t pt-4 space-y-2">

                <p>
                  <span className="text-slate-400">Issued:</span>{" "}
                  <span className="font-semibold">{task.issuedDate}</span>
                </p>

                <p>
                  <span className="text-slate-400">Due:</span>{" "}
                  <span className="font-semibold text-red-500">
                    {task.endDate}
                  </span>
                </p>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="bg-white rounded-[25px] p-10 text-center shadow mb-14">

          <h2 className="text-slate-500 text-xl">
            No Tasks Available
          </h2>

        </div>

      )}

      {/* ================= PDFS ================= */}

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-4xl font-black">
          Study Material
        </h2>

        <button
          onClick={() => navigate(`/CRAddPdfPage/${id}`)}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition"
        >
          + Add PDF
        </button>

      </div>

      {formData.pdf.length !== 0 ? (

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {formData.pdf.map(p => (

            <div
              key={p.id}
              className="bg-white rounded-[28px] shadow-lg p-7 hover:shadow-xl transition"
            >

              <div className="text-5xl mb-5">
                📄
              </div>

              <p className="text-violet-600 uppercase text-xs font-bold">
                Study Material
              </p>

              <h2 className="text-3xl font-black mt-2">
                Unit {p.unit}
              </h2>

              <a
                href={p.unitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                View PDF
              </a>

            </div>

          ))}

        </div>

      ) : (

        <div className="bg-white rounded-[25px] p-10 text-center shadow">

          <h2 className="text-slate-500 text-xl">
            No PDFs Uploaded Yet
          </h2>

        </div>

      )}

    </div>

  </div>
);
}

export default CRSubjectPage







