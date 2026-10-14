import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"

function CRManageStudentPage() {
const [students,setStudents] = useState([])
  const navigate=useNavigate();
  const token = localStorage.getItem("token");
  useEffect( ()=>{
    const fetchStudents= async()=>{
      try {
            const response = await fetch("http://localhost:8080/student",
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
                console.log(data);
                setStudents(data);
            }
            else{
                const text = await response.text();
                toast.error(text);
            }
        } 
        catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Error in adding notice frontend");
        }
    }
    fetchStudents();
  },[])
  return (
  <div className="min-h-screen bg-[#F6F8FC] py-10 px-6">

    <div className="max-w-7xl mx-auto">

      {/* Top Bar */}

      <div className="flex justify-between items-center mb-8">

        <button
          onClick={() => navigate("/CRdashboard")}
          className="
            bg-white
            px-6
            py-3
            rounded-2xl
            shadow-md
            hover:shadow-xl
            transition
            font-bold
            text-slate-700
          "
        >
          ← Back
        </button>

        <button
          onClick={() => navigate("/CRAddStudentPage")}
          className="
            bg-gradient-to-r
            from-violet-600
            to-indigo-600
            hover:from-violet-700
            hover:to-indigo-700
            text-white
            px-7
            py-3
            rounded-2xl
            shadow-lg
            font-bold
            transition
          "
        >
          + Add Student
        </button>

      </div>

      {/* Header */}

      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[35px] p-10 shadow-xl mb-12 text-white">

        <h1 className="text-5xl font-black">
          Student Management
        </h1>

        <p className="mt-3 text-violet-100 text-lg">
          Manage all students registered in your class.
        </p>

      </div>

      {/* Count */}

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-4xl font-black text-slate-900">
          Students
        </h2>

        <span className="bg-violet-100 text-violet-700 px-5 py-2 rounded-full font-bold">
          {students.length} Students
        </span>

      </div>

      {students.length !== 0 ? (

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-7">

          {students.map((student) => (

            <div
              key={student.rollNo}
              className="
                bg-white
                rounded-[30px]
                shadow-lg
                border
                border-slate-200
                p-8
                hover:shadow-2xl
                hover:-translate-y-1
                transition-all
              "
            >

              <div className="flex items-center gap-5">

                <div
                  className="
                    w-16
                    h-16
                    rounded-full
                    bg-gradient-to-r
                    from-violet-600
                    to-indigo-600
                    text-white
                    flex
                    items-center
                    justify-center
                    text-2xl
                    font-bold
                  "
                >
                  {student.name.charAt(0).toUpperCase()}
                </div>

                <div>

                  <h2 className="text-2xl font-black text-slate-900">
                    {student.name}
                  </h2>

                  <p className="text-slate-500">
                    Roll No: {student.rollNo}
                  </p>

                </div>

              </div>

              <div className="mt-8 space-y-4">

                <div>

                  <p className="text-xs uppercase text-slate-400 font-bold">
                    Password
                  </p>

                  <p className="font-semibold text-slate-700">
                    {student.password}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase text-slate-400 font-bold">
                    Role
                  </p>

                  <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    {student.roles}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="bg-white rounded-[30px] shadow-lg p-14 text-center">

          <h2 className="text-2xl font-bold text-slate-500">
            👨‍🎓 No Students Added Yet
          </h2>

        </div>

      )}

    </div>

  </div>
);
}

export default CRManageStudentPage
