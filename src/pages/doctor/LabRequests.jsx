import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FlaskConical, Plus, X, Send, CheckCircle, Clock } from 'lucide-react';

export default function LabRequests() {
  const { user, getAllPatients } = useAuth();
  const { labReports, requestLabTest, updateLabReport } = useData();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patientId: '', testName: '', type: 'lab' });

  const patients = getAllPatients();
  const myRequests = labReports.filter(r => r.doctorId === user.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === form.patientId);
    if (!patient || !form.testName) return;
    requestLabTest({
      patientId: form.patientId,
      patientName: patient.name,
      doctorId: user.id,
      doctorName: user.name,
      testName: form.testName,
      type: form.type,
    });
    setForm({ patientId: '', testName: '', type: 'lab' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-800">Lab Requests</h1>
          <p className="text-surface-400 mt-1">Request and track lab tests for your patients</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-accent"><Plus className="w-4 h-4" /> New Request</button>
      </div>

      {/* Request Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-bold text-surface-800">New Lab Test Request</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-surface-100 rounded-lg"><X className="w-5 h-5 text-surface-400" /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-600 mb-1.5">Patient *</label>
                  <select value={form.patientId} onChange={e => setForm(prev => ({ ...prev, patientId: e.target.value }))} className="input">
                    <option value="">Select patient</option>
                    {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-600 mb-1.5">Test Name *</label>
                  <input value={form.testName} onChange={e => setForm(prev => ({ ...prev, testName: e.target.value }))} placeholder="e.g. Complete Blood Count" className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-600 mb-1.5">Type</label>
                  <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))} className="input">
                    <option value="lab">Lab Test</option>
                    <option value="imaging">Imaging (X-ray, MRI, etc.)</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-accent"><Send className="w-4 h-4" /> Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Requests List */}
      {myRequests.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <FlaskConical className="w-12 h-12 text-surface-200 mx-auto mb-3" />
            <p className="text-surface-500">No lab requests yet</p>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Patient</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map(r => (
                <tr key={r.id}>
                  <td className="font-medium text-surface-800">{r.testName}</td>
                  <td>{r.patientName}</td>
                  <td><span className={`badge ${r.type === 'imaging' ? 'badge-info' : 'badge-neutral'}`}>{r.type}</span></td>
                  <td>{r.date}</td>
                  <td>
                    <span className={`badge ${r.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                      {r.status === 'completed' ? <><CheckCircle className="w-3 h-3" /> Completed</> : <><Clock className="w-3 h-3" /> Pending</>}
                    </span>
                  </td>
                  <td>
                    {r.status === 'pending' && (
                      <button onClick={() => updateLabReport(r.id, { status: 'completed', result: 'Results within normal range' })} className="btn btn-secondary btn-sm">
                        Mark Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
