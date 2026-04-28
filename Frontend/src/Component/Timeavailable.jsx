import React, { useState } from 'react';

const Timeavailable = () => {
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlotsMorning = [
    '9:00 AM', '9:10 AM', '9:20 AM', '9:30 AM', '9:40 AM',
    '10:00 AM', '10:10 AM', '10:20 AM', '10:30 AM'
  ];

  const timeSlotsEvening = [
    '5:00 PM', '5:10 PM', '5:20 PM', '5:30 PM', '5:40 PM',
    '6:00 PM', '6:10 PM', '6:20 PM'
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-1/3 p-6 border-r">
          <h2 className="text-xl font-semibold mb-4">Appointments</h2>
          <div className="mb-4 text-sm text-gray-600">AUG 2018</div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-700">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <div key={day} className="font-medium">{day}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i}
                className={`p-2 rounded-full ${i + 1 === 2 ? 'bg-green-500 text-white' : 'hover:bg-gray-200'}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3 p-6 space-y-6">
          {/* Morning */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">🌅 Morning</h3>
              <button className="text-blue-500 text-sm">+ Add Slots</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {timeSlotsMorning.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-4 rounded-lg border text-sm ${
                    selectedTime === time ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Evening */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">🌇 Evening</h3>
              <button className="text-blue-500 text-sm">+ Add Slots</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {timeSlotsEvening.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-4 rounded-lg border text-sm ${
                    selectedTime === time ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Waiting List */}
          <div className="pt-4 border-t text-gray-600 text-sm">
            Waiting list: <button className="text-blue-500 ml-2">+ Add to Wait List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeavailable;
