import { useNavigate } from "react-router-dom";
import { FaUserMd, FaHospital, FaAmbulance, FaStethoscope, FaHeartbeat, FaBrain, FaTooth, FaBaby, FaSearch, FaArrowRight, FaCalendarCheck, FaUserPlus } from "react-icons/fa";
import background from "../images/background1.jpg";
import Chatbot from "../Component/Chatbot";

const Home = () => {
  const navigate = useNavigate();

  const services = [
    { icon: <FaHeartbeat className="text-4xl text-red-500" />, title: "Cardiology", desc: "Expert care for your heart health." },
    { icon: <FaBrain className="text-4xl text-pink-500" />, title: "Neurology", desc: "Comprehensive neurological disorders treatment." },
    { icon: <FaTooth className="text-4xl text-blue-400" />, title: "Dentistry", desc: "Complete dental care and surgeries." },
    { icon: <FaBaby className="text-4xl text-green-500" />, title: "Pediatrics", desc: "Specialized care for infants and children." },
  ];

  const features = [
    { icon: <FaUserMd />, title: "Qualified Doctors", desc: "Top-rated specialists from various fields." },
    { icon: <FaCalendarCheck />, title: "Easy Booking", desc: "Instant appointment booking with zero hassle." },
    { icon: <FaHospital />, title: "24/7 Service", desc: "Emergency services available round the clock." },
    { icon: <FaAmbulance />, title: "Emergency Care", desc: "Quick ambulance support for critical situations." },
  ];

  return (
    <div className="font-sans pt-10 text-gray-800">

      {/* Hero Section */}
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/70"></div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up tracking-tight leading-tight">
            Your Health, <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Our Priority</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-blue-100 font-light">
            Book appointments with the best doctors in your city tailored to your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/doctors-info')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              <FaSearch /> Find a Doctor
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-full text-lg transition-all border border-white/30 flex items-center gap-2"
            >
              <FaUserPlus /> Join as Patient
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-8">
            <div>
              <h3 className="text-4xl font-bold">100+</h3>
              <p className="text-blue-200">Expert Doctors</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">50k+</h3>
              <p className="text-blue-200">Patients Served</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-blue-200">Emergency Support</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">4.8</h3>
              <p className="text-blue-200">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Specialties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide specialized care across various medical fields to ensure your well-being.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-500">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/doctors-info')}
              className="text-blue-600 font-bold hover:text-blue-800 flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              View all specialties <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                <img
                  src="https://images.unsplash.com/photo-1579684385180-1a0147fc2438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Doctor Team"
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-8 text-gray-900">Why Choose Apointix?</h2>
              <div className="space-y-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h4>
                      <p className="text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to prioritize your health?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join thousands of satisfied patients who trust Apointix for their medical needs.</p>
          <button
            onClick={() => navigate('/signup')}
            className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full text-lg hover:bg-gray-100 transition-all shadow-lg transform hover:-translate-y-1"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FaStethoscope className="text-blue-500" /> Apointix
            </h3>
            <p className="mb-6">Connecting you with the best healthcare professionals for a healthier tomorrow.</p>
            <div className="flex gap-4">
              {/* Social icons placeholder */}
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><FaHospital /></div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><FaHeartbeat /></div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="/" className="hover:text-blue-500 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-blue-500 transition-colors">About Us</a></li>
              <li><a href="/doctors-info" className="hover:text-blue-500 transition-colors">Doctors</a></li>
              <li><a href="/contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Cardiology</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Neurology</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Orthopedics</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Pediatrics</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>123 Medical Center Dr.</li>
              <li>Health City, HC 12345</li>
              <li>contact@apointix.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Apointix. All rights reserved.</p>
        </div>
      </footer>

      {/* Chatbot Integration */}
      <Chatbot />
    </div>
  );
};

export default Home;