import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import ApiService from '../api/ApiService';


const NewElections: React.FC = () => {
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [candidate1, setCandidate1] = useState('');
    const [candidate2, setCandidate2] = useState('');
    const [votingDuration, setVotingDuration] = useState('');
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const obj = {
            poll_que: position,
            que3: department,
            que1: candidate1,
            que2: candidate2,
            time: votingDuration,
        }
        const response = await ApiService.CreateNewPoll(obj);
        response.data.status  ==201 ? () => {

            toast.success("So'rovnoma yaratildi!");
            setPosition("");
            setDepartment("");
            setCandidate1("");
            setCandidate2("");
            setVotingDuration("");
        }: toast.error("So'rovnoma yaratilmadi!") ;
        
        console.log(response);
        console.log(obj);
        // window.confirm("Natijalar sahifasida ko'rishingiz mumkun yaratilgan so'rovnomani.Natijalar sahifasiga o'tamizmi ?")?navigate("/dashboard"):'';
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col items-start justify-start text-left w-full gap-3">
                <label className="form-control w-full max-w-xs">
                    <span className="label-text text-primary-300 my-2">Lavozim</span>
                    <input
                        type="text"
                        placeholder="Lavozimni kiriting"
                        className="input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300"
                        required
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </label>
                <label className="form-control w-full max-w-xs">
                    <span className="label-text text-primary-300 my-2">Kafedra</span>
                    <input
                        type="text"
                        placeholder="Kafedra nomini kiriting"
                        className="input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300"
                        required
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                </label>
                <label className="form-control w-full max-w-xs">
                    <span className="label-text text-primary-300 my-2">1-saylanuvchi</span>
                    <input
                        type="text"
                        placeholder="FISH"
                        className="input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300"
                        required
                        value={candidate1}
                        onChange={(e) => setCandidate1(e.target.value)}
                    />
                </label>
                <label className="form-control w-full max-w-xs">
                    <span className="label-text text-primary-300 my-2">2-saylanuvchi</span>
                    <input
                        type="text"
                        placeholder="FISH"
                        className="input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300"
                        required
                        value={candidate2}
                        onChange={(e) => setCandidate2(e.target.value)}
                    />
                </label>
                <label className="form-control w-full max-w-xs">
                    <span className="label-text text-primary-300 my-2">Davomiyligi (daq)</span>
                    <input
                        type="text"
                        placeholder="123"
                        className="input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300"
                        required
                        value={votingDuration}
                        onChange={(e) => setVotingDuration(e.target.value)}
                    />
                </label>
                <button className="btn btn-primary block max-w-xs w-full my-3" type="submit">Save</button>
            </form>
        </div>
    );
};

export default NewElections;
