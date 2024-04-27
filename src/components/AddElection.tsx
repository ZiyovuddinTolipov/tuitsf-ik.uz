import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegNewspaper, FaTable } from "react-icons/fa";

const NewElections: React.FC = () => {
    const navigate = useNavigate();
    const [jobPosition, setJobPosition] = useState("");
    const [jobDeadline, setJobDeadline] = useState("");
    const [candidates, setCandidates] = useState<{ [key: string]: string }[]>([{ name: "" }, { name: "" }]);
    const [formModified, setFormModified] = useState(false);

    const addCandidateInput = () => {
        const lastCandidate = candidates[candidates.length - 1];
        if (lastCandidate.name !== "" && candidates.length < 7) {
            setCandidates([...candidates, { name: "" }]);
        } else if (candidates.length === 7) {
            alert("Siz yana 7 ta saylanuvchi qo'shishingiz mumkin emas!");
        } else {
            alert("Barcha maydonlarni to'ldiring!");
        }
    };

    const handleCandidateChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newCandidates = [...candidates];
        newCandidates[index] = { ...newCandidates[index], name: event.target.value };
        setCandidates(newCandidates);
        setFormModified(true);
    };

    const handleJobDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d+$/.test(value)) {
            const parsedValue = parseInt(value);
            if (parsedValue > 0 && parsedValue <= 100) {
                setJobDeadline(value);
            } else if (value === "") {
                setJobDeadline("");
            }
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const obj = {
            lavozim: jobPosition,
            jobDeadline: jobDeadline,
            ...candidates.reduce((acc, candidate, index) => {
                acc[`saylanuvchi${index + 1}`] = candidate.name;
                return acc;
            }, {} as { [key: string]: string })
        };

        console.log(obj);
        setFormModified(false);
    };

    const handleLink = (url: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        const confirmMessage = window.confirm("Formaga kiritilgan barcha ma'lumot o'chib ketadi. Rozimisiz?");
        if (confirmMessage) {
            setJobPosition("");
            setJobDeadline("");
            setCandidates([{ name: "" }, { name: "" }]);
            setFormModified(false);
            navigate(url);
        } else {
            event.preventDefault();
        }
        return confirmMessage;
    };

    const areAllCandidatesEntered = candidates.every(candidate => candidate.name.trim() !== "");

    const listElementClass = "flex items-center gap-2 px-3 py-2 bg-primary-300 hover:bg-primary-200 transition rounded-md text-primary-50";

    return (
        <div>
            <header className='mb-4'>
                <ul className="flex gap-2 text-white font-semibold w-[400px]">
                    <Link to='/dashboard/' onClick={(event) => handleLink('/dashboard/', event)} className={`${listElementClass} ${formModified ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={formModified}><FaTable /> <span>Natijalar</span></Link>
                    <Link to='/dashboard/add-new-election' onClick={(event) => handleLink('/dashboard/add-new-election', event)} className={`${listElementClass} ${formModified ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={formModified}><FaRegNewspaper /><span>So'rovnoma yaratish</span></Link>
                </ul>
            </header>
            <form onSubmit={handleSubmit} className="flex flex-col items-start justify-start text-left w-full gap-3">
                <label className="form-control w-full max-w-xs">
                    <span className="label-text text-primary-300 my-2">Lavozimni kiriting </span>
                    <input
                        type="text"
                        placeholder="Lavozimni kiriting"
                        className="input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300"
                        value={jobPosition}
                        onChange={(e) => setJobPosition(e.target.value)}
                    />
                </label>
                <label className="form-control w-full max-w-xs">
                    <span className="label-text text-primary-300 my-2">Ovoz berish vaqti </span>
                    <input
                        type="text"
                        placeholder="soatda kiriting"
                        className="input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300"
                        value={jobDeadline}
                        onChange={handleJobDeadlineChange}
                    />
                </label>
                {candidates.map((candidate, index) => (
                    <label key={index} className="form-control w-full max-w-xs">
                        <span className="label-text my-2 text-primary-300">{index + 1}-saylanuvchi </span>
                        <input
                            type="text"
                            placeholder="To'liq ism familiya"
                            value={candidate.name}
                            onChange={(e) => handleCandidateChange(index, e)}
                            className="input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300"
                        />
                    </label>
                ))}
                {candidates.length < 7 && (
                    <button className="btn btn-primary max-w-xs w-full" type="button" onClick={addCandidateInput} disabled={!areAllCandidatesEntered}>Yangi saylanuvchini qo'shish</button>
                )}
                <button className="btn btn-primary block max-w-xs w-full my-3" type="submit" disabled={!areAllCandidatesEntered }>Saqlash</button>
            </form>
        </div>
    );
};

export default NewElections;
