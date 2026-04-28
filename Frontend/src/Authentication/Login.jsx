import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEnvelope, FaLock, FaSignInAlt, FaArrowRight } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const generateToken = () => {
        return crypto.randomUUID();
    }

    const formData = {
        mail: mail,
        password: password
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const res = await response.json();

            if (res.success) {
                localStorage.setItem('token', generateToken());
                localStorage.setItem('userId', res.userId); // Store User ID
                localStorage.setItem('userRole', res.user.role || 'PATIENT'); // Store Role (default to PATIENT)
                toast.success(res.message);
                setTimeout(() => {
                    const role = res.user.role;
                    if (role === 'ADMIN') navigate('/admin');
                    else if (role === 'DOCTOR') navigate('/doctor');
                    else navigate('/patient'); // Default to Patient Dashboard
                }, 1000);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
            setMail("");
            setPassword("");
        }
    }

    return (
        <div className="min-h-screen flex bg-gray-50 font-sans">
            {/* Left Side - Visuals */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600 overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-indigo-800 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="relative z-10 text-white px-12 text-center">
                    <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Welcome Back</h1>
                    <p className="text-xl text-blue-100 max-w-lg mx-auto leading-relaxed">
                        Sign in to access your appointments, manage your profile, and connect with top healthcare professionals.
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="w-full max-w-md bg-white/50 backdrop-blur-sm lg:bg-transparent p-6 rounded-2xl lg:p-0">

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6 text-2xl shadow-sm">
                            <FaSignInAlt />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
                        <p className="text-gray-500 mt-2">Access your Apointix account</p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="relative group">
                            <FaEnvelope className="absolute top-3.5 left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                required
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>

                        <div className="relative group">
                            <FaLock className="absolute top-3.5 left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>

                        <div className="flex items-center justify-end">
                            <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? "Signing in..." : <>Login <FaArrowRight /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" theme="colored" />
        </div>
    )
}

export default Login;