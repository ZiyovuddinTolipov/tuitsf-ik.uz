import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-hot-toast'
import ApiService from '../api/ApiService';

interface UserData {
    username: string;
    password: string;
    full_name: string;
}

const AddNewUser: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        username: '',
        password: '',
        full_name: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit =async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await ApiService.CreateNewUser(userData.username, userData.password,userData.full_name);
        console.log('User data:', response);
        toast.success('Yangi foydalanuvchi qo\'shildi!');
        setUserData({
            username: '',
            password: '',
            full_name: ''
        });
    };

    const style = {
        input: "input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300"
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="form-control w-full max-w-xs">
                <span className="label-text my-1">FISH</span>
                <input
                    type="text"
                    name="full_name"
                    placeholder="Nazokat Abdullaeva"
                    className={style.input}
                    value={userData.full_name}
                    onChange={handleChange}
                    required
                />
            </label>
            <label className="form-control w-full max-w-xs">
                <span className="label-text my-1">Foydalanuvchi nomi</span>
                <input
                    type="text"
                    name="username"
                    placeholder="@foydalanuvchi"
                    className={style.input}
                    value={userData.username}
                    onChange={handleChange}
                    required
                />
            </label>
            <label className="form-control w-full max-w-xs">
                <span className="label-text my-1">Foydalanuvchi paroli</span>
                <input
                    type="text"
                    name="password"
                    placeholder="parol"
                    className={style.input}
                    value={userData.password}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit" className="btn btn-primary max-w-xs w-full my-3">Saqlash</button>
        </form>
    );
};

export default AddNewUser;
