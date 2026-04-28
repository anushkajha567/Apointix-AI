import React from 'react';
import { FaUserMd, FaRobot, FaShieldAlt, FaClock, FaStethoscope, FaHospitalUser } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans pt-10">

      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className='absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-60'></div>
          <div className='absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-60'></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Revolutionizing
            </span>
            <br />
            Healthcare Access
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Welcome to <span className="font-bold text-blue-600">Apointix</span>. We bridge the gap between patients and world-class care, making healthcare instant, intelligent, and seamless.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-blue-600 text-white py-12 shadow-lg relative z-20 mx-4 md:mx-12 rounded-3xl -mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatItem number="10k+" label="Active Patients" />
          <StatItem number="500+" label="Verified Doctors" />
          <StatItem number="24/7" label="AI Support" />
          <StatItem number="99%" label="Satisfaction" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">

        {/* Mission */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-sm uppercase tracking-wide">
              Our Mission
            </div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Simplifying healthcare with <span className="text-blue-600">smart technology</span>.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that finding the right doctor shouldn't be a headache. Whether you need a general consultation or a specialized expert, Apointix connects you instantly.
            </p>
            <div className="border-l-4 border-blue-500 pl-6 italic text-gray-500 text-lg">
              "Healthcare should be accessible, transparent, and stress-free for everyone, everywhere."
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100 grid grid-cols-2 gap-4">
              <FeatureMiniCard icon={<FaClock />} title="Instant" desc="Book in seconds" />
              <FeatureMiniCard icon={<FaShieldAlt />} title="Secure" desc="Encrypted data" />
              <FeatureMiniCard icon={<FaStethoscope />} title="Experts" desc="Top specialists" />
              <FeatureMiniCard icon={<FaHospitalUser />} title="Accessible" desc="For everyone" />
            </div>
          </div>
        </div>

        {/* AI Spotlight */}
        <div className="bg-gray-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden text-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl mx-auto flex items-center justify-center text-4xl mb-8 shadow-2xl shadow-blue-500/30">
              <FaRobot />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet Your AI Health Companion</h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Not sure which specialist to see? Our advanced AI assistant guides you through symptoms, answers queries, and helps you book the right doctor—available 24/7.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <DarkFeatureCard title="Symptom Check" desc="Describe what you feel, get instant guidance." />
              <DarkFeatureCard title="Smart Matching" desc="We find the perfect specialist for your needs." />
              <DarkFeatureCard title="24/7 Support" desc="Medical queries answered anytime, anywhere." />
            </div>
          </div>
        </div>

      </div>

      {/* Footer / CTA */}
      <div className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to prioritize your health?</h2>
          <p className="text-gray-600 mb-8">Join thousands of patients who trust Apointix.</p>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Apointix. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ number, label }) => (
  <div className="p-2">
    <div className="text-4xl font-bold mb-1">{number}</div>
    <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">{label}</div>
  </div>
);

const FeatureMiniCard = ({ icon, title, desc }) => (
  <div className="p-6 bg-gray-50 rounded-2xl text-center hover:bg-blue-50 transition-colors">
    <div className="text-3xl text-blue-600 mb-3 mx-auto w-fit">{icon}</div>
    <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
    <p className="text-xs text-gray-500">{desc}</p>
  </div>
);

const DarkFeatureCard = ({ title, desc }) => (
  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
    <h3 className="font-bold text-lg mb-2 text-blue-200">{title}</h3>
    <p className="text-sm text-gray-400">{desc}</p>
  </div>
);

export default About;
