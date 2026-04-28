import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useActionData, useParams } from 'react-router-dom';

const DoctorsData = () => {
  const [doc, setDoc] = useState({
    name: "",
  });
  const { id } = useParams();

  useEffect(() => {
    setDoc({
      name: id,
    });
  }, []);
  const [response, setResponse] = useState({});
  useEffect(() => {
    const DoctorData = async () => {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/doctor`, doc);
      if (res.data && res.data.user) {
        setResponse(res.data.user); // set entire doctor object
      }
    }
    DoctorData();
  }, [doc.name])







  return (
    <div className='p-15'>
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 p-6 flex justify-center">
                <div className="h-64 w-64 rounded-full overflow-hidden border-4 border-indigo-100">
                  <img
                    src="https://placehold.co/400x400"
                    alt="Portrait of Dr. Shakti Bhan Khanna, a senior Obstetrics & Gynecology specialist with 61 years experience"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="md:w-2/3 p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-1">{response.name}</h1>
                <p className="text-lg text-indigo-600 font-medium mb-3">{response.specialty}</p>

                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-700">{response.experience} years experience</span>
                </div>

                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-700">{response.clinic}</span>
                </div>

                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-700">{response.location}</span>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Availability</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Mon-Fri</span>
                      <span className="text-gray-600">10:00-15:00</span>
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Not Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Book Appointment Through</h3>
              <div className="flex flex-wrap gap-3">
                {response.sources?.map((msg, idx) => (
                  <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">{msg}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-gray-500 text-sm">
            Consultation fee information : {response.fee == null ? "Not available currently" : response.fee}
          </div>
        </div>
      </div>

    </div>
  )
}

export default DoctorsData