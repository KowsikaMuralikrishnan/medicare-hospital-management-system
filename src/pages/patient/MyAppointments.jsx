import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Calendar, Clock, Stethoscope, X, Edit2, Trash2, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const statusConfig = {
  pending: { badge: 'badge-warning', icon: Clock, label: 'Pending' },
  confirmed: { badge: 'badge-success', icon: CheckCircle, label: 'Confirmed' },
  completed: { badge: 'badge-info', icon: CheckCircle, label: 'Completed' },
  cancelled: { badge: 'badge-danger', icon: XCircle, label: 'Cancelled' },
};

export default function MyAppointments() {
  const { user } = useAuth();
  const { getAppointmentsByPatient, cancelAppointment, updateAppointment, getAvailableSlots } = useData();
  const [filter, setFilter] = useState('all');
  const [rescheduleAppt, setRescheduleAppt] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const appointments = getAppointmentsByPatient(user.id);
  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);
  const today = new Date().toISOString().split('T')[0];

  const handleReschedule = () => {
    if (!newDate || !newTime) return;
    updateAppointment(rescheduleAppt.id, { date: newDate, time: newTime, status: 'pending' });
    setRescheduleAppt(null);
    setNewDate('');
    setNewTime('');
  };

  const slots = rescheduleAppt && newDate ? getAvailableSlots(rescheduleAppt.doctorId, newDate) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-800">My Appointments</h1>
        <p className="text-surface-400 mt-1">Manage your upcoming and past appointments</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? 'bg-primary-500 text-white shadow-sm' : 'bg-white text-surface-500 border border-surface-200 hover:border-primary-200'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== 'all' && <span className="ml-1.5 text-xs opacity-70">({appointments.filter(a => a.status === f).length})</span>}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      {filtered.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <Calendar className="w-12 h-12 text-surface-200 mx-auto mb-3" />
            <p className="text-surface-500">No appointments found</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(appt => {
            const config = statusConfig[appt.status];
            const isFuture = appt.date >= today && appt.status !== 'cancelled' && appt.status !== 'completed';
            return (
              <div key={appt.id} className="card animate-fade-in">
                <div className="card-body">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center shrink-0">
                        <Stethoscope className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-surface-800">{appt.doctorName}</h3>
                          <span className={`badge ${config.badge}`}>{config.label}</span>
                        </div>
                        <p className="text-sm text-surface-400">{appt.specialization}</p>
                        <p className="text-xs text-surface-400 mt-1">{appt.reason}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 text-sm text-surface-700">
                          <Calendar className="w-3.5 h-3.5 text-surface-400" />
                          {appt.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-surface-500 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-surface-400" />
                          {appt.time}
                        </div>
                      </div>

                      {isFuture && (
                        <div className="flex gap-2">
                          <button onClick={() => { setRescheduleAppt(appt); setNewDate(''); setNewTime(''); }} className="btn btn-secondary btn-sm" title="Reschedule">
                            <Edit2 className="w-3.5 h-3.5" /> Reschedule
                          </button>
                          <button onClick={() => cancelAppointment(appt.id)} className="btn btn-danger btn-sm" title="Cancel">
                            <Trash2 className="w-3.5 h-3.5" /> Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {appt.notes && (
                    <div className="mt-3 p-3 bg-surface-50 rounded-xl">
                      <p className="text-xs text-surface-400 font-medium mb-1">Doctor's Notes</p>
                      <p className="text-sm text-surface-600">{appt.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleAppt && (
        <div className="modal-overlay" onClick={() => setRescheduleAppt(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-bold text-surface-800">Reschedule Appointment</h3>
              <button onClick={() => setRescheduleAppt(null)} className="p-1 hover:bg-surface-100 rounded-lg"><X className="w-5 h-5 text-surface-400" /></button>
            </div>
            <div className="modal-body space-y-4">
              <div className="p-3 bg-surface-50 rounded-xl">
                <p className="font-semibold text-surface-800">{rescheduleAppt.doctorName}</p>
                <p className="text-sm text-surface-400">Current: {rescheduleAppt.date} at {rescheduleAppt.time}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1.5">New Date</label>
                <input type="date" value={newDate} min={today} onChange={e => { setNewDate(e.target.value); setNewTime(''); }} className="input" />
              </div>
              {newDate && (
                <div>
                  <label className="block text-sm font-medium text-surface-600 mb-1.5">New Time Slot</label>
                  {slots.length === 0 ? (
                    <p className="text-sm text-danger-500">No available slots</p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {slots.map(slot => (
                        <button key={slot} onClick={() => setNewTime(slot)} className={`p-2 rounded-lg text-xs font-medium transition-all ${newTime === slot ? 'bg-primary-500 text-white' : 'bg-surface-100 text-surface-600 hover:bg-primary-50'}`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button onClick={() => setRescheduleAppt(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleReschedule} disabled={!newDate || !newTime} className="btn btn-primary disabled:opacity-50">Confirm Reschedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
