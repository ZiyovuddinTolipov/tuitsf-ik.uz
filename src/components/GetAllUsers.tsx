import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../api/ApiService";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-hot-toast";

interface UserData {
    id: number;
    username: string;
    firstname: string;
}

const Results: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await ApiService.GetAllUsers();
                console.log(res);
                setUserData(res.data.filter((user: { id: number; }) => user.id !== 1));
            } catch (error) {
                setError("Malumotlarni yuklab bo'lmadi!");
            }
        };

        fetchUserData();
    }, [searchParams]);

    const deleteUser = async (id: number) => {
        const confirmDelete = window.confirm("O'chirishni tasdiqlash!");
        console.log(confirmDelete,id);
        console.log(typeof id);
        if (confirmDelete) {
            try {
                const response= await ApiService.DeleteUser(id);
                console.log(response);
                // If deletion is successful, update the user data
                // setUserData(userData.filter(user => user.id !== id));
                toast.success("Foydalanuvchi muvaffaqiyatli o'chirildi!");
                // window.location.reload();
            } catch (error) {
                toast.error("Malumot o'chirilmadi!");
            }
        }
    };

    return (
        <div className="text-primary-200 results">
            <h2 className="text-3xl font-semibold text-primary-200 text-center">Foydalanuvchilar</h2>
            { error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="table mt-3 text-xl font-medium">
                    <thead>
                        <tr className="text-primary-300 text-xl">
                            <th>ID</th>
                            <th>Foydalanuvchi</th>
                            <th>FISH</th>
                            <th className="w-[100px]">O'chirish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user,index) => (
                            <tr key={user.id}>
                                <td>{index+1}</td>
                                <td>@{user.username}</td>
                                <td>{user.firstname}</td>
                                <td>
                                    <button className="btn btn-error" onClick={() => deleteUser(user.id)}>
                                        <MdDeleteOutline size={26} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Results;
