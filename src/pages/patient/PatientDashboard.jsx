import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Stethoscope, Clock, Activity, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';

export default function PatientDashboard() {
  const { user } = useAuth();
  const { getAppointmentsByPatient, getPrescriptionsByPatient, getLabReportsByPatient } = useData();

  const appointments = getAppointmentsByPatient(user.id);
  const prescriptions = getPrescriptionsByPatient(user.id);
  const labReports = getLabReportsByPatient(user.id);

  const upcoming = appointments.filter(a => a.status === 'confirmed' || a.status === 'pending');
  const completed = appointments.filter(a => a.status === 'completed');
  const pendingReports = labReports.filter(r => r.status === 'pending');

  const today = new Date().toISOString().split('T')[0];
  const todayAppts = appointments.filter(a => a.date === today && a.status !== 'cancelled');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl gradient-hero p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-white/70 text-sm md:text-base">Here's what's happening with your health today.</p>
          {todayAppts.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">You have {todayAppts.length} appointment(s) today</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming', value: upcoming.length, icon: Calendar, color: 'text-primary-500', bg: 'bg-primary-50', link: '/patient/appointments' },
          { label: 'Completed', value: completed.length, icon: Activity, color: 'text-accent-500', bg: 'bg-accent-50', link: '/patient/history' },
          { label: 'Prescriptions', value: prescriptions.length, icon: FileText, color: 'text-warning-500', bg: 'bg-warning-50', link: '/patient/history' },
          { label: 'Pending Reports', value: pendingReports.length, icon: AlertCircle, color: 'text-danger-500', bg: 'bg-danger-50', link: '/patient/reports' },
        ].map(stat => (
          <Link key={stat.label} to={stat.link} className="stat-card group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <ArrowRight className="w-4 h-4 text-surface-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-2xl font-bold text-surface-800">{stat.value}</p>
            <p className="text-sm text-surface-400">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-800">Upcoming Appointments</h2>
              <Link to="/patient/appointments" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {upcoming.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-10 h-10 text-surface-200 mx-auto mb-2" />
                <p className="text-sm text-surface-400">No upcoming appointments</p>
                <Link to="/patient/doctors" className="btn btn-primary btn-sm mt-3">Book Now</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.slice(0, 3).map(appt => (
                  <div key={appt.id} className="flex items-center gap-4 p-3 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-surface-800 truncate">{appt.doctorName}</p>
                      <p className="text-xs text-surface-400">{appt.specialization}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-surface-700">{appt.date}</p>
                      <p className="text-xs text-surface-400">{appt.time}</p>
                    </div>
                    <span className={`badge ${appt.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                      {appt.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Prescriptions */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-800">Recent Prescriptions</h2>
              <Link to="/patient/history" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {prescriptions.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-surface-200 mx-auto mb-2" />
                <p className="text-sm text-surface-400">No prescriptions yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {prescriptions.slice(0, 3).map(rx => (
                  <div key={rx.id} className="p-3 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-surface-800">{rx.doctorName}</p>
                      <span className="text-xs text-surface-400">{rx.date}</span>
                    </div>
                    <p className="text-xs text-surface-500 mb-2">{rx.diagnosis}</p>
                    <div className="flex flex-wrap gap-1">
                      {rx.medicines.slice(0, 3).map((med, i) => (
                        <span key={i} className="badge badge-neutral text-[10px]">{med.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-surface-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { to: '/patient/doctors', label: 'Find Doctors', icon: Stethoscope, color: 'from-primary-500 to-primary-600' },
              { to: '/patient/appointments', label: 'Appointments', icon: Calendar, color: 'from-accent-500 to-accent-600' },
              { to: '/patient/history', label: 'Medical History', icon: Activity, color: 'from-warning-500 to-warning-600' },
              { to: '/patient/reports', label: 'Lab Reports', icon: FileText, color: 'from-purple-500 to-purple-600' },
            ].map(action => (
              <Link key={action.to} to={action.to} className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-surface-100 hover:border-primary-200 hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-surface-600">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
