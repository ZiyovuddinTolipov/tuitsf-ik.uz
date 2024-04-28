import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService, { PollData } from "../api/ApiService"; // Assuming ApiService returns PollData type
import LoadingPage from "./LoadingPage";
const Results: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [pollData, setPollData] = useState<PollData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPollData();
    }, [searchParams]);

    return (
        <div className="text-primary-200 results">
            <h2 className="text-3xl font-semibold text-primary-200 text-center">{pollData && pollData.poll.poll_que}</h2>
            {loading ? (
                <LoadingPage />
            ) : error ? (
                <p className="text-red-500">Malumotlarni yuklab bo'lmadi!</p>
            ) : (
                <ul className="results_list">
                    {Object.keys(pollData?.poll ?? {}).map((key) => (
                        key.startsWith("que") && pollData.poll[key as keyof typeof pollData.poll] && (
                            <li key={key} data-aos="flip-down" className="flex justify-between">
                                <span>{pollData.poll[key as keyof typeof pollData.poll]}</span>
                                <span>Votes: {pollData.poll_statistic[key as keyof typeof pollData.poll_statistic]}</span>
                            </li>
                        )
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Results;
