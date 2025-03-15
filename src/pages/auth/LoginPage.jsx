import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

export default function LoginPage() {

    const { setToken, fetchUser } = useContext(AppContext);
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
    
        try {
            const response = await axios.post('/api/auth/login', loginData, {
                withCredentials: true
                
            });
    
            if (response.status === 200) {
                const data = response.data.data;
                localStorage.setItem('token', data.token);
                setToken(data.token);
                await fetchUser(data.token);
                navigate('/');

                toast.success("Login successful!");
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                
                if (status === 401) {
                    setErrors({ password: data.error });
                } else if (status === 500) {
                    toast.error(data.message);
                } else {
                    setErrors(data.errors || "Unknown error occurred.");
                }
    
                console.log('Error Response:', error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container mx-auto flex items-center justify-center h-screen">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <h5 className="text-xl font-medium text-gray-900">Sign in to our platform</h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="name@company.com" 
                            required
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="••••••••" 
                            required
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                    <div className="text-sm font-medium text-gray-500">
                        Not registered? <Link to="/register" className="text-blue-700 hover:underline">Create account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}