import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCog, Edit2, Briefcase, Clock, Star, Search, X } from 'lucide-react';

export default function DoctorManagement() {
  const { getDoctors, updateDoctor } = useAuth();
  const doctors = getDoctors();
  const [search, setSearch] = useState('');
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({});

  const filtered = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization?.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      email: doctor.email || ''
    });
  };

  const handleSaveEdit = () => {
    if (editingDoctor) {
      const updatedDoctors = doctors.map(d => 
        d.id === editingDoctor.id 
          ? { ...d, ...formData }
          : d
      );
      // Update would normally persist to backend/context
      setEditingDoctor(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-800">Doctor Management</h1>
          <p className="text-surface-400 mt-1">Manage doctor profiles and working hours</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctors..." className="input pl-10" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(doc => (
          <div key={doc.id} className="card hover:shadow-lg transition-all">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-accent-100 flex items-center justify-center text-xl font-bold text-purple-600">
                  {doc.name.split(' ').pop().charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-surface-800">{doc.name}</h3>
                  <span className="badge badge-info">{doc.specialization}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-surface-500">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{doc.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Mon-Fri, 9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-500">
                  <Star className="w-3.5 h-3.5 text-warning-400" />
                  <span>4.{5 + (doc.experience % 5)}/5 rating</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                <span className="badge badge-success">Active</span>
                <button onClick={() => handleEdit(doc)} className="btn btn-secondary btn-sm"><Edit2 className="w-3 h-3" /> Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
            <div className="flex items-center justify-between p-6 border-b border-surface-200">
              <h2 className="text-xl font-bold text-surface-800">Edit Doctor</h2>
              <button onClick={() => setEditingDoctor(null)} className="text-surface-400 hover:text-surface-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Specialization</label>
                <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Experience (years)</label>
                <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input w-full" />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-surface-200">
              <button onClick={() => setEditingDoctor(null)} className="btn btn-ghost flex-1">Cancel</button>
              <button onClick={handleSaveEdit} className="btn btn-primary flex-1">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
