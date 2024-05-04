import React, { useEffect, useState } from 'react';
import { FaUserCheck, FaUserClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment, { Moment } from 'moment'; // moment.js kutubxonasi
import ApiService from '../api/ApiService';
import toast from 'react-hot-toast';

interface Poll {
    id: number;
    poll_que: string;
    que1: string | null;
    que2: string | null;
    que3: string | null;
    que4: string | null;
    que5: string | null;
    que6: string | null;
    que7: string | null;
    time: number;
    created_at: string;
}

const Results: React.FC = () => {
    const [pollData, setPollData] = useState<Poll[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: pollData } = await ApiService.GetAllPollUser();
                setPollData(pollData);
                console.log("data", pollData);
            } catch (error) {
                // Handle errors
                toast.error('Ma\'lumotlarni olishda xatolik yuz berdi.');
            }
        };

        fetchData();

        // Avtomatik ravishda ma'lumotlarni yangilash
        const intervalId = setInterval(() => {
            fetchData();
        }, 60000); // 1 daqiya (60 * 1000 millisekund)

        // Komponent chiqishida intervalni to'xtatish
        return () => clearInterval(intervalId);
    }, []);


    // Function to check if poll has ended
    const isPollEnded = (poll: Poll): boolean => {
        const endDateTime: Moment = moment(poll.created_at).add(poll.time, 'hours');
        return moment().isAfter(endDateTime);
    };

    return (
        <div className="text-primary-200 results">
            <h2 className="text-3xl font-semibold text-primary-200 text-center">Lavozimlarga tayinlov.</h2>
            <ul className="results_list w-[100%]">
                {pollData.map((poll: Poll) => (
                    <Link key={poll.id} to={`results?id=${poll.id}`} data-aos="flip-down">
                        {isPollEnded(poll) ? <FaUserCheck size={35} /> : <FaUserClock size={35} />}
                        <div className='w-full flex justify-between items-center'>
                            <p className=''>
                                Lavozim: {poll.poll_que}
                            </p>
                                <button className='btn btn-primary text-white'>Ishtirok etish</button>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Results;
