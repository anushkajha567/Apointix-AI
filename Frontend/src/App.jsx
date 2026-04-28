import './App.css'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import Home from './Pages/Home'
import About from './Pages/About'
import Appointment from './Pages/Appointment'
import Contact from './Pages/Contact'
import { Route, Router, Routes } from 'react-router-dom'
import Layout from './Component/Layout'
import Timeavailable from './Component/Timeavailable'
import ProfilePage from './Pages/Profilepage'
import DoctorsData from './Pages/DoctorsData'
import AdminDash from './Admin/AdminDash'
import DocProfile from './Doctor/DocProfile'
import PatientData from './Admin/PatientData'
import DoctorsInfo from './Pages/DoctorsInfo'
import Patient from './Pages/Patient'
import AdminDashboard from './Pages/AdminDashboard'
import DoctorDashboard from './Pages/DoctorDashboard'
import PatientDashboard from './Pages/PatientDashboard'
import AppointmentDoc from './Pages/AppointmentDoc'
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/timeavailable' element={<Timeavailable />} />
          <Route path='/doctordata/:id' element={<DoctorsData />} />
          <Route path='/doc-profile' element={<DocProfile />} />
          <Route path='/doctor' element={<DoctorDashboard />}></Route>
          <Route path='/patient' element={<PatientDashboard />}></Route>
          <Route path='/admin' element={<AdminDashboard />}></Route>
          <Route path='/admin/doctors' element={<AdminDash />}></Route>
          <Route path='/PatientData' element={<PatientData />}></Route>
          <Route path='/doctors-info' element={<DoctorsInfo />}></Route>
          <Route path='/patient-registration' element={<Patient />}></Route>
          <Route path='/doctor-appointments' element={<AppointmentDoc />}></Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
