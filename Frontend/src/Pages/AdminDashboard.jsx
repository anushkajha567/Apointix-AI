import React, { useEffect, useState } from 'react';
import { FaUserMd, FaUserInjured, FaUsers, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalDoctors: 0,
        pendingDoctors: 0,
        approvedDoctors: 0,
        totalPatients: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Doctors Data
                const docRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/DoctorsData`);
                const docData = await docRes.json();

                // Fetch Patients Data
                const patientRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/getAllPatients`);
                const patientData = await patientRes.json();

                if (docData.success && patientData.success) {
                    const doctors = docData.data;
                    const patients = patientData.data;

                    setStats({
                        totalDoctors: doctors.length,
                        pendingDoctors: doctors.filter(d => d.status === 'PENDING').length,
                        approvedDoctors: doctors.filter(d => d.status === 'APPROVED').length,
                        totalPatients: patients.length
                    });
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
                toast.error("Failed to load dashboard statistics");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const StatCard = ({ title, value, icon, color, subtext }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} text-white text-xl`}>
                    {icon}
                </div>
                <div className="text-3xl font-bold text-gray-800">{loading ? "..." : value}</div>
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
                        <FaChartLine className="text-blue-600" /> Dashboard Overview
                    </h1>
                    <p className="text-gray-500 mt-2">Welcome back, Admin. Here's what's happening today.</p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        title="Total Doctors"
                        value={stats.totalDoctors}
                        icon={<FaUserMd />}
                        color="bg-blue-500"
                        subtext={`${stats.pendingDoctors} pending approval`}
                    />
                    <StatCard
                        title="Total Patients"
                        value={stats.totalPatients}
                        icon={<FaUserInjured />}
                        color="bg-emerald-500"
                        subtext="Registered patients"
                    />
                    <StatCard
                        title="Active Doctors"
                        value={stats.approvedDoctors}
                        icon={<FaUsers />}
                        color="bg-indigo-500"
                        subtext="Approved & Verified"
                    />
                    <StatCard
                        title="Pending Requests"
                        value={stats.pendingDoctors}
                        icon={<FaChartLine />}
                        color="bg-amber-500"
                        subtext="Requires attention"
                    />
                </div>

                {/* Quick Actions */}
                <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/admin/doctors" className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 group-hover:border-blue-200 group-hover:shadow-xl transition-all duration-300 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Manage Doctors</h3>
                                <p className="text-gray-500 mt-2 text-sm">View, Approve, or Reject doctor applications.</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <FaUserMd size={20} />
                            </div>
                        </div>
                    </Link>

                    <Link to="/PatientData" className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 group-hover:border-emerald-200 group-hover:shadow-xl transition-all duration-300 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">Manage Patients</h3>
                                <p className="text-gray-500 mt-2 text-sm">View patient records and history.</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <FaUserInjured size={20} />
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default AdminDashboard;
