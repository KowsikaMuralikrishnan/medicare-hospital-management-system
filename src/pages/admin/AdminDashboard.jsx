import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Package, DollarSign, TrendingUp, Calendar, ArrowRight, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const { user, getDoctors, getAllPatients } = useAuth();
  const { appointments, invoices, inventory } = useData();

  const doctors = getDoctors();
  const patients = getAllPatients();
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);
  const pendingRevenue = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.total, 0);
  const lowStockItems = inventory.filter(i => i.stock <= i.reorderLevel);
  const totalAppointments = appointments.length;
  const completedAppts = appointments.filter(a => a.status === 'completed').length;

  // Simulated monthly data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const monthlyRevenue = [1200, 1850, 2100, 1750, 2300, totalRevenue];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard 📊</h1>
          <p className="text-white/70">Clinic overview and performance metrics</p>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-success-500', bg: 'bg-success-50', sub: `$${pendingRevenue} pending` },
          { label: 'Total Patients', value: patients.length, icon: Users, color: 'text-accent-500', bg: 'bg-accent-50', sub: 'Registered' },
          { label: 'Doctors', value: doctors.length, icon: Users, color: 'text-primary-500', bg: 'bg-primary-50', sub: 'Active staff' },
          { label: 'Appointments', value: totalAppointments, icon: Calendar, color: 'text-warning-500', bg: 'bg-warning-50', sub: `${completedAppts} completed` },
        ].map(stat => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-success-400" />
            </div>
            <p className="text-2xl font-bold text-surface-800">{stat.value}</p>
            <p className="text-sm text-surface-400">{stat.label}</p>
            <p className="text-xs text-surface-300 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart (Simulated) */}
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-surface-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-500" /> Revenue Trend
            </h2>
            <div className="flex items-end gap-3 h-40 px-2">
              {months.map((m, i) => {
                const maxRev = Math.max(...monthlyRevenue);
                const h = (monthlyRevenue[i] / maxRev) * 100;
                return (
                  <div key={m} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-semibold text-surface-500">${monthlyRevenue[i]}</span>
                    <div className={`w-full rounded-t-lg bg-gradient-to-t from-purple-500 to-purple-300 transition-all duration-500`} style={{ height: `${h}%` }} />
                    <span className="text-[10px] text-surface-400">{m}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning-500" /> Low Stock Alerts
              </h2>
              <Link to="/admin/inventory" className="text-sm text-purple-600 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {lowStockItems.length === 0 ? (
              <p className="text-sm text-surface-400 text-center py-4">All items are well stocked 🎉</p>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-warning-50 rounded-xl border border-warning-100">
                    <Package className="w-5 h-5 text-warning-500" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-surface-800">{item.name}</p>
                      <p className="text-xs text-surface-400">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-danger-500">{item.stock} left</p>
                      <p className="text-[10px] text-surface-400">Reorder at {item.reorderLevel}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Doctor Performance */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-800">Doctor Overview</h2>
            <Link to="/admin/doctors" className="text-sm text-purple-600 font-medium flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Doctor</th><th>Specialization</th><th>Experience</th><th>Appointments</th><th>Status</th></tr>
              </thead>
              <tbody>
                {doctors.map(doc => {
                  const docAppts = appointments.filter(a => a.doctorId === doc.id).length;
                  return (
                    <tr key={doc.id}>
                      <td className="font-medium text-surface-800">{doc.name}</td>
                      <td><span className="badge badge-info">{doc.specialization}</span></td>
                      <td>{doc.experience} years</td>
                      <td>{docAppts}</td>
                      <td><span className="badge badge-success">Active</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
