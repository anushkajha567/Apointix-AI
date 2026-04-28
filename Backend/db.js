import express from 'express';
import cors from 'cors';
const app = express();
import mysql from "mysql2/promise";

app.use(cors({
    origin: (origin, callback) => {
        // Logging origin for debugging 403 errors
        console.log("Request Origin:", origin);
        callback(null, true);
    },
    credentials: true
}));

app.use(express.json({ limit: '50mb' })); // REQUIRED



import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "ab13ha04y2003",
    database: process.env.DB_NAME || "db",
    port: process.env.DB_PORT || 3306,
    ssl: {
        rejectUnauthorized: false
    }
});

// ... (existing helper function to create tables, unchanged logic but just ensuring context)
// But I can't put that here. I'm replacing a block.

// I will try to target the top headers and the connection first.

app.put('/updateDoc', async (req, res) => {
    try {
        const { id, status } = req.body;
        const [rows] = await db.query(`update doctors set status = (?) where id = (?)`, [status, id]);
        return res.status(200).json({
            success: true,
            message: "Updated Successfully"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not updated due to Server issue"
        });
    }
});

app.delete('/deleteDoc', async (req, res) => {
    try {
        const { id } = req.body;
        const [rows] = await db.query(`delete from doctors where id = (?)`, [id]);
        return res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Not Deleted due to Server issue"
        });
    }
});


app.post('/registerDoc', async (req, res) => {
    try {
        const {
            // Personal
            user_id, name, email, phone, gender, dob,
            // Professional
            specialization, qualification, experience, reg_number, reg_council,
            // Clinic
            clinic_name, address, city, state, pincode, consultation_type,
            // Availability
            available_days, time_slots, slot_duration, max_patients,
            // Fees
            consultation_fee, follow_up_fee, online_fee
        } = req.body;

        // Basic validation for critical fields
        if (!name || !email || !phone || !specialization || !experience || !reg_number) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields (Name, Email, Phone, Specialization, Experience, Reg Number)"
            });
        }

        // Check if doctor already exists
        const [existing] = await db.query(`select id from doctors where email = ? or phone = ? or reg_number = ?`, [email, phone, reg_number]);
        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Doctor with this Email, Phone or Reg Number already exists."
            });
        }

        const query = `
            INSERT INTO doctors (
                user_id, name, email, phone, gender, dob,
                specialization, qualification, experience, reg_number, reg_council,
                clinic_name, address, city, state, pincode, consultation_type,
                available_days, time_slots, slot_duration, max_patients,
                consultation_fee, follow_up_fee, online_fee,
                status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')
        `;

        const values = [
            user_id, name, email, phone, gender, dob,
            specialization, qualification, experience, reg_number, reg_council,
            clinic_name, address, city, state, pincode, consultation_type,
            JSON.stringify(available_days), JSON.stringify(time_slots), slot_duration, max_patients,
            consultation_fee, follow_up_fee, online_fee
        ];

        await db.query(query, values);

        return res.status(200).json({
            success: true,
            message: "Registration Successful! Application under review."
        });
    } catch (err) {
        console.error("Registration Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error: " + err.message
        });
    }
});

app.post('/registerPatient', async (req, res) => {
    try {
        const {
            user_id, full_name, age, gender, phone, email,
            address, emergency_contact, medical_notes, first_visit
        } = req.body;

        if (!user_id || !full_name || !phone) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const [existing] = await db.query('SELECT * FROM patients WHERE user_id = ?', [user_id]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: "Patient profile already exists for this user" });
        }

        await db.query(`
            INSERT INTO patients (
                user_id, full_name, age, gender, phone, email,
                address, emergency_contact, medical_notes, first_visit
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            user_id, full_name, age, gender, phone, email,
            address, emergency_contact, medical_notes, first_visit ? 1 : 0
        ]);

        res.json({ success: true, message: "Patient Registered Successfully" });

    } catch (error) {
        console.error("Error registering patient:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.get('/userProfile', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const [rows] = await db.query(`select * from users where id = ?`, [userId]);

        // If no profile exists, create a default one or return empty
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const users = rows.map(user => ({
            ...user,
            profile_pic: user.profile_pic ? user.profile_pic.toString() : ""
        }));

        return res.status(200).json({
            success: true,
            user: users
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.put('/userProfile', async (req, res) => {
    try {
        const { id, name, age, phone_no, email, city, country, profile_pic } = req.body;

        if (name.length === 0) {
            return res.json({
                success: false,
                message: "Enter valid Name"
            })
        }
        if (age < 0 || age > 150) {
            return res.json({
                success: false,
                message: "Enter valid Age"
            })
        }
        if (phone_no.length != 10) {
            return res.json({
                success: false,
                message: "Enter valid Phone Number"
            })
        }
        // console.log("Updating User Profile:", { id, name, age, email, phone_no, city, country });

        const [result] = await db.query(`UPDATE users SET name=?, age=?, email=?, phone_no=?, city=?, country=?, profile_pic=? WHERE id=?`,
            [name, age, email, phone_no, city, country, profile_pic, id]);

        // console.log("Update Result:", result);

        if (result.affectedRows === 0) {
            console.warn(`User with ID ${id} not found.`);
            return res.status(404).json({
                success: false,
                message: "User not found (Check ID)"
            });
        }

        return res.json({
            message: "Profile Updated Successfully",
            success: true,
            user: req.body
        });
    } catch (err) {
        console.error("Update Error:", err);
        return res.status(500).json({ success: false, message: "Update Failed: " + err.message });
    }
});

app.get('/DoctorsData', async (req, res) => {
    const [rows] = await db.query(`select * from doctors`);
    return res.status(200).json({
        success: true,
        data: rows
    });
});

app.get('/doctors-panel-info', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT *
            FROM doctors 
            WHERE status = 'APPROVED'
        `); // Fetching * to avoid column mismatch errors

        return res.status(200).json({
            success: true,
            data: rows
        });
    } catch (err) {
        console.error("Error fetching doctors panel info:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error fetching doctors"
        });
        return res.status(500).json({
            success: false,
            message: "Server Error fetching doctors"
        });
    }
});

app.post('/book-appointment', async (req, res) => {
    try {
        const { name, email, phone, issue, doctor_name, doctor_id, date, status, patient_id } = req.body;

        // Basic validation
        if (!name || !email || !phone || !doctor_name || !date) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Check if patient exists for this user
        const [patientRows] = await db.query('SELECT id FROM patients WHERE user_id = ?', [patient_id]);

        if (patientRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Patient profile not found. Please complete your profile first."
            });
        }

        const actual_patient_id = patientRows[0].id;

        // Assuming 'appointments' table exists with these columns. 
        // If not, this will fail, but we follow the pattern of existing code.
        const [result] = await db.query(
            `INSERT INTO appointments (patient_id, issue, doctor_id, appointment_date, time_slot, status) VALUES (?, ?, ?, ?, '09:00:00', 'PENDING')`,
            [actual_patient_id, issue, doctor_id, date]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: "Appointment Booked Successfully"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to book appointment"
            });
        }
    } catch (err) {
        console.error("Booking Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error: " + err.message
        });
    }
});

app.post('/register', async (req, res) => {
    const { name, mail, password, role } = req.body;

    const [rows] = await db.query(`select COUNT(*) as userCount from users where email = (?)`, [mail]);
    const count = rows[0].userCount;
    if (!name || !mail || !password || !role) {
        return res.json({
            message: "All fields including Role are Required...",
            success: false
        })
    }
    else if (count) {
        return res.status(200).json({
            message: `User Already Exist...`,
            success: false
        })
    }
    else if (password.length < 8) {
        return res.json({
            message: "Use Atleast Password of length 8...",
            success: false
        })
    }
    else {
        // Enforce valid roles to prevent abuse
        const validRoles = ["PATIENT", "DOCTOR", "ADMIN"];
        const userRole = validRoles.includes(role) ? role : "PATIENT";

        await db.query(`insert into users(name,email,password,role) values(?,?,?,?)`, [name, mail, password, userRole]);

        return res.json({
            message: "Register Successfully...",
            success: true
        })
    }
});

app.post('/login', async (req, res) => {
    const { mail, password } = req.body;
    const [userDB] = await db.query(`select * from users where email = (?) and password = (?)`, [mail, password]);
    if (userDB.length === 0) { //if not exits in database;
        return res.json({
            message: "Username Doesn't Exist or Password not matching...",
            success: false
        })
    }
    else {
        return res.json({
            message: "Login Successfull...",
            success: true,
            userId: userDB[0].id,
            user: userDB[0]
        })
    }
});


app.get("/test-db", async (req, res) => {
    try {
        const db = require("./db");   // adjust if file name different
        const [rows] = await db.query("SELECT 1 as test");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


app.get('/getAllPatients', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM patients ORDER BY created_at DESC');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ success: false, message: "Error fetching patients" });
    }
});

app.delete('/deletePatient', async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ success: false, message: "Patient ID is required" });

        await db.query('DELETE FROM patients WHERE id = ?', [id]);
        res.json({ success: true, message: "Patient Deleted Successfully" });
    } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).json({ success: false, message: "Error deleting patient" });
    }
});


app.get('/doctor-appointments', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // First find the doctor profile associated with this user
        const [doctorRows] = await db.query('SELECT id FROM doctors WHERE user_id = ?', [userId]);

        if (doctorRows.length === 0) {
            return res.status(404).json({ success: false, message: "Doctor profile not found" });
        }

        const doctorId = doctorRows[0].id;

        // Fetch appointments with patient details
        const query = `
            SELECT 
                a.id as appointment_id,
                a.appointment_date,
                a.time_slot,
                a.issue,
                a.status,
                p.full_name,
                p.age,
                p.gender,
                p.phone,
                p.email as patient_email,
                p.address,
                p.medical_notes,
                p.emergency_contact
            FROM appointments a
            JOIN patients p ON a.patient_id = p.id
            WHERE a.doctor_id = ?
            ORDER BY a.appointment_date DESC, a.time_slot ASC
        `;

        const [appointments] = await db.query(query, [doctorId]);

        res.json({ success: true, data: appointments });

    } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        res.status(500).json({ success: false, message: "Error fetching appointments" });
    }
});





app.post('/chat', async (req, res) => {
    try {
        const { history } = req.body;
        const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";
        const API_KEY = process.env.GEMINI_API_KEY;

        if (!API_KEY) {
            console.error("Chatbot Error: GEMINI_API_KEY is missing in process.env");
            return res.status(500).json({ success: false, message: "Server Error: API Key not configured" });
        }

        // Standard Gemini Multi-turn format
        const payload = {
            contents: history.map(item => ({
                role: item.role === "user" ? "user" : "model",
                parts: [{ text: item.text }]
            }))
        };

        const response = await fetch(`${URL}${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.error) {
            console.error("Gemini API Error Detail:", JSON.stringify(data.error, null, 2));
            return res.status(response.status).json({
                success: false,
                message: "Gemini API Error",
                detail: data.error.message
            });
        }

        if (data.candidates && data.candidates.length > 0) {
            res.json({ success: true, reply: data.candidates[0].content.parts[0].text });
        } else {
            console.error("Gemini API Error: No candidates in response", data);
            res.status(500).json({ success: false, message: "No response from AI" });
        }

    } catch (error) {
        console.error("Chatbot Express Route Error:", error);
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
});


// Health Check Route

app.get('/', (req, res) => {
    res.status(200).json({ message: "Backend is running", status: "OK" });
});

const PORT = process.env.PORT || 5000;

// Only runs when NOT in Vercel/Production environment (for local dev)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Backend running on port ${PORT}`);
    });
}

export default app;



