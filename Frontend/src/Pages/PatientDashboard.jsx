import React, { useEffect, useState } from 'react';
import { FaUser, FaCalendarAlt, FaFileMedical, FaSearch, FaNotesMedical } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Chatbot from '../Component/Chatbot';

const PatientDashboard = () => {
    const [patientName, setPatientName] = useState("Patient");
    const [stats, setStats] = useState({
        upcomingAppointments: 0,
        medicalRecords: 0
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/userProfile?userId=${userId}`);
                    const data = await response.json();
                    if (data.success && data.data) {
                        setPatientName(data.data.name);
                    }
                }
            } catch (e) {
                console.error("Failed to fetch profile", e);
            }
        }

        fetchProfile();
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
                        <FaUser className="text-blue-600" /> Patient Dashboard
                    </h1>
                    <p className="text-gray-500 mt-2">Hello, {patientName}. Manage your health journey here.</p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        title="Upcoming Appointments"
                        value={stats.upcomingAppointments}
                        icon={<FaCalendarAlt />}
                        color="bg-blue-500"
                        subtext="Scheduled visits"
                    />
                    <StatCard
                        title="Medical Records"
                        value={stats.medicalRecords}
                        icon={<FaFileMedical />}
                        color="bg-emerald-500"
                        subtext="Available reports"
                    />
                    <Link to="/patient-registration">
                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-pointer h-full flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-indigo-500 text-white rounded-lg"><FaNotesMedical /></div>
                                <h3 className="font-bold text-indigo-900">Update Medical Profile</h3>
                            </div>
                            <p className="text-sm text-indigo-700">Ensure your health details are up to date.</p>
                        </div>
                    </Link>
                </div>

                {/* Quick Actions */}
                <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/doctors-info" className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 group-hover:border-blue-200 group-hover:shadow-xl transition-all duration-300 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Find a Specialist</h3>
                                <p className="text-gray-500 mt-2 text-sm">Browse our list of verified doctors and book an appointment.</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <FaSearch size={20} />
                            </div>
                        </div>
                    </Link>

                    <Link to="/profile" className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 group-hover:border-emerald-200 group-hover:shadow-xl transition-all duration-300 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">My Profile</h3>
                                <p className="text-gray-500 mt-2 text-sm">View and edit your personal information.</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <FaUser size={20} />
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
            <Chatbot />
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default PatientDashboard;
