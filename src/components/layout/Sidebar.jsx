import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Calendar, Users, Stethoscope, FileText, ClipboardList,
  Package, BarChart3, UserCog, Receipt, Bell, Heart, Activity, FlaskConical,
  Upload, UserPlus, ListOrdered, DollarSign, Settings
} from 'lucide-react';

const roleMenus = {
  patient: [
    { to: '/patient', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/patient/doctors', icon: Stethoscope, label: 'Find Doctors' },
    { to: '/patient/appointments', icon: Calendar, label: 'My Appointments' },
    { to: '/patient/history', icon: Activity, label: 'Medical History' },
    { to: '/patient/reports', icon: FileText, label: 'Reports & Documents' },
    { to: '/patient/upload', icon: Upload, label: 'Upload Reports' },
  ],
  doctor: [
    { to: '/doctor', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/doctor/consultation', icon: Stethoscope, label: 'Consultation Desk' },
    { to: '/doctor/patients', icon: Users, label: 'Patient Records' },
    { to: '/doctor/lab-requests', icon: FlaskConical, label: 'Lab Requests' },
    { to: '/doctor/prescriptions', icon: ClipboardList, label: 'Prescriptions' },
  ],
  receptionist: [
    { to: '/reception', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/reception/register', icon: UserPlus, label: 'Register Patient' },
    { to: '/reception/queue', icon: ListOrdered, label: 'Queue Management' },
    { to: '/reception/billing', icon: Receipt, label: 'Billing & Invoice' },
  ],
  admin: [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/doctors', icon: UserCog, label: 'Manage Doctors' },
    { to: '/admin/inventory', icon: Package, label: 'Pharmacy Inventory' },
    { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ],
};

const roleColors = {
  patient: 'from-primary-500 to-primary-600',
  doctor: 'from-accent-500 to-accent-600',
  receptionist: 'from-warning-500 to-warning-600',
  admin: 'from-purple-500 to-purple-600',
};

const roleLabels = {
  patient: 'Patient Portal',
  doctor: 'Doctor Portal',
  receptionist: 'Reception Desk',
  admin: 'Admin Panel',
};

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  const location = useLocation();
  const menu = roleMenus[user?.role] || [];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={onClose} />
      )}
      <aside className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="sidebar-brand">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColors[user?.role] || 'from-primary-500 to-primary-600'} flex items-center justify-center shadow-lg`}>
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-surface-800">MediCare</h1>
              <p className="text-xs text-surface-400 font-medium">{roleLabels[user?.role] || 'Portal'}</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider px-3 mb-3">Menu</p>
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-surface-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-sm font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-surface-700 truncate">{user?.name}</p>
              <p className="text-xs text-surface-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
