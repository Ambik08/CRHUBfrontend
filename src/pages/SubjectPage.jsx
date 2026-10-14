import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"
import { useParams } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";

function SubjectPage() {
    const [formData,setFormData] = useState({subjectName:"",facultyName:"",cabinNumber:"",mobileNumber:"",email:"",tasks:[],pdf:[]})
    const {subjectName}=useParams();
    const token = localStorage.getItem("token");
    useEffect(()=>{
        const fetchSubject = async ()=>{
            try {
                
            const response = await fetch(`http://localhost:8080/subject/${subjectName}`,
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
                setFormData(data);
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
    fetchSubject()
    },[])

//   return (
//     <div>
//         <h1>{formData.subjectName}</h1>
//         <img src={formData.facultyImageURL} alt={formData.facultyName} width="150"/>
//         <h4>{formData.facultyName}</h4>
//         <h4>{formData.cabinNumber}</h4>
//         <h4>{formData.mobileNumber}</h4>
//         <h4>{formData.email}</h4>
//         <h1>TASKS</h1>
//         {formData.tasks.length!==0 ?(
//             <div>
//                 {formData.tasks.map(task=>(
//                     <div key={task.id} >
//                         <h3>{task.message}</h3>
//                         <h3>{task.issuedDate}</h3>
//                         <h3>{task.endDate}</h3>
//                     </div>
//                 ))}
//             </div>
//         ):(
//             <h3>No tasks as of now</h3>
//         )}
//         <h1>PDFS</h1>
//         {formData.pdf.length!==0 ?(
//             <div>
//                 {formData.pdf.map(p=>(
//                     <div key={p.id} >
//                         <h3>{p.unit}</h3>
//                         <a href={p.unitUrl} target="_blank" rel="noopener noreferrer"><FaFilePdf size={30}/></a>
//                     </div>
//                 ))}
//             </div>
//         ):(
//             <h3>No pdfs as of now</h3>
//         )}
        

//     </div>
//   )

return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">

<div className="max-w-7xl mx-auto px-8 py-10">

{/* Back */}

<div className="flex items-center justify-between mb-8">

<Link
to="/dashboard"
className="text-violet-600 font-semibold hover:text-violet-700 transition"
>
← Dashboard
</Link>

<div className="flex gap-4">

<Link
to={`/task/add/${formData.subjectName}`}
className="
px-6
py-3
rounded-xl
bg-violet-600
text-white
font-semibold
hover:bg-violet-700
transition
shadow-md
"
>
+ Add Task
</Link>

<Link
to={`/pdf/add/${formData.subjectName}`}
className="
px-6
py-3
rounded-xl
border
border-violet-600
text-violet-600
font-semibold
hover:bg-violet-50
transition
"
>
+ Upload PDF
</Link>

</div>

</div>

{/* Subject Card */}

<div
className="
bg-white
rounded-[32px]
shadow-lg
border
border-slate-200
p-10
"
>

<div className="flex justify-between items-start">

<div className="flex gap-8">

<img
src={
formData.facultyImageURL
? formData.facultyImageURL
: "https://via.placeholder.com/200"
}
alt={formData.facultyName}
className="
w-36
h-36
rounded-full
object-cover
border-4
border-violet-100
"
/>

<div>

<p className="uppercase tracking-[0.35em] text-violet-600 text-sm font-semibold">
Course
</p>

<h1 className="text-5xl font-black text-slate-800 mt-2">
{formData.subjectName}
</h1>

<p className="text-2xl text-slate-500 mt-2">
{formData.facultyName}
</p>

<div className="flex gap-8 mt-8">

<div>

<p className="text-xs uppercase text-slate-400">
Cabin
</p>

<p className="font-semibold mt-2">
{formData.cabinNumber}
</p>

</div>

<div>

<p className="text-xs uppercase text-slate-400">
Phone
</p>

<p className="font-semibold mt-2">
{formData.mobileNumber}
</p>

</div>

<div>

<p className="text-xs uppercase text-slate-400">
Email
</p>

<p className="font-semibold mt-2 break-all">
{formData.email}
</p>

</div>

</div>

</div>

</div>

<div className="grid grid-cols-2 gap-5">

<div className="bg-violet-50 rounded-2xl p-6 text-center">

<p className="text-sm text-slate-500">
Assignments
</p>

<h1 className="text-5xl font-black text-violet-600 mt-2">
{formData.tasks.length}
</h1>

</div>

<div className="bg-violet-50 rounded-2xl p-6 text-center">

<p className="text-sm text-slate-500">
Study Material
</p>

<h1 className="text-5xl font-black text-violet-600 mt-2">
{formData.pdf.length}
</h1>

</div>

</div>

</div>

</div>

{/* Main Content */}

<div className="grid lg:grid-cols-2 gap-8 mt-12">

{/* LEFT PANEL */}

<div>

<div className="flex justify-between items-center mb-6">

<h2 className="text-3xl font-bold text-slate-800">
Assignments
</h2>

<span className="text-violet-600 font-semibold">
{formData.tasks.length} Items
</span>

</div>
{formData.tasks.length !== 0 ? (

<div className="space-y-5">

{formData.tasks.map(task => (

<div
key={task.id}
className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
p-6
"
>

<div className="flex justify-between items-start">

<div>

<h3 className="text-xl font-bold text-slate-800">
{task.message}
</h3>

<p className="text-slate-400 mt-2">
Assignment
</p>

</div>

<div className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
Due
</div>

</div>

<div className="flex justify-between mt-8">

<div>

<p className="text-xs uppercase text-slate-400">
Issued
</p>

<p className="font-semibold mt-1">
{task.issuedDate}
</p>

</div>

<div>

<p className="text-xs uppercase text-slate-400">
Deadline
</p>

<p className="font-semibold text-red-500 mt-1">
{task.endDate}
</p>

</div>

</div>

</div>

))}

</div>

) : (

<div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">

<h2 className="text-2xl font-bold text-slate-700">
No Assignments
</h2>

<p className="text-slate-400 mt-2">
Nothing has been assigned yet.
</p>

</div>

)}

</div>

{/* RIGHT PANEL */}

<div>

<div className="flex justify-between items-center mb-6">

<h2 className="text-3xl font-bold text-slate-800">
Study Material
</h2>

<span className="text-violet-600 font-semibold">
{formData.pdf.length} PDFs
</span>

</div>

{formData.pdf.length !== 0 ? (

<div className="grid gap-5">

{formData.pdf.map(p => (

<div
key={p.id}
className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
p-6
"
>

<div className="flex justify-between items-center">

<div>

<p className="text-sm uppercase text-violet-600 font-semibold">
Unit
</p>

<h2 className="text-3xl font-black text-slate-800 mt-1">
{p.unit}
</h2>

<p className="text-slate-400 mt-2">
Course Material
</p>

</div>

<a
href={p.unitUrl}
target="_blank"
rel="noopener noreferrer"
className="
h-16
w-16
rounded-2xl
bg-red-100
text-red-600
flex
items-center
justify-center
hover:bg-red-600
hover:text-white
transition
"
>

<FaFilePdf size={34} />

</a>

</div>

</div>

))}

</div>

) : (

<div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">

<h2 className="text-2xl font-bold text-slate-700">
No Study Material
</h2>

<p className="text-slate-400 mt-2">
Faculty hasn't uploaded any PDFs yet.
</p>

</div>

)}

</div>

</div>

</div>

</div>

);



}

export default SubjectPage







