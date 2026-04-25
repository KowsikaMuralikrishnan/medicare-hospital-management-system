import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { UserPlus, CheckCircle, User, Mail, Phone, Droplets, MapPin } from 'lucide-react';

export default function PatientRegistration() {
  const { register, getDoctors } = useAuth();
  const { addToQueue } = useData();
  const [form, setForm] = useState({ name: '', email: '', phone: '', bloodGroup: '', gender: '', address: '', doctorId: '' });
  const [success, setSuccess] = useState(null);

  const doctors = getDoctors();
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    const email = form.email || `walkin_${Date.now()}@medicare.com`;
    const result = register({
      name: form.name,
      email: email,
      password: 'walkin123',
      phone: form.phone,
      role: 'patient',
    });

    if (result.success) {
      const doctor = doctors.find(d => d.id === form.doctorId);
      const queueEntry = addToQueue({
        patientId: result.user.id,
        patientName: form.name,
        doctorId: form.doctorId || doctors[0]?.id,
        doctorName: doctor?.name || doctors[0]?.name || 'Unassigned',
        type: 'walk-in',
      });
      setSuccess({ patient: form.name, token: queueEntry.tokenNo });
      setForm({ name: '', email: '', phone: '', bloodGroup: '', gender: '', address: '', doctorId: '' });
      // Logout the receptionist back into their session
      // In a real app this would be handled differently
    } else {
      // If email exists, just add to queue
      const doctor = doctors.find(d => d.id === form.doctorId);
      const queueEntry = addToQueue({
        patientId: 'walkin_' + Date.now(),
        patientName: form.name,
        doctorId: form.doctorId || doctors[0]?.id,
        doctorName: doctor?.name || doctors[0]?.name || 'Unassigned',
        type: 'walk-in',
      });
      setSuccess({ patient: form.name, token: queueEntry.tokenNo });
      setForm({ name: '', email: '', phone: '', bloodGroup: '', gender: '', address: '', doctorId: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-800">Register Walk-in Patient</h1>
        <p className="text-surface-400 mt-1">Register a new walk-in patient and generate a queue token</p>
      </div>

      {success && (
        <div className="card bg-success-50 border-success-200 animate-slide-up">
          <div className="card-body text-center py-8">
            <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-success-700 mb-1">Patient Registered!</h3>
            <p className="text-success-600"><strong>{success.patient}</strong> has been added to the queue.</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white rounded-xl px-6 py-3 shadow-sm">
              <span className="text-sm text-surface-500">Token Number:</span>
              <span className="text-3xl font-bold text-primary-600">#{success.token}</span>
            </div>
            <button onClick={() => setSuccess(null)} className="btn btn-primary mt-4">Register Another</button>
          </div>
        </div>
      )}

      {!success && (
        <div className="card max-w-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-600 mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Patient name" className="input pl-10" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-600 mb-1.5">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="555-0100" className="input pl-10" required />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1.5">Email (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="patient@example.com" className="input pl-10" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-600 mb-1.5">Blood Group</label>
                  <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="input">
                    <option value="">Select</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-600 mb-1.5">Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange} className="input">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1.5">Assign Doctor</label>
                <select name="doctorId" value={form.doctorId} onChange={handleChange} className="input">
                  <option value="">Select doctor</option>
                  {doctors.map(d => <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1.5">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-surface-400" />
                  <textarea name="address" value={form.address} onChange={handleChange} placeholder="Patient address" className="input pl-10 min-h-[60px] resize-none" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full justify-center btn-lg">
                <UserPlus className="w-4 h-4" /> Register & Generate Token
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
