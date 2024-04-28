/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import ApiService from '../api/ApiService';
import LoadingPage from './LoadingPage';

// import { Link } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}


const MyComponent: React.FC = () => {
    const [posts, setPosts] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.getUsers();
                if ('data' in response && Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Xato:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <LoadingPage />;
    if (!posts || posts.length === 0) return <div>Xatolik yuz berdi</div>;

    return (
        <div className='bg-black w-100 h-[100vh] text-white font-sans'>
            <h1 className='text-white text-4xl text-center p-3 font-semibold'>Foydalanuvchilar</h1>
            <table className='table'>
                <thead >
                    <tr className='text-red-500 text-lg capitalize'>
                        <th>ID</th>
                        <th>username</th>
                        <th>full name</th>
                        <th>email</th>
                        <th>street</th>
                        <th>phone</th>
                        <th>website</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post: User, index: number) => (
                        <tr key={index}>
                            <td>{post.id}</td>
                            <td>@{post.username}</td>
                            <td>{post.name}</td>
                            <td>{post.email}</td>
                            <td>{post.address.street}</td>
                            <td>{post.phone}</td>
                            <td className='text-blue-600'><a href={'https://'+post.website}>{post.website}</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyComponent;