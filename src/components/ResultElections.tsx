import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../api/ApiService"; // Assuming ApiService returns PollData type
import LoadingPage from "./LoadingPage";

// Define a type or interface for PollData
interface PollData {
  poll: {
    id: number;
    poll_que: string;
    [key: string]: string | number | null; // Allow other keys with string, number, or null values
  };
  all_users: number;
  voted_users: number;
  num: number;
  yes1: number;
  yes2: number;
  neutral: number;
}

const Results: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [pollData, setPollData] = useState<PollData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPollData = async () => {
            try {
                const id = searchParams.get('id');
                if (!id) {
                    throw new Error("ID parameter is missing.");
                }
                const res = await ApiService.GetElectionResults(id);
                setPollData(res.data);
                setLoading(false);
                console.log(res);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        fetchPollData();
    }, [searchParams]);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className="text-primary-200 results">
            {error ? (
                <p className="text-red-500">Malumotlarni yuklab bo'lmadi!</p>
            ) : (
                <>
                    <h2 className="text-3xl font-semibold text-primary-200 text-center">{pollData && pollData.poll.poll_que}</h2>
                    <ul className="results_list">
                        {Object.keys(pollData?.poll ?? {}).map((key) => {
                            if (key.startsWith("que") && pollData.poll[key]) {
                                const queNumber = key.replace("que", "");
                                const votes = pollData[`yes${queNumber}`];
                                return (
                                    <li key={key} data-aos="flip-down" className="flex justify-between">
                                        <span>{pollData.poll[key]}</span>
                                        <span>Votes: {votes}</span>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Results;
