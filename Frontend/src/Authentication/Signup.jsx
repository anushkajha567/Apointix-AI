import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaUserMd, FaUser, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';

const Signup = () => {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(null); // 'PATIENT' or 'DOCTOR'
    const [step, setStep] = useState(1); // 1: Role Selection, 2: Form
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, mail, password, role })
            });

            const res = await response.json();
            if (res.success) {
                toast.success(res.message);
                setTimeout(() => navigate('/login'), 1500);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Registration failed. Server error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50 font-sans">
            {/* Left Side - Visuals */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600 overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-10"></div>

                <div className="relative z-10 text-white px-12 text-center">
                    <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Join Apointix</h1>
                    <p className="text-xl text-blue-100 max-w-lg mx-auto leading-relaxed">
                        Whether you're a doctor looking to expand your reach or a patient seeking the best care, we've got you covered.
                    </p>
                </div>

                {/* Decorative Circles */}
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute top-24 right-24 w-32 h-32 bg-blue-400 opacity-20 rounded-full blur-2xl"></div>
            </div>

            {/* Right Side - Functional */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="w-full max-w-md">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="text-gray-500 mt-2">
                            {step === 1 ? "Choose your account type" : "Fill in your details"}
                        </p>
                    </div>

                    {/* Step 1: Role Selection */}
                    {step === 1 && (
                        <div className="grid grid-cols-2 gap-6 animate-fadeIn">
                            <button
                                onClick={() => { setRole('PATIENT'); setStep(2); }}
                                className="group relative p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center gap-4"
                            >
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl text-blue-600 group-hover:scale-110 transition-transform">
                                    <FaUser />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">Patient</h3>
                                    <p className="text-xs text-gray-500 mt-1">Looking for care</p>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                                    <FaCheckCircle />
                                </div>
                            </button>

                            <button
                                onClick={() => { setRole('DOCTOR'); setStep(2); }}
                                className="group relative p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-indigo-500 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center gap-4"
                            >
                                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-3xl text-indigo-600 group-hover:scale-110 transition-transform">
                                    <FaUserMd />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">Doctor</h3>
                                    <p className="text-xs text-gray-500 mt-1">Providing care</p>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500">
                                    <FaCheckCircle />
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Step 2: Form */}
                    {step === 2 && (
                        <form onSubmit={submitHandler} className="space-y-6 animate-slideIn">
                            <div className="bg-blue-50 p-4 rounded-xl flex items-center justify-between mb-6">
                                <span className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                                    Signing up as: <span className="uppercase">{role}</span>
                                </span>
                                <button type="button" onClick={() => setStep(1)} className="text-xs text-blue-600 hover:underline">Change</button>
                            </div>

                            <div className="relative group">
                                <FaUser className="absolute top-3.5 left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div className="relative group">
                                <FaEnvelope className="absolute top-3.5 left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={mail}
                                    onChange={(e) => setMail(e.target.value)}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div className="relative group">
                                <FaLock className="absolute top-3.5 left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="password"
                                    placeholder="Password (min. 8 chars)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating Account..." : "Sign Up"}
                            </button>
                        </form>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-blue-600 hover:underline">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
                
                @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
                .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
            `}</style>
            <ToastContainer position="top-right" theme="colored" />
        </div>
    );
};

export default Signup;