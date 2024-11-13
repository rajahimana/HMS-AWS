// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import PatientList from './PatientList.jsx';
import PatientRegistration from './PatientRegistration.jsx';
import AppointmentList from './AppointmentList.jsx';
import AppointmentBooking from './AppointmentBooking.jsx';
import InsuranceVerification from './InsuranceVerification.jsx';
import BillingOverview from './BillingOverview.jsx';
import Mainpage from './Mainpage.jsx';
import Login from './Login.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Mainpage" element={<Mainpage />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/register" element={<PatientRegistration />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/appointments/book" element={<AppointmentBooking />} />
        <Route path="/insurance" element={<InsuranceVerification />} />
        <Route path="/billing" element={<BillingOverview />} />
      </Routes>
    </Router>
  );
}

export default App;
