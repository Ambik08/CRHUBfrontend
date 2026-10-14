import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function CRDashboardPage() {
    const [subjects,setSubjects] = useState([]);
    const [tasks,setTasks]=useState([]);
    const [notices,setNotices]=useState([]);
    const token = localStorage.getItem("token");
    useEffect(()=>{
        const fetchSubjects = async ()=>{
            try {
            const response = await fetch("http://localhost:8080/subject",
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
                setSubjects(data);
            }
            // else{
            //     const text =await response.text();
            //     toast.error(text);
            // }
        } 
        catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Error in dashboard frontend for subjects");
        }
    }
    fetchSubjects()

    const fetchTasks = async ()=>{
        try {
            const response = await fetch("http://localhost:8080/task",
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
                setTasks(data);
            }
            // else{
            //     const text =await response.text();
            //     toast.error(text);
            // }
        } 
        catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Error in dashboard frontend for tasks");
        }
    }
    fetchTasks()

    const fetchNotices = async ()=>{
        try {
            const response = await fetch("http://localhost:8080/notice",
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
                setNotices(data);
            }
            // else{
            //     const text =await response.text();
            //     toast.error(text);
            // }
        } 
        catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Error in dashboard frontend for notices");
        }
    }
    fetchNotices()
    },[])


    // const [formData,setFormData] = useState({subjectName:"",facultyName:"",facultyImageURL:"",cabinNumber:"",mobileNumber:"",email:""})
    const navigate=useNavigate();
    return (
<div className="min-h-screen bg-[#F7F8FC]">

<div className="max-w-[1700px] mx-auto px-10 py-8">

{/* Top Bar */}

<div className="flex justify-between items-center mb-8">

  <button
    onClick={() => navigate(-1)}
    className="
      inline-flex
      items-center
      gap-2
      bg-white
      border
      border-slate-200
      px-6
      py-3
      rounded-2xl
      shadow-md
      hover:shadow-xl
      hover:border-violet-300
      hover:text-violet-600
      transition-all
      font-bold
    "
  >
    ← Back
  </button>

  <button
    onClick={() =>{
        localStorage.removeItem("token"),
         navigate("/login")}}
    className="
      bg-red-500
      hover:bg-red-600
      text-white
      px-6
      py-3
      rounded-2xl
      shadow-lg
      font-bold
      transition
    "
  >
    Logout
  </button>

</div>

{/* HERO */}

<div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[40px] p-12 shadow-xl mb-16">
    <div className="flex justify-between items-center">

    <div>

    <h1 className="text-6xl font-black text-white">
    Welcome Back CR👋
    </h1>

    <p className="text-violet-100 mt-3 text-xl">
    Manage your academic subjects, tasks and notices.
    </p>

    </div>

    <button
    onClick={()=>navigate("/CRmanageStudent")}
    className="
    bg-white
    text-violet-700
    font-bold
    px-8
    py-4
    rounded-2xl
    shadow-lg
    hover:scale-105
    transition
    "
    >
    Manage Students
    </button>

    </div>

    </div>

    {/* SUBJECTS */}

    <div className="flex justify-between items-center mb-8">

    <h1 className="text-5xl font-black text-slate-900">
    Your Core Subjects
    </h1>

    <button
    onClick={()=>navigate("/CRAddSubjectPage")}
    className="
    bg-violet-600
    hover:bg-violet-700
    text-white
    px-7
    py-4
    rounded-2xl
    font-bold
    shadow-lg
    transition
    "
    >
    + Add Subject
    </button>

    </div>

    {subjects.length!==0 ? (

    <div className="relative">

    <Swiper

    modules={[Autoplay,Navigation,Pagination]}

    slidesPerView={1}

    centeredSlides

    loop={subjects.length>2}

    spaceBetween={40}

    autoplay={{
    delay:5000,
    disableOnInteraction:false
    }}

    navigation={{
    prevEl:".subject-prev",
    nextEl:".subject-next"
    }}

    pagination={{
    clickable:true
    }}

    className="pb-16"

    >

    {subjects.map(subject=>(

    <SwiperSlide key={subject.id}>

    <div
    className="
    bg-white
    rounded-[42px]
    border
    border-slate-200
    shadow-xl
    min-h-[340px]
    px-16
    py-12
    flex
    items-center
    justify-between
    "
    >

    <div className="flex items-center gap-14">

    <img

    src={subject.facultyImageURL}

    alt={subject.facultyName}

    className="
    w-52
    h-52
    rounded-full
    object-cover
    border-[8px]
    border-violet-50
    shadow-lg
    "

    />

    <div>

    <p className="uppercase tracking-[0.35em] text-violet-600 font-bold text-sm">
    Computer Science Department
    </p>

    <h1 className="text-7xl font-black mt-2 text-slate-900">
    {subject.subjectName}
    </h1>

    <p className="text-3xl text-slate-500 mt-2">
    {subject.facultyName}
    </p>

    <div className="mt-10 flex gap-16">

    <div>

    <p className="uppercase text-xs text-slate-400 font-bold">
    Cabin No.
    </p>

    <p className="mt-2 text-xl font-bold">
    {subject.cabinNumber}
    </p>

    </div>

    <div>

    <p className="uppercase text-xs text-slate-400 font-bold">
    Contact Email
    </p>

    <p className="mt-2 text-xl font-bold">
    {subject.email}
    </p>

    </div>

    <div>

    <p className="uppercase text-xs text-slate-400 font-bold">
    Phone
    </p>

    <p className="mt-2 text-xl font-bold">
    {subject.mobileNumber}
    </p>

    </div>

    </div>

    </div>

    </div>

    <Link

    to={`/CRsubject/${subject.id}`}

    className="
    bg-gradient-to-r
    from-violet-600
    to-indigo-600
    hover:from-violet-700
    hover:to-indigo-700
    text-white
    px-10
    py-5
    rounded-2xl
    font-bold
    text-lg
    shadow-xl
    "

    >

    Open Subject →

    </Link>

    </div>

    </SwiperSlide>

    ))}

    </Swiper>

    <button
    className="
    subject-prev
    absolute
    left-5
    top-1/2
    -z-0
    -translate-y-1/2
    w-16
    h-16
    rounded-full
    bg-white
    shadow-xl
    text-2xl
    "
    >

    ❮

    </button>

    <button
    className="
    subject-next
    absolute
    right-5
    top-1/2
    -z-0
    -translate-y-1/2
    w-16
    h-16
    rounded-full
    bg-white
    shadow-xl
    text-2xl
    "

    >

    ❯

    </button>

    </div>

    ):(


    <div className="bg-white rounded-[35px] p-16 text-center">

    <h2 className="text-2xl font-bold text-slate-500">

    No Subjects Available

    </h2>

    </div>

    )}

    {/* Tasks start here */}
    {/* ===================== TASKS ===================== */}

    {/* ===================== TASKS ===================== */}

    <div className="mt-20">

    <div className="flex items-center justify-between mb-8">

        <h2 className="text-5xl font-black text-slate-900">
        Upcoming Tasks
        </h2>

        <span className="bg-violet-100 text-violet-700 px-5 py-2 rounded-full font-bold">
        {tasks.length} Tasks
        </span>

    </div>

    {tasks.length !== 0 ? (

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">

        {tasks.map((task) => (

            <div
            key={task.id}
            className="
            bg-white
            rounded-[28px]
            border
            border-slate-200
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            p-7
            flex
            flex-col
            justify-between
            "
            >

            <div>

                <div className="flex items-center gap-3">

                <div className="w-4 h-4 rounded-full bg-violet-600"></div>

                <h3 className="text-2xl font-black">
                    {task.subjectName}
                </h3>

                </div>

                <p className="text-slate-500 mt-5 line-clamp-3 leading-7">

                {task.message} 

                </p>

                <div className="border-t border-slate-100 mt-6 pt-5">

                <div className="flex justify-between text-sm">

                    <span className="text-slate-400">
                    Issued
                    </span>

                    <span className="font-semibold">
                    {task.issuedDate}
                    </span>

                </div>

                <div className="flex justify-between mt-3">

                    <span className="text-red-500 font-bold">
                    Due
                    </span>

                    <span className="font-bold text-red-500">
                    {task.endDate}
                    </span>

                </div>

                </div>

            </div>

            <Link
                to={`/CRtask/${task.id}`}
                className="
                mt-8
                w-full
                text-center
                bg-gradient-to-r
                from-violet-600
                to-indigo-600
                hover:from-violet-700
                hover:to-indigo-700
                text-white
                py-3
                rounded-xl
                font-bold
                shadow-md
                transition
                "
            >
                View Task →
            </Link>

            </div>

        ))}

        </div>

    ) : (

        <div className="bg-white rounded-[30px] p-14 text-center shadow">

        <h2 className="text-2xl font-bold text-slate-500">
            🎉 No Tasks Right Now
        </h2>

        </div>

    )}

    </div>

    {/* ===================== NOTICES ===================== */}

    {/* ===================== NOTICES ===================== */}

    <div className="mt-20 mb-10">

    <div className="flex items-center justify-between mb-8">

        <h2 className="text-5xl font-black text-slate-900">
        Latest Notices
        </h2>

        <div className="flex items-center gap-4">

        <span className="bg-rose-100 text-rose-600 px-5 py-2 rounded-full font-bold">
            {notices.length} Notices
        </span>

        <button
            onClick={() => navigate("/CRAddNoticePage")}
            className="
            bg-violet-600
            hover:bg-violet-700
            text-white
            px-7
            py-3
            rounded-2xl
            font-bold
            shadow-lg
            transition
            "
        >
            + Add Notice
        </button>

        </div>

    </div>

    {notices.length !== 0 ? (

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">

        {notices.map((notice) => (

            <div
            key={notice.id}
            className="
                bg-white
                rounded-[28px]
                border
                border-slate-200
                shadow-md
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                p-7
                flex
                flex-col
                justify-between
            "
            >

            <div>

                <div className="flex items-center gap-3">

                <div className="w-4 h-4 rounded-full bg-rose-500"></div>

                <h3 className="text-2xl font-black text-slate-900">
                    Official Notice
                </h3>

                </div>

                <p className="mt-5 text-slate-600 leading-7 line-clamp-4">
                {notice.message}
                </p>

                <div className="border-t border-slate-100 mt-6 pt-5">

                <div className="flex justify-between">

                    <span className="text-slate-400">
                    Issued
                    </span>

                    <span className="font-semibold">
                    {notice.issuedDate}
                    </span>

                </div>

                <div className="flex justify-between mt-3">

                    <span className="text-slate-400">
                    Ends
                    </span>

                    <span className="font-semibold text-rose-500">
                    {notice.endDate}
                    </span>

                </div>

                </div>

            </div>

            <Link
                to={`/CRnotice/${notice.id}`}
                className="
                mt-8
                w-full
                text-center
                bg-gradient-to-r
                from-rose-500
                to-pink-500
                hover:from-rose-600
                hover:to-pink-600
                text-white
                py-3
                rounded-xl
                font-bold
                shadow-md
                transition
                "
            >
                View Notice →
            </Link>

            </div>

        ))}

        </div>

    ) : (

        <div className="bg-white rounded-[30px] p-14 text-center shadow">

        <h2 className="text-2xl font-bold text-slate-500">
            📢 No Notices Available
        </h2>

        </div>

    )}

    </div>

    </div>

    </div>

    );
}

export default CRDashboardPage
