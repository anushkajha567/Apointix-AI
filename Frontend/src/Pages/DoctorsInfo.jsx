import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaMapMarkerAlt, FaClinicMedical, FaStar, FaBriefcaseMedical, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const DoctorsInfo = () => {
    const [doctors, setDoctors] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctors-panel-info`);
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                const data = await response.json();
                const docs = data.data;
                if (Array.isArray(docs)) {
                    setDoctors(docs);
                }
                setLoading(false);
            }
            catch (error) {
                console.error("Error fetching doctors:", error);
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const handleNext = () => {
        if (doctors.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % doctors.length);
        }
    };

    const handlePrev = () => {
        if (doctors.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + doctors.length) % doctors.length);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    if (doctors.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center text-gray-600 font-sans">
                <FaUserMd className="text-6xl text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold">No Doctors Available</h2>
                <p>Check back later for updates.</p>
            </div>
        );
    }

    const currentDoctor = doctors[currentIndex];
    const docName = currentDoctor.name || "Doctor Name";
    const docSpecialty = currentDoctor.specialization || "Specialist";
    const docExp = currentDoctor.experience;
    const docLocation = currentDoctor.city ? `${currentDoctor.city}, ${currentDoctor.state || ''}` : "Location not available";
    const docClinic = currentDoctor.clinic_name || "Clinic Info";
    const docImage = currentDoctor.profile_image || "https://avatar.iran.liara.run/public/job/doctor/male";

    return (
        <div className="min-h-screen bg-slate-50 font-sans pt-10">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-16 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Our Specialists</h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Meet our team of experienced medical professionals dedicated to your well-being.
                    </p>
                </div>
            </div>

            {/* Carousel Section */}
            <div className="relative w-full max-w-6xl mx-auto px-4 py-16 flex items-center justify-center">

                {/* Navigation Buttons (Desktop) */}
                <button
                    onClick={handlePrev}
                    className="hidden md:flex absolute left-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-blue-600 hover:bg-blue-50 transition-all hover:scale-110 active:scale-95 border border-gray-100"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={handleNext}
                    className="hidden md:flex absolute right-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-blue-600 hover:bg-blue-50 transition-all hover:scale-110 active:scale-95 border border-gray-100"
                >
                    <FaChevronRight />
                </button>


                {/* Main Card */}
                <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row transform transition-all duration-500">

                    {/* Image Section */}
                    <div className="md:w-2/5 bg-gray-100 relative group overflow-hidden">
                        <img
                            src={docImage}
                            alt={docName}
                            className="w-full h-full object-cover object-center min-h-[300px] transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* Details Section */}
                    <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wide mb-3">
                                {docSpecialty}
                            </span>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">{docName}</h2>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1"><FaBriefcaseMedical className="text-blue-400" /> {docExp} Years Exp.</span>
                                <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-blue-400" /> {docLocation}</span>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Dedicated to providing top-quality healthcare at <span className='font-semibold'>{docClinic}</span>.
                            Book an appointment today for a consultation.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate('/appointment', { state: { doctor: currentDoctor } })}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all"
                            >
                                Book Appointment
                            </button>
                            <button
                                onClick={() => setShowProfile(true)}
                                className="px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-center gap-6 pb-12">
                <button onClick={handlePrev} className="p-4 rounded-full bg-white shadow-md text-blue-600 border border-gray-100 active:scale-95"><FaChevronLeft /></button>
                <span className="py-4 font-mono text-gray-400 text-sm">{currentIndex + 1} / {doctors.length}</span>
                <button onClick={handleNext} className="p-4 rounded-full bg-white shadow-md text-blue-600 border border-gray-100 active:scale-95"><FaChevronRight /></button>
            </div>


            {/* Profile Modal */}
            {showProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowProfile(false)}></div>

                    <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-In">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex justify-between items-start">
                            <div className="flex gap-4 items-center">
                                <img src={docImage} alt={docName} className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover bg-white" />
                                <div>
                                    <h3 className="text-xl font-bold">{docName}</h3>
                                    <p className="text-blue-100 text-sm">{docSpecialty}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowProfile(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Professional Info</h4>
                                <div className="space-y-3 text-sm">
                                    <p className="text-gray-500"><strong className="text-gray-700">Qualification:</strong> {currentDoctor.qualification || "N/A"}</p>
                                    <p className="text-gray-500"><strong className="text-gray-700">Registration:</strong> {currentDoctor.reg_number || "N/A"}</p>
                                    <p className="text-gray-500"><strong className="text-gray-700">Clinic:</strong> {docClinic}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Consultation</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Consultation Fee</span>
                                        <span className="font-bold text-green-600">₹{currentDoctor.consultation_fee || "0"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Slot Duration</span>
                                        <span className="font-bold text-gray-700">{currentDoctor.slot_duration || "15"} mins</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 mb-1">Available Days</span>
                                        <div className="flex flex-wrap gap-1">
                                            {(() => {
                                                let days = [];
                                                const val = currentDoctor.available_days;
                                                // Robust parsing (same as before)
                                                if (Array.isArray(val)) days = val;
                                                else if (typeof val === 'string') {
                                                    try { days = JSON.parse(val); if (!Array.isArray(days)) throw new Error() }
                                                    catch (e) { days = val.includes(',') ? val.split(',').map(d => d.trim()) : [val]; }
                                                }
                                                return days.slice(0, 5).map((day, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded font-medium">{day}</span>
                                                ));
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button onClick={() => setShowProfile(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">Close</button>
                            <button
                                onClick={() => navigate('/appointment', { state: { doctor: currentDoctor } })}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                @keyframes In { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .animate-In { animation: In 0.2s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default DoctorsInfo;