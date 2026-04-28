import { useState, useEffect } from 'react';
import {
    FaUserMd, FaStethoscope, FaBriefcaseMedical, FaCheckCircle,
    FaClinicMedical, FaCalendarAlt, FaRupeeSign, FaArrowRight, FaArrowLeft
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputField = ({ label, type = "text", ...props }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1.5 ml-1">{label}</label>
        <input
            type={type}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-700 font-medium"
            {...props}
        />
    </div>
);

const DocProfile = () => {
    // eslint-disable-next-line no-unused-vars
    const [isRegistered, setIsRegistered] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const checkRegistration = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    // Check if doctor profile exists
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor-appointments?userId=${userId}`);
                    if (response.ok) {
                        setIsRegistered(true);
                    }
                }
            } catch (error) {
                console.error("Error checking registration:", error);
            } finally {
                setPageLoading(false);
            }
        };
        checkRegistration();
    }, []);

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        // 1. Personal
        user_id: '', name: '', email: '', phone: '', gender: 'Male', dob: '',
        // 2. Professional
        specialization: '', qualification: '', experience: '', reg_number: '', reg_council: '',
        // 3. Clinic
        clinic_name: '', address: '', city: '', state: '', pincode: '', consultation_type: 'In-person',
        // 4. Availability
        available_days: [], time_slots: '', slot_duration: '15', max_patients: '',
        // 5. Fees
        consultation_fee: '', follow_up_fee: '', online_fee: ''
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setFormData(prev => ({ ...prev, user_id: userId }));
        } else {
            // Optional: Redirect to login or show warning if not logged in
            toast.warn("Please log in to register as a doctor.");
        }
    }, []);

    const steps = [
        { id: 1, title: "Personal", icon: <FaUserMd /> },
        { id: 2, title: "Professional", icon: <FaStethoscope /> },
        { id: 3, title: "Clinic", icon: <FaClinicMedical /> },
        { id: 4, title: "Availability", icon: <FaCalendarAlt /> },
        { id: 5, title: "Fees", icon: <FaRupeeSign /> }
    ];

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && name === 'available_days') {
            const day = value;
            setFormData(prev => ({
                ...prev,
                available_days: prev.available_days.includes(day)
                    ? prev.available_days.filter(d => d !== day)
                    : [...prev.available_days, day]
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/registerDoc`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                // Reset or redirect
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Registration failed. Please check your connection.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Render Steps
    const renderStep = () => {
        switch (step) {
            case 1: // Personal
                return (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Dr. John Doe" required />
                            <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                            <InputField label="Mobile Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                );
            case 2: // Professional
                return (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g. Cardiologist" required />
                            <InputField label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="MBBS, MD" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Experience (Years)" name="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="5" required />
                            <InputField label="Registration Number" name="reg_number" value={formData.reg_number} onChange={handleChange} placeholder="MCI-12345" required />
                        </div>
                        <InputField label="Registration Council" name="reg_council" value={formData.reg_council} onChange={handleChange} placeholder="Medical Council of India" required />
                    </div>
                );
            case 3: // Clinic
                return (
                    <div className="space-y-4 animate-fadeIn">
                        <InputField label="Clinic / Hospital Name" name="clinic_name" value={formData.clinic_name} onChange={handleChange} placeholder="City Care Clinic" required />
                        <InputField label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Health St" required />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="City" name="city" value={formData.city} onChange={handleChange} placeholder="Mumbai" required />
                            <InputField label="State" name="state" value={formData.state} onChange={handleChange} placeholder="Maharashtra" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="400001" required />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
                                <select name="consultation_type" value={formData.consultation_type} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option>In-person</option>
                                    <option>Online</option>
                                    <option>Both</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 4: // Availability
                return (
                    <div className="space-y-4 animate-fadeIn">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
                            <div className="flex flex-wrap gap-2">
                                {daysOfWeek.map(day => (
                                    <label key={day} className={`cursor-pointer px-4 py-2 rounded-full border transition-all ${formData.available_days.includes(day) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}>
                                        <input type="checkbox" name="available_days" value={day} checked={formData.available_days.includes(day)} onChange={handleChange} className="hidden" />
                                        {day}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <InputField label="Time Slots (e.g. 10:00-13:00, 17:00-20:00)" name="time_slots" value={formData.time_slots} onChange={handleChange} placeholder="10:00-14:00" />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slot Duration</label>
                                <select name="slot_duration" value={formData.slot_duration} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option value="10">10 mins</option>
                                    <option value="15">15 mins</option>
                                    <option value="30">30 mins</option>
                                    <option value="60">60 mins</option>
                                </select>
                            </div>
                            <InputField label="Max Patients / Day" name="max_patients" type="number" value={formData.max_patients} onChange={handleChange} placeholder="20" />
                        </div>
                    </div>
                );
            case 5: // Fees
                return (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Consultation Fee (₹)" name="consultation_fee" type="number" value={formData.consultation_fee} onChange={handleChange} placeholder="500" required />
                            <InputField label="Follow-up Fee (₹)" name="follow_up_fee" type="number" value={formData.follow_up_fee} onChange={handleChange} placeholder="300" />
                        </div>
                        <InputField label="Online Fee (₹) [If applicable]" name="online_fee" type="number" value={formData.online_fee} onChange={handleChange} placeholder="400" />
                    </div>
                );
            default: return null;
        }
    };



    if (pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isRegistered) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-gray-50 flex items-center justify-center px-4 font-sans">
                <div className="bg-white max-w-lg w-full p-8 rounded-3xl shadow-xl text-center border border-gray-100 animate-fadeIn">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-sm">
                        <FaCheckCircle className="text-5xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Already Registered</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        You have already completed your doctor registration. Access your dashboard to manage appointments and update your profile.
                    </p>
                    <div className="flex flex-col gap-3">
                        <a
                            href="/doctor"
                            className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                        >
                            Go to Dashboard <FaArrowRight />
                        </a>
                        <a
                            href="/profile"
                            className="w-full py-3.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                        >
                            View Profile
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-20 font-sans'>
            <div className='w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row h-[500px]'>

                {/* Sidebar / Progress */}
                <div className="bg-gradient-to-b from-blue-600 to-indigo-700 p-8 md:w-1/3 text-white flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-8">Register</h2>
                        <div className="space-y-6">
                            {steps.map((s, idx) => (
                                <div key={s.id} className={`flex items-center gap-4 ${step === s.id ? 'opacity-100 scale-105' : 'opacity-60'} transition-all duration-300`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= s.id ? 'bg-white text-blue-600 border-white' : 'border-white/50'}`}>
                                        {step > s.id ? <FaCheckCircle /> : s.icon}
                                    </div>
                                    <span className="font-medium tracking-wide">{s.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-blue-200 text-sm mt-8">
                        Step {step} of 5
                    </div>
                </div>

                {/* Form Area */}
                <div className="p-8 md:w-2/3 flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">{steps[step - 1].title} Details</h3>

                    <form onSubmit={step === 5 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="flex-1 flex flex-col justify-between">
                        <div>{renderStep()}</div>

                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                            {step > 1 ? (
                                <button type="button" onClick={prevStep} className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-semibold transition-colors">
                                    <FaArrowLeft /> Back
                                </button>
                            ) : <div></div>}

                            {step < 5 ? (
                                <button type="button" onClick={nextStep} className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all">
                                    Next <FaArrowRight />
                                </button>
                            ) : (
                                <button type="submit" disabled={loading} className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg shadow-green-200 transition-all">
                                    {loading ? 'Submitting...' : 'Complete Registration'} <FaCheckCircle />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
            `}</style>
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default DocProfile;
