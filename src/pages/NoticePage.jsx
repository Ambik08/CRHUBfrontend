import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bell, Calendar } from "lucide-react";

function NoticePage() {
  const [resData, setResData] = useState({
    subject: "",
    message: "",
    issuedDate: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNoticeById = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/notice/${id}`,
          {
            method: "GET",
             headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setResData(data);
        } else {
          const text = await response.text();
          toast.error(text);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load notice");
      }
    };

    fetchNoticeById();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-red-500 px-8 py-6">
          <div className="flex items-center gap-3">
            <Bell className="text-white" size={28} />
            <h1 className="text-2xl font-bold text-white">
              Notice Details
            </h1>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              {resData.subject}
            </h2>

            <div className="flex items-center gap-2 text-slate-500">
              <Calendar size={18} />
              <span>{resData.issuedDate}</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
              {resData.message}
            </p>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={() =>
                  navigate(`/dashboard`)
              }
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-medium transition-all"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticePage;