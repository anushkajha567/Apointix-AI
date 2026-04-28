import { useEffect, useState } from 'react';
import { FaUserInjured, FaTrash, FaPhone, FaMapMarkerAlt, FaFileMedical } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const PatientData = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPatients = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/getAllPatients`);
            const res = await response.json();
            if (res.success) {
                setPatients(res.data);
            } else {
                toast.error("Failed to fetch patients");
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
            toast.error("Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const deletePatient = async (id) => {
        if (!window.confirm("Are you sure you want to remove this patient record?")) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/deletePatient`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            const res = await response.json();
            if (res.success) {
                toast.success(res.message);
                fetchPatients(); // Refresh list
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error("Error deleting patient:", error);
            toast.error("Failed to delete patient");
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 px-4 sm:px-8 pb-8 pt-24 font-sans'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3'>
                        <FaUserInjured className="text-blue-600" /> Patient Records
                    </h1>
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1.5 rounded-full">
                        Total Patients: {patients.length}
                    </span>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : patients.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <FaUserInjured className="mx-auto text-6xl text-gray-200 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400">No Patient Records Found</h3>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {patients.map((patient) => (
                            <div key={patient.id} className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col'>

                                <div className="flex justify-between items-start mb-4">
                                    <div className='w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-2xl text-blue-500 font-bold'>
                                        {patient.full_name?.charAt(0)}
                                    </div>
                                    <button
                                        onClick={() => deletePatient(patient.id)}
                                        className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                                        title="Remove Patient"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>

                                <h3 className='text-lg font-bold text-gray-800 mb-1'>{patient.full_name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-semibold">{patient.gender}</span>
                                    <span>• {patient.age} Years</span>
                                </div>

                                <div className="space-y-3 flex-1">
                                    <div className="flex items-start gap-3 text-sm text-gray-600">
                                        <FaPhone className="mt-1 text-gray-400 shrink-0" />
                                        <span>{patient.phone}</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-sm text-gray-600">
                                        <FaMapMarkerAlt className="mt-1 text-gray-400 shrink-0" />
                                        <span className="line-clamp-2">{patient.address}</span>
                                    </div>
                                    {patient.medical_notes && (
                                        <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-100">
                                            <div className="flex items-center gap-2 text-xs font-bold text-red-800 mb-1">
                                                <FaFileMedical /> Medical Notes
                                            </div>
                                            <p className="text-xs text-red-700 line-clamp-3">{patient.medical_notes}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                                    <span>Registered: {new Date(patient.created_at).toLocaleDateString()}</span>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default PatientData;