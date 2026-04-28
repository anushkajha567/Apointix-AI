import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeadset, FaQuestionCircle, FaCalendarCheck, FaPaperPlane, FaUser, FaTag, FaCommentAlt } from 'react-icons/fa';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const formRef = useRef();

  const formData = {
    name: name,
    email: email,
    subject: subject,
    category: category,
    message: message
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/messagePage`, formData);
      const { message, success } = res.data;
      if (success) {
        toast.success(message);
        setName("");
        setEmail("");
        setSubject("");
        setCategory("");
        setMessage("");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10 font-sans">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">We're Here for You</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions or need assistance? Our dedicated team is ready to help 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left Column: Contact Form */}
          <div ref={formRef} className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 z-0"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h2>
              <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

              <form onSubmit={submitHandler} className="space-y-5">
                <div className="relative">
                  <FaUser className="absolute top-4 left-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <FaTag className="absolute top-4 left-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full pl-4 pr-8 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none text-gray-600"
                    >
                      <option value="" disabled>Select Category</option>
                      <option value="General Physician">General Physician</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Dentist">Dentist</option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Others">Others</option>
                    </select>
                    <div className="absolute top-4 right-4 pointer-events-none text-gray-400">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <FaCommentAlt className="absolute top-4 left-4 text-gray-400" />
                  <textarea
                    placeholder="Your Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 h-32 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending...' : <>Send Message <FaPaperPlane /></>}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Contact Info & Map */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContactCard icon={<FaPhoneAlt />} title="Call Us" detail="+1 (555) 123-4567" subDetail="Mon-Fri, 9am-6pm" color="bg-green-50 text-green-600" />
              <ContactCard icon={<FaEnvelope />} title="Email Us" detail="support@apointix.com" subDetail="We reply 24/7" color="bg-blue-50 text-blue-600" />
              <ContactCard icon={<FaMapMarkerAlt />} title="Visit Us" detail="123 Health Street" subDetail="Medical District, NY" color="bg-purple-50 text-purple-600" />
              <ContactCard icon={<FaHeadset />} title="Live Chat" detail="Available on App" subDetail="Instant Support" color="bg-orange-50 text-orange-600" />
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-3xl h-64 w-full relative overflow-hidden group">
              {/* Placeholder Image simulating a map */}
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=600x300&maptype=roadmap&style=feature:all|saturation:-100&key=YOUR_API_KEY_HERE')] bg-cover bg-center grayscale opacity-60 group-hover:grayscale-0 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-gray-700 font-bold">
                  <FaMapMarkerAlt className="text-red-500" /> Locate on Map
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-24 bg-white py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Need Immediate Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SupportCard
                icon={<FaHeadset />}
                title="Talk to AI"
                desc="Get instant answers from our intelligent AI assistant."
                link="/"
                linkText="Chat Now"
              />
              <SupportCard
                icon={<FaQuestionCircle />}
                title="Help Center"
                desc="Browse FAQs and guides to find what you need."
                action={scrollToForm}
                linkText="Visit Help Center"
              />
              <SupportCard
                icon={<FaCalendarCheck />}
                title="Book a Doctor"
                desc="Secure your appointment with a specialist today."
                link="/appointment"
                linkText="Find a Doctor"
              />
            </div>
          </div>
        </div>

        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </div>
  )
}

const ContactCard = ({ icon, title, detail, subDetail, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start gap-4">
    <div className={`p-3 rounded-xl ${color} text-xl`}>{icon}</div>
    <div>
      <h3 className="font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600 font-medium">{detail}</p>
      <p className="text-xs text-gray-400 mt-1">{subDetail}</p>
    </div>
  </div>
);

const SupportCard = ({ icon, title, desc, link, linkText, action }) => (
  <div className="bg-slate-50 p-8 rounded-3xl hover:bg-blue-50 transition-colors group text-left">
    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl text-blue-600 shadow-sm mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 mb-6 leading-relaxed">{desc}</p>
    {link ? (
      <Link to={link} className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2">
        {linkText} <FaArrowRight className="text-sm" />
      </Link>
    ) : (
      <button onClick={action} className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2">
        {linkText} <FaArrowRight className="text-sm" />
      </button>
    )}
  </div>
);

const FaArrowRight = ({ className }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
);

export default Contact