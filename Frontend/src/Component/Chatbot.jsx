import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { RingLoader } from "react-spinners";
import chatbot_image from '../images/chatbot_image.png';
import { FaPaperPlane, FaComments, FaTimes, FaRobot } from "react-icons/fa";

const Chatbot = () => {

  const initialPrompt = `You are a helpful and friendly chatbot for a doctor's office appointment system. 
Your primary goal is to book appointments for patients. Your task is to ask the user for the following information in a clear and conversational manner, one question at a time:
1. Name: "First, could you please tell me your full name?"
2. Age: "Thank you, [Name]. What is your age?"
3. Location: "Thank you [Name]. where you are Currently in?"
4. Issue/Reason for Appointment: "And finally, could you please briefly describe the issue or reason for your appointment today?"
Once you have all three pieces of information, confirm the details with the user and offer to book the appointment.
Suggest him the Doctor as per the issues.
1. Dr. Shuddhatam Jain : General & Laparoscopic Surgeon Clinics: SPES Super Speciality Hospital + one more
2. Dr. Amit Jaiswal : Cardiologist Location: Apollo Spectra, NSG Chowk
3. Dr. Anuj Arora : Urologist Location: Apollo Spectra, NSG Chowk
4. Dr. S. K. Sahoo : Internal Medicine
5. Dr. Sharat Kumar Garg : Neurology & Neurosurgery Location: Apollo Spectra, NSG Chowk
6. Dr. Abhijeet Singh : Pulmonologist / Chest Medicine Location: Sharda Care, Knowledge Park III
7. Dr. Arvind Govil, Dr. Sunil Sharma : Ophthalmologists Location: At Sharma Medicare Super Speciality, Delta II
8. Dr. Parag Agarwal : Internal Medicine Location: From Numed Superspeciality Hospital Delhi (Prominent Specialists)
9. Dr. Deepak Agrawal : Neurosurgeon
10. Dr. Atul Kumar : Vitreoretinal Ophthalmologist
11. Dr. Naresh Trehan : Cardiovascular & Cardiothoracic Surgeon
12. Dr Amit Suri : Head of Respiratory, RML Hospital, Delhi
13. Dr. Kshitij Bhatnagar : ENT specialist in Noida/Greater Noida West`;

  const End = useRef(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: "user", text: initialPrompt }
  ]);

  // Initial message to show when chat opens (if any, optional)
  // For now we rely on the logic that sends initialPrompt to AI on mount.
  // But strictly speaking, we want to hide the initialPrompt from view.

  useEffect(() => {
    // Only send context if it hasn't been sent? 
    // The original code sent it on mount. We'll keep that.
    sendToAI([{ role: "user", text: initialPrompt }]);
  }, []);

  const sendToAI = async (history) => {
    setLoading(true);

    // Filter out the initial system prompt if the backend doesn't need it or handles context differently
    // However, keeping the history intact is usually good.

    // We only send the history array. The formatting logic has moved to the backend.

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history })
      });

      const res = await response.json();

      if (res.success) {
        const updatedHistory = [...history, { role: "bot", text: res.reply }];
        setChatHistory(updatedHistory);
      } else {
        // Handle error cleanly
        const updatedHistory = [...history, { role: "bot", text: "Something went wrong. Please try again." }];
        setChatHistory(updatedHistory);
      }

    } catch (err) {
      console.error("Error from Backend:", err);
      const updatedHistory = [...history, { role: "bot", text: "Network error. Please try again." }];
      setChatHistory(updatedHistory);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() === "") return;

    const updatedHistory = [...chatHistory, { role: "user", text: question }];
    setChatHistory(updatedHistory);
    sendToAI(updatedHistory);
  };

  useEffect(() => {
    End.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isOpen]);

  // If closed, just show the toggle button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-50 animate-bounce-subtle"
        aria-label="Open Chat"
      >
        <FaComments size={28} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-fade-in-up">
      {/* Chat Window */}
      <div className="w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <img src={chatbot_image} alt="Bot" className="w-8 h-8 rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Assistant</h3>
              <p className="text-xs text-blue-100 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {chatHistory.map((msg, idx) => {
            // Start rendering from the first welcome message (skip the prompt)
            if (msg.text === initialPrompt) return null;

            const isBot = msg.role === "bot";
            return (
              <div key={idx} className={`flex w-full ${isBot ? "justify-start" : "justify-end"}`}>
                {isBot && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-2 shrink-0">
                    <FaRobot />
                  </div>
                )}
                <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${isBot
                  ? "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                  : "bg-blue-600 text-white rounded-tr-none"
                  }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
          {loading && (
            <div className="flex justify-start w-full">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-2 shrink-0">
                <FaRobot />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                <RingLoader color="#3B82F6" size={24} />
              </div>
            </div>
          )}
          <div ref={End}></div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Type your message..."
              className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all resize-none h-[50px] max-h-[100px]"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 flex items-center justify-center h-[50px] w-[50px]"
            >
              <FaPaperPlane size={18} />
            </button>
          </form>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400">Powered by Apointix AI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

