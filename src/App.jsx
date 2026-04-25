import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import DashboardLayout from './components/layout/DashboardLayout';

// Home
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import LocationsPage from './pages/LocationsPage';

// Auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Patient
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorListing from './pages/patient/DoctorListing';
import MyAppointments from './pages/patient/MyAppointments';
import MedicalHistory from './pages/patient/MedicalHistory';
import PatientReports from './pages/patient/PatientReports';
import UploadReports from './pages/patient/UploadReports';

// Doctor
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import ConsultationDesk from './pages/doctor/ConsultationDesk';
import PatientRecords from './pages/doctor/PatientRecords';
import LabRequests from './pages/doctor/LabRequests';
import DoctorPrescriptions from './pages/doctor/DoctorPrescriptions';

// Reception
import ReceptionDashboard from './pages/reception/ReceptionDashboard';
import PatientRegistration from './pages/reception/PatientRegistration';
import QueueManagement from './pages/reception/QueueManagement';
import BillingInvoice from './pages/reception/BillingInvoice';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import DoctorManagement from './pages/admin/DoctorManagement';
import PharmacyInventory from './pages/admin/PharmacyInventory';
import Analytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Patient Routes */}
            <Route path="/patient" element={<DashboardLayout allowedRoles={['patient']} />}>
              <Route index element={<PatientDashboard />} />
              <Route path="doctors" element={<DoctorListing />} />
              <Route path="appointments" element={<MyAppointments />} />
              <Route path="history" element={<MedicalHistory />} />
              <Route path="reports" element={<PatientReports />} />
              <Route path="upload" element={<UploadReports />} />
            </Route>

            {/* Doctor Routes */}
            <Route path="/doctor" element={<DashboardLayout allowedRoles={['doctor']} />}>
              <Route index element={<DoctorDashboard />} />
              <Route path="consultation" element={<ConsultationDesk />} />
              <Route path="patients" element={<PatientRecords />} />
              <Route path="lab-requests" element={<LabRequests />} />
              <Route path="prescriptions" element={<DoctorPrescriptions />} />
            </Route>

            {/* Reception Routes */}
            <Route path="/reception" element={<DashboardLayout allowedRoles={['receptionist']} />}>
              <Route index element={<ReceptionDashboard />} />
              <Route path="register" element={<PatientRegistration />} />
              <Route path="queue" element={<QueueManagement />} />
              <Route path="billing" element={<BillingInvoice />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout allowedRoles={['admin']} />}>
              <Route index element={<AdminDashboard />} />
              <Route path="doctors" element={<DoctorManagement />} />
              <Route path="inventory" element={<PharmacyInventory />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
