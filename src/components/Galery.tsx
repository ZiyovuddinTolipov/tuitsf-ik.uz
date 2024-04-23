import React, { useState, useEffect } from 'react'
import ApiService from '../api/ApiService';

interface Photos {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string
}

const MyComponent: React.FC = () => {
    const [posts, setPosts] = useState<Photos[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.getPhotos();
                if ('data' in response && Array.isArray(response.data)) {
                    // Assuming response.data is an array of photo objects
                    setPosts(response.data);
                } else {
                    // Handle the case when response.data is not as expected
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

    if (loading) return <div>Yuklanmoqda...</div>;
    if (!posts || posts.length === 0) return <div>Xatolik yuz berdi</div>;

    return (
        <div>
            <h1>Postlar</h1>
            {posts.map((post: Photos, index: number) => (
                <div key={index}>
                    <h2>{post.title}</h2>
                    <p>{post.url}</p>
                </div>
            ))}
        </div>
    );
};

export default MyComponent;