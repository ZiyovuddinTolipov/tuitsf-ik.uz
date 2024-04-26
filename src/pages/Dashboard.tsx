

import { Routes, Route } from "react-router-dom"

import Navbar from "../components/Navbar";
import AddNewUser from "../components/AddNewUser";
// import {useNavigation} from "react-router-dom"

const Dashboard = () => {
    // const navigate = useNavigation();

    // localStorage.getItem("role")=="Admin" ? navigate(''):navigate('/')
    const sty = {
        listElement: "flex items-center justify-between px-3 py-2 bg-slate-700 hover:bg-slate-800 transition rounded-md"
    }
    return (
        <main className="w-[100%] min-h-[100vh] bg-slate-950">
            <Navbar />
            <section className="flex">
                <div className="custom-scrollbar sticky inset-x-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-6 pt-32  lg:w-[300px] bg-gray-900">
                    {/* <Routes >
                        <Route path="/dashboard/" element={<AdminMenu />} />
                        <Route path="/course" element={<CourseList />} />
                    </Routes> */}
                    {/* <CourseList /> */}
                    {/* <AdminMenu /> */}

                    <ul className="flex  flex-col gap-2 text-white font-semibold w-[200px]">

                        <li className={sty.listElement} >Fayl qo'shish</li>
                        <li className={sty.listElement} >So'rovnoma yaratish</li>
                        <li className={sty.listElement} >Natijalar</li>

                    </ul>

                    <ul className="flex  flex-col gap-2 text-white font-semibold">
                        <li className='px-3 py-2 bg-blue-500 rounded-md w-[200px]' >Yangi foydalanuvchi</li>
                        <li className='px-3 py-2 bg-red-500 rounded-md w-[200px]' >Chiqish</li>
                    </ul>
                </div>
                <div className="flex min-h-screen flex-1 flex-col px-4 pb-6 pt-20 md:pt-32  max-md:pb-14 sm:px-14">
                    <Routes >
                        <Route path="/add-new-user" element={<AddNewUser />} />
                    </Routes>

                    {/* <AddCourse /> */}
                    {/* <Course /> */}
                </div>
            </section>
        </main>
    );
};

export default Dashboard;