

import { Routes, Route, Link } from "react-router-dom"
import { FaAddressBook,FaFile ,FaRegNewspaper ,FaTable  ,FaArrowLeft, FaUser, FaFileArchive  } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Results from "../components/Results";
import AddNewUser from "../components/AddNewUser";
import AddNewDoc from '../components/AddNewDoc'
import AddElection from "../components/AddElection";
import ResultElection from "../components/ResultElections";
import GetAllUsers from "../components/GetAllUsers";
import AllDocs from "../components/AllDocs";

// import {useNavigation} from "react-router-dom"

const Dashboard = () => {
    // const navigate = useNavigation();
    
    // localStorage.getItem("role")=="Admin" ? navigate(''):navigate('/')
    const sty = {
        listElement: "flex items-center  gap-2 px-3 py-2 bg-primary-50 hover:bg-hover-400 transition rounded-md text-primary-200"
    }
    return (
        <main className="w-[100%] min-h-[100vh] bg-primary-400">
            <Navbar />
            <section className="flex">
                <div className="custom-scrollbar sticky inset-x-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-6 pt-32  lg:w-[300px] bg-primary-200">
                    {/* <Routes >
                        <Route path="/dashboard/" element={<AdminMenu />} />
                        <Route path="/course" element={<CourseList />} />
                    </Routes> */}
                    {/* <CourseList /> */}
                    {/* <AdminMenu /> */}

                    <ul className="flex  flex-col gap-2 text-white font-semibold w-[200px]">

                        <Link to='' className={sty.listElement} ><FaTable /> <span>Natijalar</span></Link>
                        <Link to='add-new-file' className={sty.listElement} ><FaFile /> <span>Fayl qo'shish</span></Link>
                        <Link to='all-files' className={sty.listElement} ><FaFileArchive /><span>Hujjatlar</span></Link>
                        <Link to='add-new-election' className={sty.listElement} ><FaRegNewspaper /><span>Tanlov yaratish</span></Link>
                        <Link to='all-users' className={sty.listElement} ><FaUser /><span>Kengash a'zolari</span></Link>
                    </ul>

                    <ul className="flex  flex-col gap-2 text-white font-semibold">
                        <Link to='add-new-user' className='px-3 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-md w-[200px] flex justify-between items-center' ><span>A'zo qo'shish</span> <FaAddressBook /></Link>
                        <Link to="/" className='px-3 py-2 bg-red-500 hover:bg-red-600 transition rounded-md w-[200px] flex justify-between items-center' ><span>Chiqish</span> <FaArrowLeft size={23}/></Link>
                    </ul>
                </div>
                <div className="flex min-h-screen flex-1 flex-col px-4 pb-6 pt-20 md:pt-32  max-md:pb-14 sm:px-14">
                    <Routes >
                        <Route path="/add-new-user" element={<AddNewUser />} />
                        <Route path="/add-new-file" element={<AddNewDoc />} />
                        <Route path="/add-new-election" element={<AddElection />} />
                        <Route path="/results" element={<ResultElection />} />
                        <Route path="/all-files" element={<AllDocs />} />
                        <Route path="/all-users" element={<GetAllUsers />} />
                        <Route path="/" element={<Results />} />
                    </Routes>

                    {/* <AddCourse /> */}
                    {/* <Course /> */}
                </div>
            </section>
        </main>
    );
};

export default Dashboard;