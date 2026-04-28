import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaCalendarCheck, FaCheckCircle, FaTimesCircle, FaPen } from 'react-icons/fa';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({});

  const [previewImage, setPreviewImage] = useState(null);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error("Please log in to view profile");
        setLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/userProfile?userId=${userId}`, {
        method: "GET",
        headers:
          { "Content-Type": "application/json" },
      });
      const res = await response.json();
      if (res.success && res.user && res.user.length > 0) {
        setFormData(res.user[0]);
        if (res.user[0].profile_pic) {
          setPreviewImage(res.user[0].profile_pic);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({ ...prev, profile_pic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/userProfile`, {
        method: "PUT",
        headers:
          { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: localStorage.getItem('userId') })
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.message);
        setIsReadOnly(true);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Update failed_frontend");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            </div>

            <div className="px-8 pb-8 text-center relative">
              <div className="w-32 h-32 mx-auto -mt-16 relative group">
                <div className="w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {previewImage ? (
                    <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="text-4xl text-gray-300" />
                  )}
                </div>
                {!isReadOnly && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-md">
                    <FaCamera className="text-sm" />
                    <input type="file" accept="image/*" className="hidden" onChange={onImageChange} />
                  </label>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-4">{formData.name} {formData.age || 'User'}</h2>
              <p className="text-gray-500 text-sm mb-6">{formData.email || 'No email set'}</p>

              <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                <StatBox count={formData.booked || 0} label="Booked" color="text-blue-600" />
                <StatBox count={formData.approved || 0} label="Approved" color="text-green-600" />
                <StatBox count={formData.denied || 0} label="Denied" color="text-red-500" />
              </div>
            </div>
          </div>

          {/* Right: Settings Panel */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
            <div className="border-b border-gray-100 px-8 py-5 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-800">Account Settings</h3>
              <button
                onClick={() => setIsReadOnly(!isReadOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isReadOnly ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                {isReadOnly ? <><FaPen className="text-xs" /> Edit Profile</> : 'Cancel Edit'}
              </button>
            </div>

            <div className="p-8 flex-1">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* <pre>{formData.Name}"hie"</pre> */}
                  <InputGroup label="Name" name="name" value={formData.name} onChange={handleChange} readOnly={isReadOnly} icon={<FaUser />} />
                  <InputGroup type="number" label="Age" name="age" value={formData.age} onChange={handleChange} readOnly={isReadOnly} icon={<FaUser />} />
                  <InputGroup label="Phone Number" name="phone_no" value={formData.phone_no} onChange={handleChange} readOnly={isReadOnly} icon={<FaPhone />} />
                  <InputGroup label="Email Address" name="email" value={formData.email} onChange={handleChange} readOnly={true} icon={<FaEnvelope />} />


                  <InputGroup label="City" name="city" value={formData.city} onChange={handleChange} readOnly={isReadOnly} icon={<FaMapMarkerAlt />} />
                  <div className="relative">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Country</label>
                    <div className="relative">
                      <FaGlobe className="absolute top-3.5 left-4 text-gray-400 z-10" />
                      <select
                        name="country"
                        value={formData.country || ""}
                        onChange={handleChange}
                        disabled={isReadOnly}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all appearance-none ${isReadOnly ? 'bg-gray-50 border-transparent text-gray-500' : 'bg-white border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}`}
                      >
                        <option value="" disabled>Select Country</option>
                        <option value="India">India</option>
                        <option value="America">America</option>
                        <option value="Canada">Canada</option>
                        <option value="UK">UK</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                {!isReadOnly && (
                  <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={updateProfile}
                      className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all active:scale-95"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

const StatBox = ({ count, label, color }) => (
  <div className="text-center p-2 rounded-xl hover:bg-gray-50 transition-colors">
    <div className={`text-2xl font-bold ${color}`}>{count}</div>
    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-1">{label}</div>
  </div>
);

const InputGroup = ({ label, name, value, onChange, readOnly, icon }) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
    <div className="relative group">
      <div className={`absolute top-3.5 left-4 z-10 transition-colors ${readOnly ? 'text-gray-400' : 'text-blue-500'}`}>{icon}</div>
      <input
        type="text"
        name={name}
        value={value || ''}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all font-medium ${readOnly ? 'bg-gray-50 border-transparent text-gray-500 cursor-default' : 'bg-white border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800'}`}
      />
    </div>
  </div>
);

export default ProfilePage;
