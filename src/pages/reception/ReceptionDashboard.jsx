import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { Users, ListOrdered, Receipt, UserPlus, Clock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export default function ReceptionDashboard() {
  const { user } = useAuth();
  const { queue, appointments, invoices } = useData();

  const today = new Date().toISOString().split('T')[0];
  const waiting = queue.filter(q => q.status === 'waiting');
  const inProgress = queue.filter(q => q.status === 'in-progress');
  const todayAppts = appointments.filter(a => a.date === today && a.status !== 'cancelled');
  const pendingInvoices = invoices.filter(i => i.status === 'pending');
  const todayRevenue = invoices.filter(i => i.date === today && i.status === 'paid').reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-warning-400 to-orange-500 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Reception Dashboard 🏥</h1>
          <p className="text-white/80">
            <span className="font-semibold">{waiting.length}</span> patients waiting · <span className="font-semibold">{inProgress.length}</span> in progress
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'In Queue', value: queue.length, icon: ListOrdered, color: 'text-warning-500', bg: 'bg-warning-50' },
          { label: "Today's Appointments", value: todayAppts.length, icon: Clock, color: 'text-accent-500', bg: 'bg-accent-50' },
          { label: 'Pending Bills', value: pendingInvoices.length, icon: AlertCircle, color: 'text-danger-500', bg: 'bg-danger-50' },
          { label: "Today's Revenue", value: `$${todayRevenue}`, icon: Receipt, color: 'text-success-500', bg: 'bg-success-50' },
        ].map(stat => (
          <div key={stat.label} className="stat-card">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-surface-800">{stat.value}</p>
            <p className="text-sm text-surface-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Current Queue */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-800">Current Queue</h2>
              <Link to="/reception/queue" className="text-sm text-warning-600 font-medium flex items-center gap-1">
                Manage <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {queue.length === 0 ? (
              <p className="text-sm text-surface-400 text-center py-4">No patients in queue</p>
            ) : (
              <div className="space-y-2">
                {queue.map(q => (
                  <div key={q.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${q.status === 'in-progress' ? 'bg-warning-100 text-warning-600' : 'bg-surface-200 text-surface-600'}`}>
                      #{q.tokenNo}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-surface-800">{q.patientName}</p>
                      <p className="text-xs text-surface-400">{q.doctorName} · {q.checkInTime}</p>
                    </div>
                    <span className={`badge ${q.status === 'in-progress' ? 'badge-warning' : q.status === 'waiting' ? 'badge-info' : 'badge-success'}`}>{q.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-surface-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { to: '/reception/register', label: 'Register Patient', icon: UserPlus, color: 'from-primary-500 to-primary-600' },
                { to: '/reception/queue', label: 'Queue Management', icon: ListOrdered, color: 'from-warning-500 to-warning-600' },
                { to: '/reception/billing', label: 'Create Invoice', icon: Receipt, color: 'from-accent-500 to-accent-600' },
              ].map(action => (
                <Link key={action.to} to={action.to} className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-surface-100 hover:border-warning-200 hover:shadow-md transition-all">
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
    </div>
  );
}
