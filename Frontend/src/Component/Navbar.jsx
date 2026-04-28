import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // Handle scroll effect & Auth check
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        // Get role from storage
        const role = localStorage.getItem('userRole');
        const token = localStorage.getItem('token');
        if (token && role) {
            setUserRole(role);
        } else {
            setUserRole(null);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const ClickLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        setUserRole(null);
        toast.success("Logout Successful");
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    // Define Link Groups
    const patientLinks = [
        { name: "Dashboard", path: "/patient" },
        { name: "Specialists", path: "/doctors-info" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Registration", path: "/patient-registration" },
        { name: "Profile", path: "/profile" }
    ];

    const doctorLinks = [
        { name: "Dashboard", path: "/doctor" },
        { name: "Register", path: "/doc-profile" },
        { name: "Appointments", path: "/doctor-appointments" }, // Placeholder for now
        { name: "Profile", path: "/profile" },
    ];

    const adminLinks = [
        { name: "Dashboard", path: "/admin" },
        { name: "Doctors", path: "/admin/doctors" },
        { name: "Patients", path: "/PatientData" },
        { name: "Profile", path: "/profile" },
    ];

    const guestLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Login", path: "/login" },
    ];

    // Determine which links to show
    let currentLinks = guestLinks;
    if (userRole === 'PATIENT') currentLinks = patientLinks;
    else if (userRole === 'DOCTOR') currentLinks = doctorLinks;
    else if (userRole === 'ADMIN') currentLinks = adminLinks;

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <nav
                className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-md py-3 transition-all duration-300"
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 text-white p-2 rounded-lg transform group-hover:rotate-3 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold font-sans tracking-tight text-slate-800 transition-colors">
                            Apointix
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {currentLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-bold transition-all duration-200 relative py-1
                                    ${isActive(link.path)
                                        ? "text-blue-600"
                                        : "text-gray-600 hover:text-blue-600"
                                    }
                                `}
                            >
                                {link.name}
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full transform transition-transform duration-300 origin-left
                                    ${isActive(link.path)
                                        ? "bg-blue-600 scale-x-100"
                                        : "scale-x-0 bg-blue-600"
                                    }
                                `}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side (Logout) */}
                    <div className="hidden md:block">
                        {userRole ? (
                            <div onClick={ClickLogout} className="cursor-pointer">
                                <span className="px-5 py-2 rounded-full text-sm font-bold transition-all border border-blue-100 text-blue-600 hover:bg-blue-50">
                                    Logout
                                </span>
                            </div>
                        ) : (
                            <Link to="/signup" className="px-5 py-2 rounded-full text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                Get Started
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-2xl text-gray-800 transition-colors"
                    >
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out border-t border-gray-100 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    <ul className="flex flex-col p-6 gap-4">
                        {currentLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block text-lg font-semibold px-4 py-3 rounded-xl transition-colors
                                        ${isActive(link.path)
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-600 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            {userRole ? (
                                <button
                                    onClick={() => {
                                        ClickLogout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left text-lg font-semibold px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-lg font-semibold px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
            <ToastContainer position="bottom-right" theme="colored" />
        </>
    );
};

export default Navbar;