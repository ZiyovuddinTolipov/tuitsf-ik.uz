import React, { useState } from 'react';
import ApiService from '../api/ApiService'; // Replace with your actual API service
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingPage from '../components/LoadingPage';

// interface LoginResponse {
//     status: boolean;
//     staff: string; // User type (e.g., 'admin', 'user')
//     token: string;
// }

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true); // Show loading indicator

        try {
            const response = await ApiService.Login(username, password);

            if (response.staff) { // Assuming successful login has status true
                toast.success('Login successful!');
                localStorage.setItem('token', response.token);

                if (response.staff == 'admin') {
                    navigate('/dashboard');
                } else if (response.staff == 'user') {
                    navigate('/me');
                } else {
                    // Handle unexpected user type or invalid response (security measure)
                    console.error('Unexpected user type in response:', response.staff);
                    setError('Login failed. Please contact support.');
                    localStorage.removeItem('token'); // Remove potentially invalid token
                }
            } else {
                toast.error(`Login error: ${response.status || 'Unknown error'}`); // Provide default message or use API error message if available
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            // Handle login errors gracefully
            console.error('Login error:', error);
            toast.error('Login failed. Please try again later.');
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };
    if (loading) return <LoadingPage />;
    return (
        <section className="bg-primary-300">
            <div className="flex h-screen flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-primary-400 backdrop-blur-md border-gray-700" data-aos="flip-up">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Link to="/" className="flex items-center justify-center mb-6 text-2xl font-semibold w-[100%]">
                            <h3 className='text-2xl font-semibold text-primary-500 uppercase' >tuitsf-ik.uz</h3>
                        </Link>
                        <form className="space-y-4 md:space-y-6 font-Poppins text-black" onSubmit={handleSubmit} >
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <label className="input bg-white flex items-center gap-2  input-primary  w-full ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4  text-primary-200"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <input type="text" className="grow bg-transparent" placeholder="@username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </label>
                            <label className="input bg-white flex items-center gap-2  input-primary  w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-primary-200"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" className="bg-transparent" minLength={1} placeholder="parol" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </label>
                            <div className="flex items-center justify-between">
                                {/* <Link to="/register" className="text-sm font-medium text-primary-600 hover:underline ">Hisob yaratish?</Link> */}
                            </div>
                            <button type="submit" className="btn btn-info bg-primary-500 hover:bg-primary-200 w-full text-white">Yuborish</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;