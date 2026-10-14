import React from "react";
import { Link } from "react-router-dom";

function AsStudentOrAsCrPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-indigo-100 flex items-center justify-center px-6">

      <div className="max-w-5xl w-full">

        {/* Header */}

        <div className="text-center mb-14">

          <h1 className="text-6xl font-black text-slate-800">
            Welcome to CRHub
          </h1>

          <p className="text-slate-500 text-xl mt-4">
            Select how you'd like to continue.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 gap-10">

          {/* CR */}

          <Link
            to="/CRdashboard"
            className="
              bg-white
              rounded-[35px]
              p-12
              shadow-xl
              border
              border-slate-200
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              group
            "
          >

            <div className="w-24 h-24 rounded-full bg-violet-100 flex items-center justify-center text-5xl mb-8">
              👨‍💼
            </div>

            <h2 className="text-4xl font-black text-slate-800">
              Login as CR
            </h2>

            <p className="text-slate-500 mt-5 leading-8 text-lg">
              Manage subjects, upload PDFs, create tasks,
              publish notices and organize your class.
            </p>

            <button
              className="
                mt-10
                w-full
                bg-gradient-to-r
                from-violet-600
                to-indigo-600
                text-white
                py-4
                rounded-2xl
                font-bold
                text-lg
                shadow-lg
                group-hover:scale-105
                transition
              "
            >
              Continue as CR →
            </button>

          </Link>

          {/* Student */}

          <Link
            to="/dashboard"
            className="
              bg-white
              rounded-[35px]
              p-12
              shadow-xl
              border
              border-slate-200
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              group
            "
          >

            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-5xl mb-8">
              🎓
            </div>

            <h2 className="text-4xl font-black text-slate-800">
              Login as Student
            </h2>

            <p className="text-slate-500 mt-5 leading-8 text-lg">
              Access subjects, study materials,
              assignments and important notices.
            </p>

            <button
              className="
                mt-10
                w-full
                bg-gradient-to-r
                from-indigo-600
                to-violet-600
                text-white
                py-4
                rounded-2xl
                font-bold
                text-lg
                shadow-lg
                group-hover:scale-105
                transition
              "
            >
              Continue as Student →
            </button>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default AsStudentOrAsCrPage;