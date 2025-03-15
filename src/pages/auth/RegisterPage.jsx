import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

let VITE_API_URL = import.meta.env.VITE_API_URL;

export default function RegisterPage() {
    const navigate = useNavigate();
    const { setToken, fetchUser } = useContext(AppContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(VITE_API_URL + '/auth/register', 
                formData, {
                withCredentials: true,
                secure: true
            });

            if (response.status === 200) {
                const data = response.data.data;
                localStorage.setItem('token', data.token);
                setToken(data.token);

                // wait for user data to be fetched
                await fetchUser(data.token);
                navigate('/');

                toast.success("Account created successfully!");
            }
        } catch (error) {
            if (error.response.data.errors) {
                const errors = error.response.data.errors;
                setErrors(errors);
                console.log('Error Data:', errors);
            } else if (error.response) { 
                const error = error.response.data;
                console.log('Error Response:', error);
                toast.error("An error occurred while creating the account.");
            } else {
                console.log('Error:', error.message);
                toast.error("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }      
    }

    return (
        <div className="container mx-auto flex items-center justify-center h-screen">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleRegister}>
                    <h5 className="text-xl font-medium text-gray-900">Create an account</h5>
                    
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                        <input type="text" name="name" id="name" placeholder="John Doe" required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="email" name="email" id="email" placeholder="name@company.com" required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                        <input type="password" name="password_confirmation" id="password_confirmation" placeholder="••••••••" required
                            value={formData.password_confirmation}
                            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>

                    <button 
                        type="submit" 
                        className={`w-full mt-6 font-medium rounded-full text-sm px-5 py-2.5 text-center 
                                    flex justify-center items-center transition text-white bg-gradient-to-r from-blue-500 to-blue-700
                                    ${loading ? "cursor-not-allowed" : "hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300"}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            "Create account"
                        )}
                    </button>

                    <div className="text-sm font-medium text-gray-500">
                        Already have an account? <Link to="/login" className="text-blue-700 hover:underline">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
