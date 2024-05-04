import { useSearchParams } from "react-router-dom";
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

    useEffect(() => {
        const fetchPollData = async () => {
            try {
                const id = searchParams.get('id');
                if (!id) {
                    toast.error("Mavjud bo'lmagan havola!");
                    throw new Error("ID parameter is missing.");
                }
                const res = await ApiService.GetElectionResults(id);
                setPollData(res.data);
                console.log(res);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchPollData();
    }, [searchParams]);

    return (
        <div className="text-primary-200 results">
            {error ? (
                <p className="text-red-500">Malumotlarni yuklab bo'lmadi!</p>
            ) : (
                pollData && (
                    <>
                        <h2 className="text-3xl font-semibold text-primary-200 text-center">{pollData.poll.poll_que}</h2>
                        <ul className="results_list">
                            {Object.entries(pollData.poll).slice(2, -3).map(([key, value]) => (
                                value && (
                                    <li key={key} data-aos="flip-down" className="flex justify-between">
                                        <span>{value}</span>
                                        <span>Jami: {pollData.all_users} | qatnashganlar: {pollData.voted_users} | Rozilar: {pollData.yes} | Qarshilar: {pollData.no} |  Betaraf: {pollData.neutral}</span>
                                    </li>
                                )
                            ))}
                        </ul>
                    </>
                )
            )}
        </div>
    );
};

export default Results;
