import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { Users, Calendar, FileText, Clock, Stethoscope, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { getAppointmentsByDoctor, prescriptions, labReports } = useData();

  const today = new Date().toISOString().split('T')[0];
  const todayAppts = getAppointmentsByDoctor(user.id, today);
  const allAppts = getAppointmentsByDoctor(user.id);

  const inProgress = todayAppts.filter(a => a.status === 'confirmed');
  const completed = todayAppts.filter(a => a.status === 'completed');
  const myPrescriptions = prescriptions.filter(p => p.doctorId === user.id);
  const pendingLabs = labReports.filter(r => r.doctorId === user.id && r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-accent-500 to-accent-700 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Good {new Date().getHours() < 12 ? 'Morning' : 'Afternoon'}, {user.name}! 🩺</h1>
          <p className="text-white/70">You have <span className="font-semibold text-white">{inProgress.length}</span> patients waiting today.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Queue", value: todayAppts.length, icon: Users, color: 'text-accent-500', bg: 'bg-accent-50' },
          { label: 'In Progress', value: inProgress.length, icon: Clock, color: 'text-warning-500', bg: 'bg-warning-50' },
          { label: 'Completed', value: completed.length, icon: CheckCircle, color: 'text-success-500', bg: 'bg-success-50' },
          { label: 'Pending Labs', value: pendingLabs.length, icon: AlertCircle, color: 'text-danger-500', bg: 'bg-danger-50' },
        ].map(stat => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-surface-800">{stat.value}</p>
            <p className="text-sm text-surface-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Patients */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-800">Today's Patient Queue</h2>
              <Link to="/doctor/consultation" className="text-sm text-accent-600 font-medium flex items-center gap-1">
                Start Consultation <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {todayAppts.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-10 h-10 text-surface-200 mx-auto mb-2" />
                <p className="text-sm text-surface-400">No patients scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayAppts.map((appt, i) => (
                  <div key={appt.id} className="flex items-center gap-4 p-3 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-400 to-primary-400 flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-surface-800">{appt.patientName}</p>
                      <p className="text-xs text-surface-400">{appt.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-surface-700">{appt.time}</p>
                      <span className={`badge ${appt.status === 'completed' ? 'badge-success' : 'badge-info'} text-[10px]`}>{appt.status}</span>
                    </div>
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
              <Link to="/doctor/prescriptions" className="text-sm text-accent-600 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {myPrescriptions.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-surface-200 mx-auto mb-2" />
                <p className="text-sm text-surface-400">No prescriptions written</p>
              </div>
            ) : (
              <div className="space-y-3">
                {myPrescriptions.slice(0, 4).map(rx => (
                  <div key={rx.id} className="p-3 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-surface-800">{rx.patientName}</p>
                      <span className="text-xs text-surface-400">{rx.date}</span>
                    </div>
                    <p className="text-xs text-surface-500">{rx.diagnosis}</p>
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
              { to: '/doctor/consultation', label: 'Start Consult', icon: Stethoscope, color: 'from-accent-500 to-accent-600' },
              { to: '/doctor/patients', label: 'Patient Records', icon: Users, color: 'from-primary-500 to-primary-600' },
              { to: '/doctor/lab-requests', label: 'Lab Requests', icon: FileText, color: 'from-warning-500 to-warning-600' },
              { to: '/doctor/prescriptions', label: 'Prescriptions', icon: FileText, color: 'from-purple-500 to-purple-600' },
            ].map(action => (
              <Link key={action.to} to={action.to} className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-surface-100 hover:border-accent-200 hover:shadow-md transition-all">
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
