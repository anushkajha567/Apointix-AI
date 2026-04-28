import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeartbeat, FaNotesMedical, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Patient = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        user_id: "",
        full_name: "",
        age: "",
        gender: "MALE",
        phone: "",
        email: "",
        address: "",
        emergency_contact: "",
        medical_notes: "",
        first_visit: true
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setFormData(prev => ({ ...prev, user_id: userId }));
        } else {
            toast.warn("Please log in to register.");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/registerPatient`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                setTimeout(() => navigate('/profile'), 2000); // Redirect to profile after success
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pt-15 pb-10">

            {/* Hero Header */}
            <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-12 px-4 text-center mb-10 relative overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Patient Registration</h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Complete your profile to manage appointments and medical history efficiently.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                    <div className="p-8 md:p-12 space-y-8">

                        {/* Section 1: Personal Info */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2 mb-6 flex items-center gap-2">
                                <FaUser className="text-blue-500" /> Personal Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} required placeholder="John Doe" />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputGroup label="Age" type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="25" />
                                    <div className="relative group">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-gray-700 appearance-none"
                                        >
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <InputGroup label="Phone Number" type="tel" icon={<FaPhone />} name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 234 567 890" />
                                <InputGroup label="Email Address" type="email" icon={<FaEnvelope />} name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                            </div>
                        </div>

                        {/* Section 2: Contact Info */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2 mb-6 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-500" /> Contact & Address
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <InputGroup label="Address" name="address" value={formData.address} onChange={handleChange} required placeholder="123 Street Name, City" />
                                </div>
                                <InputGroup label="Emergency Contact (Phone)" icon={<FaPhone />} name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} required placeholder="Family Member Number" />
                            </div>
                        </div>

                        {/* Section 3: Medical Info */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2 mb-6 flex items-center gap-2">
                                <FaHeartbeat className="text-pink-500" /> Medical Information
                            </h3>
                            <div className="space-y-6">
                                <div className="relative group">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Medical Notes / Allergies</label>
                                    <div className="absolute top-9 left-4 text-gray-400 z-10"><FaNotesMedical /></div>
                                    <textarea
                                        name="medical_notes"
                                        rows="3"
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none font-medium text-gray-700"
                                        placeholder="Any existing conditions, allergies, or notes..."
                                        value={formData.medical_notes}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <input
                                        type="checkbox"
                                        name="first_visit"
                                        checked={formData.first_visit}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                        id="firstVisit"
                                    />
                                    <label htmlFor="firstVisit" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">
                                        Is this your first visit to our clinic?
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all"
                        >
                            {loading ? 'Processing...' : <>Submit Registration <FaPaperPlane /></>}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

const InputGroup = ({ label, icon, ...props }) => (
    <div className="relative group w-full">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
        {icon && <div className="absolute top-9 left-4 text-gray-400 z-10 group-focus-within:text-blue-500 transition-colors">{icon}</div>}
        <input
            className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-gray-700`}
            {...props}
        />
    </div>
);

export default Patient;
