import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function DashboardPage() {
    const [subjects,setSubjects] = useState([]);
    const token = localStorage.getItem("token");
    const [tasks,setTasks]=useState([]);
    const [notices,setNotices]=useState([]);
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
            else{
                const text =await response.text();
                toast.error(text);
            }
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
            else{
                const text =await response.text();
                toast.error(text);
            }
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
            else{
                const text =await response.text();
                toast.error(text);
            }
        } 
        catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Error in dashboard frontend for notices");
        }
    }
    fetchNotices()



    },[])
return (
  <div className="min-h-screen bg-[#F8F9FD] p-12 font-sans text-slate-800">
    
    {/* HEADER HERO STRIP */}
    <div className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[35px] p-12 mb-14 text-white shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold tracking-tight">Welcome Back Student👋</h1>
        <p className="text-violet-100 text-lg mt-2 font-medium">
          Manage your academic subjects, upcoming tasks, and official notices all in one unified space.
        </p>
      </div>
      <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
    </div>

    {/* SUBJECTS CAROUSEL SECTION */}
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Core Subjects</h2>
      </div>

      {subjects.length !== 0 ? (
        <div className="relative group px-2">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            centeredSlides={true}
            loop={subjects.length > 2}
            slidesPerView={1}
            spaceBetween={40}
            breakpoints={{
              1024: { slidesPerView: 1.18, spaceBetween: 50 }
            }}
            pagination={{
              clickable: true,
              el: '.custom-swiper-pagination',
            }}
            navigation={{
              prevEl: '.subject-prev-btn',
              nextEl: '.subject-next-btn',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="pb-16"
          >
            {subjects.map((subject) => (
              <SwiperSlide key={subject.id}>
                <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-100/50 p-14 min-h-[380px] flex flex-col lg:flex-row items-center justify-between gap-12 transition-all duration-300">
                  
                  <div className="flex flex-col lg:flex-row items-center gap-10 text-center lg:text-left w-full">
                    <img
                      src={subject.facultyImageURL || "/faculty.png"}
                      alt={subject.facultyName}
                      className="w-100 h-100 rounded-full object-cover border-[8px] border-violet-50 shadow-md flex-shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-violet-600 uppercase tracking-widest block mb-1">
                        Computer Science Department
                      </span>
                      <h3 className="text-6xl font-black text-slate-900 tracking-tight">
                        {subject.subjectName}
                      </h3>
                      <p className="text-2xl font-semibold text-slate-500 mt-2">
                        {subject.facultyName}
                      </p>

                      {/* INFO GRID STRIP */}
                      <div className="flex flex-wrap gap-x-16 gap-y-4 mt-8 pt-8 border-t border-slate-100 justify-center lg:justify-start">
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Cabin No.</span>
                          <span className="text-lg font-bold text-slate-700 mt-1 block">{subject.cabinNumber || "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Contact Email</span>
                          <span className="text-lg font-bold text-slate-700 mt-1 block">{subject.email || "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Phone Line</span>
                          <span className="text-lg font-bold text-slate-700 mt-1 block">{subject.mobileNumber || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/subject/${subject.subjectName}`}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl text-lg font-bold tracking-wide transition-all whitespace-nowrap shadow-xl shadow-violet-200/50 flex items-center gap-3 self-center lg:self-center"
                  >
                    Open Subject
                    
                  </Link>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* CONTROLS */}
          <div className="custom-swiper-pagination flex justify-center gap-2.5 absolute bottom-2 left-0 right-0 z-10" />
          
          <button className="subject-prev-btn absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white border border-slate-200 shadow-xl flex items-center justify-center text-slate-600 hover:text-violet-600 transition-all text-xl">
            ❮
          </button>
          <button className="subject-next-btn absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white border border-slate-200 shadow-xl flex items-center justify-center text-slate-600 hover:text-violet-600 transition-all text-xl">
            ❯
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-[32px] p-12 text-center border border-dashed border-slate-200">
          <p className="text-slate-400 font-semibold text-lg">No subjects listed at the moment.</p>
        </div>
      )}
    </div>

    {/* UPCOMING TASKS SECTION */}
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">Upcoming Tasks</h2>
        <Link to="/tasks" className="text-3xl font-bold text-violet-600 hover:text-violet-700 bg-white border border-slate-200 px-5 py-2.5 rounded-xl shadow-sm transition-all">
          View All Tasks ❯
        </Link>
      </div>

      {tasks.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-md shadow-slate-100/60 flex flex-col justify-between min-h-[180px] hover:border-slate-200 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 block" />
                  <h3 className="font-extrabold text-slate-900 text-4xl tracking-tight line-clamp-1">{task.subjectName}</h3>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{task.message}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-md">
                  Due: {task.endDate}
                </span>
                <Link to={`/task/${task.id}`} className="text-sm font-bold text-slate-400 hover:text-violet-600 transition-colors">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[24px] p-10 text-center border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-base font-semibold">No Tasks as of now guys Enjoyy!!!!!!! 🎉</p>
        </div>
      )}
    </div>

    {/* LATEST NOTICES SECTION */}
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">Latest Notices</h2>
        <Link to="/notices" className="text-3xl font-bold text-violet-600 hover:text-violet-700 bg-white border border-slate-200 px-5 py-2.5 rounded-xl shadow-sm transition-all">
          View All Notices ❯
        </Link>
      </div>

      {notices.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {notices.map((notice) => (
            <div key={notice.id} className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-md shadow-slate-100/60 flex flex-col justify-between min-h-[180px] hover:border-slate-200 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full bg-rose-500 block" />
                  <h3 className="font-extrabold text-slate-900 text-3xl tracking-tight line-clamp-1">Notice Update</h3>
                </div>
                <p className="text-2xl text-slate-600 font-semibold line-clamp-2 leading-relaxed">{notice.message}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Issued: {notice.issuedDate}
                </span>
                <Link to={`/notice/${notice.id}`} className="text-3xl  font-bold text-slate-400 hover:text-rose-500 transition-colors">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[24px] p-10 text-center border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-base font-semibold">No notices as of now if any we will inform you</p>
        </div>
      )}
    </div>

  </div>
);
}

export default DashboardPage
