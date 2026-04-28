import React, { useEffect, useState } from 'react';
import { FaUserMd, FaCalendarCheck, FaClock, FaClipboardList, FaStethoscope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const DoctorDashboard = () => {
    const [stats, setStats] = useState({
        scannedPatients: 0,
        appointmentsToday: 0,
        pendingReports: 0
    });
    const [doctorName, setDoctorName] = useState("Doctor");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) return;

                // Fetch Profile
                const profileRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/userProfile?userId=${userId}`);
                const profileData = await profileRes.json();
                if (profileData.success && profileData.data) {
                    setDoctorName(profileData.data.name); // Note: userProfile returns { user: [...] } or { data: ... }? 
                    // Checking db.js: returns { user: users } which is an array
                    // Wait, let's double check userProfile response structure in db.js
                    // It returns { success: true, user: users } where users is an array.
                    if (profileData.user && profileData.user.length > 0) {
                        setDoctorName(profileData.user[0].name);
                    }
                }

                // Fetch Stats
                const statsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor-stats?userId=${userId}`);
                const statsData = await statsRes.json();
                if (statsData.success) {
                    setStats(statsData.data);
                }

            } catch (e) {
                console.error("Failed to fetch dashboard data", e);
            }
        }

        fetchDashboardData();
    }, []);

    const StatCard = ({ title, value, icon, color, subtext }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} text-white text-xl`}>
                    {icon}
                </div>
                <div className="text-3xl font-bold text-gray-800">{value}</div>
            </div>
            <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wide">{title}</h3>
            {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-8 pb-8 pt-24 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
                        <FaStethoscope className="text-blue-600" /> Doctor Dashboard
                    </h1>
                    <p className="text-gray-500 mt-2">Welcome back, Dr. {doctorName}. Have a great day at work.</p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        title="Today's Appointments"
                        value={stats.appointmentsToday}
                        icon={<FaCalendarCheck />}
                        color="bg-blue-500"
                        subtext="Scheduled for today"
                    />
                    <StatCard
                        title="Pending Reports"
                        value={stats.pendingReports}
                        icon={<FaClipboardList />}
                        color="bg-rose-500"
                        subtext="Requires review"
                    />
                    <StatCard
                        title="Availability"
                        value="9:00 AM" // Placeholder
                        icon={<FaClock />}
                        color="bg-emerald-500"
                        subtext="Next Available Slot"
                    />
                </div>

                {/* Quick Actions */}
                <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/doc-profile" className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 group-hover:border-blue-200 group-hover:shadow-xl transition-all duration-300 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Manage Profile</h3>
                                <p className="text-gray-500 mt-2 text-sm">Update your bio, specialty, and clinic details.</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <FaUserMd size={20} />
                            </div>
                        </div>
                    </Link>


                    <Link to="/doctor-appointments" className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 group-hover:border-blue-200 group-hover:shadow-xl transition-all duration-300 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">My Schedule</h3>
                                <p className="text-gray-500 mt-2 text-sm">View and manage upcoming appointments.</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <FaCalendarCheck size={20} />
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default DoctorDashboard;
