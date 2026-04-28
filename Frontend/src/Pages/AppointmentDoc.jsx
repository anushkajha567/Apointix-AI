import React, { useEffect, useState } from 'react';
import { FaCalendarCheck, FaCheck, FaTimes, FaUser, FaClock, FaPhone, FaEnvelope, FaNotesMedical, FaStethoscope, FaInfoCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentDoc = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                toast.error("User not authenticated");
                setLoading(false);
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor-appointments?userId=${userId}`);
            const data = await response.json();

            if (data.success) {
                setAppointments(data.data);
            } else {
                toast.error(data.message || "Failed to fetch appointments");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };



    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED': return 'bg-green-100 text-green-700 border-green-200';
            case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
            case 'PENDING':
            case 'BOOKED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'COMPLETED': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    // Filter to show only PENDING or BOOKED appointments
    const filteredAppointments = appointments.filter(app => app.status === 'PENDING' || app.status === 'BOOKED');

    const PatientDetailsModal = ({ patient, onClose }) => {
        if (!patient) return null;
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
                    <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <FaUser /> Patient Details
                        </h3>
                        <button onClick={onClose} className="hover:bg-blue-700 p-2 rounded-full transition-colors">
                            <FaTimes />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-2xl font-bold">
                                {patient.full_name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-800">{patient.full_name}</h4>
                                <p className="text-gray-500">{patient.age} years • {patient.gender}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
                                <div className="flex items-center gap-2 mt-1 text-gray-700">
                                    <FaPhone className="text-blue-500 text-sm" /> {patient.phone}
                                </div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                                <div className="flex items-center gap-2 mt-1 text-gray-700 break-all">
                                    <FaEnvelope className="text-blue-500 text-sm" /> {patient.patient_email}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-xs text-blue-400 uppercase tracking-wide font-semibold mb-2">Medical Notes / Issue</p>
                            <p className="text-gray-700 italic">"{patient.issue || patient.medical_notes || "No notes provided"}"</p>
                        </div>

                        {patient.address && (
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold">Address:</span> {patient.address}
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-50 p-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-8 pb-12 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
                            <FaStethoscope className="text-blue-600" /> Appointment Requests
                        </h1>
                        <p className="text-gray-500 mt-2">Manage your incoming appointment requests.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-500">Loading appointments...</p>
                    </div>
                ) : filteredAppointments.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <FaCalendarCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Pending Requests</h3>
                        <p className="text-gray-500">You don't have any pending appointment requests.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredAppointments.map((app) => (
                            <div
                                key={app.appointment_id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-center md:items-start"
                            >
                                {/* Date & Time Box */}
                                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-blue-50 w-full md:w-32 py-4 rounded-xl border border-blue-100 text-blue-800">
                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Date</span>
                                    <div className="text-xl font-bold">{new Date(app.appointment_date).toLocaleDateString()}</div>
                                    <div className="flex items-center gap-1 text-sm mt-2 font-medium">
                                        <FaClock className="text-blue-500" /> {app.time_slot || "09:00 AM"}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow w-full">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                                {app.full_name}
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(app.status)} uppercase tracking-wider`}>
                                                    {app.status}
                                                </span>
                                            </h3>
                                            <p className="text-gray-500 text-sm flex items-center gap-4 mt-1">
                                                <span>{app.age} Yrs • {app.gender}</span>
                                                <span className="flex items-center gap-1"><FaPhone size={10} /> {app.phone}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-400 mb-4">
                                        <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Issue:</span> {app.issue}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap items-center gap-3">
                                        <button
                                            onClick={() => setSelectedPatient(app)}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
                                        >
                                            <FaInfoCircle /> Details
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Patient Details Modal */}
            {selectedPatient && (
                <PatientDetailsModal
                    patient={selectedPatient}
                    onClose={() => setSelectedPatient(null)}
                />
            )}

            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default AppointmentDoc;