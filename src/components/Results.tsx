import React, { useEffect, useState } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment'; // moment.js kutubxonasi
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
                const { data: pollData } = await ApiService.GetAllPollAdmin();
                setPollData(pollData);
                console.log(pollData);
            } catch (error) {
                // Handle errors
                toast.error('Ma\'lumotlarni olishda xatolik yuz berdi.');
            }
        };

        fetchData();
    }, []);

    // Function to calculate the remaining time until the end of the poll in days:hours:minutes:seconds format



    // Function to format date using moment.js
    const formatDate = (dateString: string): string => {
        return moment(dateString).format('D MMMM YYYY, h:mm:ss a');
    };

    // Function to check if poll has ended


    return (
        <div className="text-primary-200 results">
            <h2 className="text-3xl font-semibold text-primary-200 text-center">Lavozimlarga tanlov.</h2>
            <ul className="results_list w-[100%]">
                {pollData.map((poll: Poll) => (
                    <Link key={poll.id} to={`results?id=${poll.id}`}>
                        <FaUserCheck size={35} />
                        <div className='w-full'>
                            <p className='flex w-full justify-between'>
                                <span>Lavozim nomi: <span className='text-primary-400'>{poll.poll_que}</span></span>
                                {/* <span> <span className='bg-red-500 p-1 text-primary-50 rounded-md'>Tugagan</span></span> */}
                            </p>
                            {`Boshlangan vaqt: ${formatDate(poll.created_at)}`}
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Results;
