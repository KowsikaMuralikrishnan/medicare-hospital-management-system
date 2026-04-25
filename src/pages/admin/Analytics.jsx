import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { BarChart3, TrendingUp, Users, Calendar, DollarSign, Activity } from 'lucide-react';

export default function Analytics() {
  const { getDoctors, getAllPatients } = useAuth();
  const { appointments, invoices, inventory } = useData();

  const doctors = getDoctors();
  const patients = getAllPatients();
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
  const completedAppts = appointments.filter(a => a.status === 'completed').length;
  const cancelledAppts = appointments.filter(a => a.status === 'cancelled').length;
  const totalStock = inventory.reduce((s, i) => s + i.stock, 0);

  // Specialty distribution
  const specMap = {};
  doctors.forEach(d => { specMap[d.specialization] = (specMap[d.specialization] || 0) + 1; });

  // Revenue by method
  const methodMap = {};
  invoices.filter(i => i.status === 'paid').forEach(i => { methodMap[i.paymentMethod || 'Cash'] = (methodMap[i.paymentMethod || 'Cash'] || 0) + i.total; });

  const colors = ['bg-primary-400', 'bg-accent-400', 'bg-warning-400', 'bg-purple-400', 'bg-danger-400', 'bg-success-400'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-800">Analytics & Reports</h1>
        <p className="text-surface-400 mt-1">Clinic performance insights and statistics</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-success-500', bg: 'bg-success-50' },
          { label: 'Total Patients', value: patients.length, icon: Users, color: 'text-accent-500', bg: 'bg-accent-50' },
          { label: 'Completed Visits', value: completedAppts, icon: Activity, color: 'text-primary-500', bg: 'bg-primary-50' },
          { label: 'Cancelled', value: cancelledAppts, icon: Calendar, color: 'text-danger-500', bg: 'bg-danger-50' },
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
        {/* Appointment Status */}
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-surface-800 mb-4">Appointment Status</h2>
            <div className="space-y-3">
              {[
                { label: 'Completed', count: completedAppts, total: appointments.length, color: 'bg-success-400' },
                { label: 'Confirmed', count: appointments.filter(a => a.status === 'confirmed').length, total: appointments.length, color: 'bg-accent-400' },
                { label: 'Pending', count: appointments.filter(a => a.status === 'pending').length, total: appointments.length, color: 'bg-warning-400' },
                { label: 'Cancelled', count: cancelledAppts, total: appointments.length, color: 'bg-danger-400' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-surface-700">{item.label}</span>
                    <span className="text-surface-400">{item.count} ({appointments.length > 0 ? Math.round((item.count / appointments.length) * 100) : 0}%)</span>
                  </div>
                  <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${appointments.length > 0 ? (item.count / appointments.length) * 100 : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor Distribution */}
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-surface-800 mb-4">Doctors by Specialization</h2>
            <div className="space-y-3">
              {Object.entries(specMap).map(([spec, count], i) => (
                <div key={spec} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${colors[i % colors.length]}`} />
                    <span className="text-sm font-medium text-surface-700">{spec}</span>
                  </div>
                  <span className="text-sm font-bold text-surface-800">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue by Payment Method */}
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-surface-800 mb-4">Revenue by Payment Method</h2>
            <div className="space-y-3">
              {Object.entries(methodMap).map(([method, amount], i) => (
                <div key={method} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${colors[i % colors.length]}`} />
                    <span className="text-sm font-medium text-surface-700">{method}</span>
                  </div>
                  <span className="text-sm font-bold text-surface-800">${amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inventory Stats */}
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-surface-800 mb-4">Inventory Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-surface-800">{inventory.length}</p>
                <p className="text-sm text-surface-400">Total Items</p>
              </div>
              <div className="p-4 bg-surface-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-surface-800">{totalStock}</p>
                <p className="text-sm text-surface-400">Total Units</p>
              </div>
              <div className="p-4 bg-warning-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-warning-600">{inventory.filter(i => i.stock <= i.reorderLevel).length}</p>
                <p className="text-sm text-warning-500">Low Stock</p>
              </div>
              <div className="p-4 bg-surface-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-surface-800">${inventory.reduce((s, i) => s + i.price * i.stock, 0).toFixed(0)}</p>
                <p className="text-sm text-surface-400">Stock Value</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
