import { useSearchParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../api/ApiService"; // Assuming ApiService returns PollData type
import { toast } from "react-hot-toast";

// Define a type or interface for PollData
interface PollData {
    poll: {
        id: number;
        poll_que: string;
        created_at: string;
        que1: string | null;
        que2: string | null;
        que3: string | null;
        que4: string | null;
        que5: string | null;
        que6: string | null;
        que7: string | null;
        time: number;
    };
    all_users: number;
    voted_users: number;
    num: number;
    yes1: number;
    yes2: number;
    neutral: number;
    no?: number;
    yes?: number;
}

const Results: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [pollData, setPollData] = useState<PollData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPollData = async () => {
            try {
                const id = searchParams.get('id');
                if (!id) {
                    toast.error("Mavjud bo'lmagan havola!");
                    throw new Error("ID parameter is missing.");
                }
                const res = await ApiService.GetElectionuUser(parseInt(id));
                setPollData(res.data);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchPollData();
    }, [searchParams]);

    // Function to handle button click
    const handleButtonClick = async (option: string) => {
        const answer:string = option=='que1' ? 'a1': 'b1';

        if (window.confirm('Ovoz berishni tasdiqlang!')) {
            try {
                const id = searchParams.get('id');
                if (!id) {
                    toast.error("Mavjud bo'lmagan havola!");
                    throw new Error("ID parameter is missing.");
                }
                const res = await ApiService.VotePoll(parseInt(id),answer );
                console.log(res);
                res.status? ()=>{
                    toast.success("Ovoz berildi!");
                    navigate('/me/elections')
                }:''
            } catch (error) {
                setError((error as Error).message);
            }
        } else {
            toast.error("ovoz berish tasdiqlanmadi !");
        }
    };
    const handleNeutral = async (option: string) => {
        try {
            const id = searchParams.get('id');
            if (!id) {
                toast.error("Mavjud bo'lmagan havola!");
                throw new Error("ID parameter is missing.");
            }
            const res = await ApiService.VotePoll(parseInt(id), option);
            res.status==200? ()=>{
                toast.success("Ovoz berildi!");
                navigate('/me/elections')
            }:''
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div className="text-primary-200 results">
            {error ? (
                <p className="text-red-500">Malumotlarni yuklab bo'lmadi!</p>
            ) : (
                pollData && (
                    <>
                        <h2 className="text-3xl font-semibold text-primary-200 text-center">{pollData.poll.que3} kafedrasi {pollData.poll.poll_que} lavozimiga</h2>
                        <ul className="results_list">
                            {
                                pollData.num === 1 ? Object.entries(pollData.poll).slice(2, 3).map(([key, value]) => (
                                    value && (
                                        <li key={key} data-aos="flip-down" className="flex justify-between">
                                            <span>{value}</span>
                                            <button onClick={() => handleButtonClick(key)}>HA</button>
                                        </li>
                                    )
                                )) : Object.entries(pollData.poll).slice(2, 4).map(([key, value]) => (
                                    value && (
                                        <li key={key} data-aos="flip-down" className="flex justify-between">
                                            <span>{value}</span>
                                            <button onClick={() => handleButtonClick(key)}>HA</button>
                                        </li>
                                    )
                                ))
                            }
                        </ul>
                        <div className="flex justify-end items-end">
                            <button className="btn btn-info text-white" onClick={() => handleNeutral('0')}>Betaraf</button>
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default Results;
