import { useEffect, useState } from 'react';
import { FaUserMd, FaStar, FaEllipsisH } from 'react-icons/fa';

const AdminDash = () => {
    const [buttonEnabled, setButtonEnabled] = useState({});
    const [doctorData, setDoctorData] = useState([]);
    const [refresh, setRefresh] = useState({});
    const [updateBut, setUpdateButton] = useState({});

    const handleChange = (id, value, index) => {
        setDoctorData(prev => {
            const updatedDoctorsData = [...prev];
            updatedDoctorsData[index].status = value;
            return updatedDoctorsData;
        })
        setButtonEnabled(prev => ({
            ...prev,
            [id]: true
        }));
        if (value == "REJECTED") {
            setUpdateButton(prev => ({
                ...prev,
                [id]: true
            }));
        }
        else {
            setUpdateButton(prev => ({
                ...prev,
                [id]: false
            }));
        }
    }

    useEffect(() => {
        const fetchApi = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/DoctorsData`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const res = await response.json();
            setDoctorData(res.data);
        }
        fetchApi();
    }, [refresh])


    const updateStatus = (Docid, Docstatus) => {
        const DeleteApi = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/deleteDoc`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: Docid,
                })
            });
            setRefresh((prev) => ({
                ...prev,
                [Docid]: true
            }));
            const res = await response.json();
        }
        const updateApi = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/updateDoc`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: Docid,
                    status: Docstatus
                })
            });
            const res = await response.json();
        }
        if (Docstatus != "REJECTED") updateApi();
        else {
            DeleteApi();
        }
        setButtonEnabled(prev => ({
            ...prev,
            [Docid]: false
        }));
    }

    return (
        <div className='min-h-screen bg-gray-50 px-4 sm:px-8 pb-8 pt-32 font-sans'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 tracking-tight'>Doctor List</h1>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {doctorData.map((det, index) => (
                        <div key={det.id} className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center relative border border-gray-100'>
                            <button className='absolute top-4 right-4 text-gray-300 hover:text-gray-500 cursor-pointer'>
                                <FaEllipsisH />
                            </button>

                            <div className='w-24 h-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center text-4xl text-gray-400 overflow-hidden'>
                                <FaUserMd />
                            </div>

                            <h3 className='text-xl font-bold text-gray-900 mb-1 text-center'>{det.name}</h3>
                            <p className='text-gray-500 text-sm mb-2 text-center'>Specialist: {det.specialization}</p>

                            <div className='flex items-center gap-1 text-amber-400 text-sm mb-6'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>

                            <div className='w-full space-y-4 mb-6'>
                                <div className='flex justify-between items-center text-sm'>
                                    <span className='text-gray-400'>Experience</span>
                                    <span className='font-medium text-gray-700'>{det.experience} Years</span>
                                </div>
                                <div className='flex justify-between items-center text-sm'>
                                    <span className='text-gray-400'>Status</span>
                                    <div className='relative'>
                                        <select
                                            name="status"
                                            id="status"
                                            value={det.status}
                                            onChange={(e) => handleChange(det.id, e.target.value, index)}
                                            className={`appearance-none bg-transparent font-medium cursor-pointer outline-none pr-4 text-right
                                                ${det.status === 'APPROVED' ? 'text-green-600' :
                                                    det.status === 'REJECTED' ? 'text-red-500' : 'text-amber-500'}`}
                                        >
                                            <option value="APPROVED">Approved</option>
                                            <option value="REJECTED">Rejected</option>
                                            <option value="PENDING">Pending</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200
                                    ${buttonEnabled[det.id]
                                        ? updateBut[det.id]
                                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-200'
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
                                        : 'bg-indigo-50 text-indigo-300 cursor-not-allowed'
                                    }`}
                                disabled={!buttonEnabled[det.id]}
                                onClick={() => { updateStatus(det.id, det.status) }}
                            >
                                {updateBut[det.id] ? "Delete" : "Update Status"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminDash