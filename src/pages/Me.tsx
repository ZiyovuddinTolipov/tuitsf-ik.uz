

import { Routes, Route, Link } from "react-router-dom"
import { FaRegNewspaper ,FaTable  ,FaArrowLeft  } from "react-icons/fa";
import Navbar from "../components/Navbar";
import AllDocs from "../components/AllDocs";
import UserVoteLists from "../components/UserVoteLists";
import UserVote from "../components/UserVote";

// import {useNavigation} from "react-router-dom"

const Dashboard = () => {
    // const navigate = useNavigation();

    // localStorage.getItem("role")=="Admin" ? navigate(''):navigate('/')
    const sty = {
        listElement: "flex items-center  gap-2 px-3 py-2 bg-primary-50 hover:bg-primary-400 transition rounded-md text-primary-200"
    }
    return (
        <main className="w-[100%] min-h-[100vh] bg-primary-400">
            <Navbar />
            <section className="flex">
                <div className="custom-scrollbar sticky inset-x-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-6 pt-32  lg:w-[300px] bg-primary-200">
                    <ul className="flex  flex-col gap-2 text-white font-semibold w-[200px]">
                        <Link to='' className={sty.listElement} ><FaTable />Barcha hujjatlar</Link>
                        <Link to='elections' className={sty.listElement} ><FaRegNewspaper /><span>So'rovnomalar</span></Link>
                    </ul>
                    <ul className="flex  flex-col gap-2 text-white font-semibold">
                        <Link to="/" className='px-3 py-2 bg-red-500 hover:bg-red-600 transition rounded-md w-[200px] flex justify-between items-center' ><span>Chiqish</span> <FaArrowLeft size={23}/></Link>
                    </ul>
                </div>
                <div className="flex min-h-screen flex-1 flex-col px-4 pb-6 pt-20 md:pt-32  max-md:pb-14 sm:px-14">
                    <Routes >
                        <Route path="/" element={<AllDocs />} />
                        <Route path="/elections" element={<UserVoteLists />} />
                        <Route path="/elections/results" element={<UserVote />} />
                    </Routes>

                </div>
            </section>
        </main>
    );
};

export default Dashboard;