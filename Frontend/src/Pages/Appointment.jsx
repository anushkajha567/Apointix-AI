import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaStethoscope, FaNotesMedical, FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';

const Appointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issue: "",
    doctor_name: "",
    doctor_id: null,
    patient_id: null,
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const selectedDoctor = location.state?.doctor;

  useEffect(() => {
    // Get user ID from localStorage
    const storedUserId = localStorage.getItem('userId');

    setFormData(prev => ({
      ...prev,
      patient_id: storedUserId,
      doctor_name: selectedDoctor ? selectedDoctor.name : prev.doctor_name,
      doctor_id: selectedDoctor ? selectedDoctor.id : prev.doctor_id
    }));
  }, [selectedDoctor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/book-appointment`, formData);
      const { message, success } = res.data;

      if (success) {
        toast.success(message);
        setTimeout(() => {
          navigate('/doctors-info');
        }, 2000);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Booking Error", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-10">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Book an Appointment</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Schedule a visit with our top specialists. Your health is our priority.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">

          {/* Left Side: Form */}
          <div className="p-8 md:p-10 md:w-2/3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaCalendarCheck className="text-blue-600" /> Appointment Details
              </h2>
            </div>

            {/* Selected Doctor Badge */}
            {selectedDoctor && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-center gap-4">
                <img
                  src={selectedDoctor.profile_image || "https://avatar.iran.liara.run/public/job/doctor/male"}
                  alt="Doc"
                  className="w-12 h-12 rounded-full bg-white object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-wide">Selected Doctor</p>
                  <h3 className="font-bold text-gray-800">{selectedDoctor.name}</h3>
                  <p className="text-sm text-gray-500">{selectedDoctor.specialization}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup icon={<FaUser />} label="Patient Name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                <InputGroup icon={<FaEnvelope />} label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup icon={<FaPhone />} label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 234 567 890" />
                <InputGroup icon={<FaCalendarAlt />} label="Preferred Date" type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>

              {/* Fallback doctor select if came directly without selection */}
              {!selectedDoctor && (
                <div className="relative group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Doctor Name</label>
                  <FaStethoscope className="absolute top-9 left-4 text-gray-400 z-10" />
                  <input
                    type="text"
                    name="doctor_name"
                    value={formData.doctor_name}
                    onChange={handleChange}
                    placeholder="Enter Doctor Name"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                    required
                  />
                </div>
              )}

              <div className="relative group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Health Issue</label>
                <FaNotesMedical className="absolute top-9 left-4 text-gray-400 z-10" />
                <textarea
                  name="issue"
                  rows="3"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none font-medium"
                  placeholder="Briefly describe your symptoms..."
                  value={formData.issue}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? 'Processing...' : <>Confirm Appointment <FaCheckCircle /></>}
              </button>
            </form>
          </div>

          {/* Right Side: Info / Visuals */}
          <div className="md:w-1/3 bg-gray-50 p-8 border-l border-gray-100 flex flex-col justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Why Choose Us?</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-1" /> Experienced Specialists</li>
                <li className="flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-1" /> Modern Facilities</li>
                <li className="flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-1" /> 24/7 Patient Support</li>
              </ul>
            </div>

            <div className="text-center text-gray-400 text-sm">
              <p>Need help?</p>
              <p className="font-semibold text-blue-600">Call +1 (555) 123-4567</p>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
    </div>
  );
};

const InputGroup = ({ icon, label, ...props }) => (
  <div className="relative group">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
    <div className="absolute top-9 left-4 text-gray-400 z-10 group-focus-within:text-blue-500 transition-colors">{icon}</div>
    <input
      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-gray-700"
      {...props}
    />
  </div>
);

export default Appointment;
