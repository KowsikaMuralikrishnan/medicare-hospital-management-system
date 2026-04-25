import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { User, Stethoscope, Pill, Plus, X, Save, AlertTriangle, Calendar, FileText, Trash2 } from 'lucide-react';

export default function ConsultationDesk() {
  const { user, getAllPatients } = useAuth();
  const { getAppointmentsByDoctor, updateAppointment, addPrescription, getPatientRecord, getLabReportsByPatient, getPrescriptionsByPatient } = useData();

  const today = new Date().toISOString().split('T')[0];
  const todayAppts = getAppointmentsByDoctor(user.id, today);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedRecord = selectedAppt ? getPatientRecord(selectedAppt.patientId) : null;
  const patientHistory = selectedAppt ? getPrescriptionsByPatient(selectedAppt.patientId) : [];
  const patientLabs = selectedAppt ? getLabReportsByPatient(selectedAppt.patientId) : [];

  const addMedicine = () => setMedicines(prev => [...prev, { name: '', dosage: '', frequency: '', duration: '' }]);
  const removeMedicine = (i) => setMedicines(prev => prev.filter((_, idx) => idx !== i));
  const updateMedicine = (i, field, value) => setMedicines(prev => prev.map((m, idx) => idx === i ? { ...m, [field]: value } : m));

  const handleSavePrescription = () => {
    if (!diagnosis || medicines.some(m => !m.name)) return;
    addPrescription({
      appointmentId: selectedAppt.id,
      patientId: selectedAppt.patientId,
      patientName: selectedAppt.patientName,
      doctorId: user.id,
      doctorName: user.name,
      diagnosis,
      medicines: medicines.filter(m => m.name),
      notes,
      allergies: selectedRecord?.allergies?.join(', ') || 'None known',
    });
    updateAppointment(selectedAppt.id, { status: 'completed', notes: diagnosis });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedAppt(null);
      setDiagnosis('');
      setNotes('');
      setMedicines([{ name: '', dosage: '', frequency: '', duration: '' }]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-800">Consultation Desk</h1>
        <p className="text-surface-400 mt-1">Select a patient from today's queue to begin consultation</p>
      </div>

      {showSuccess && (
        <div className="p-4 bg-success-50 border border-success-100 rounded-xl flex items-center gap-3 animate-slide-up">
          <Save className="w-5 h-5 text-success-500" />
          <p className="text-sm text-success-700 font-medium">Prescription saved and appointment marked as completed!</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient Queue */}
        <div className="card lg:col-span-1">
          <div className="card-body">
            <h2 className="font-semibold text-surface-800 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-accent-500" /> Today's Queue ({todayAppts.length})
            </h2>
            {todayAppts.length === 0 ? (
              <p className="text-sm text-surface-400 text-center py-4">No patients today</p>
            ) : (
              <div className="space-y-2">
                {todayAppts.map((appt, i) => (
                  <button
                    key={appt.id}
                    onClick={() => { setSelectedAppt(appt); setDiagnosis(''); setNotes(''); setMedicines([{ name: '', dosage: '', frequency: '', duration: '' }]); }}
                    className={`w-full text-left p-3 rounded-xl transition-all ${selectedAppt?.id === appt.id ? 'bg-accent-50 border-2 border-accent-200' : 'bg-surface-50 hover:bg-surface-100 border-2 border-transparent'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${appt.status === 'completed' ? 'bg-success-100 text-success-600' : 'bg-accent-100 text-accent-600'}`}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-surface-800">{appt.patientName}</p>
                        <p className="text-xs text-surface-400">{appt.time} · {appt.reason}</p>
                      </div>
                      <span className={`badge ${appt.status === 'completed' ? 'badge-success' : 'badge-info'} text-[10px]`}>{appt.status}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Consultation Form */}
        <div className="lg:col-span-2">
          {!selectedAppt ? (
            <div className="card">
              <div className="card-body text-center py-16">
                <Stethoscope className="w-16 h-16 text-surface-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-surface-500 mb-1">Select a Patient</h3>
                <p className="text-sm text-surface-400">Choose a patient from the queue to start consultation</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Patient Info */}
              <div className="card">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-surface-800 flex items-center gap-2">
                      <User className="w-4 h-4 text-accent-500" /> Patient Info
                    </h2>
                    <button onClick={() => setSelectedAppt(null)} className="p-1 hover:bg-surface-100 rounded-lg">
                      <X className="w-4 h-4 text-surface-400" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-2 bg-surface-50 rounded-lg">
                      <p className="text-[10px] text-surface-400 uppercase">Name</p>
                      <p className="text-sm font-semibold text-surface-800">{selectedAppt.patientName}</p>
                    </div>
                    {selectedRecord && (
                      <>
                        <div className="p-2 bg-surface-50 rounded-lg">
                          <p className="text-[10px] text-surface-400 uppercase">Blood Group</p>
                          <p className="text-sm font-semibold text-surface-800">{selectedRecord.bloodGroup}</p>
                        </div>
                        <div className="p-2 bg-surface-50 rounded-lg">
                          <p className="text-[10px] text-surface-400 uppercase">Age / DOB</p>
                          <p className="text-sm font-semibold text-surface-800">{selectedRecord.dob}</p>
                        </div>
                        <div className="p-2 bg-surface-50 rounded-lg">
                          <p className="text-[10px] text-surface-400 uppercase">Gender</p>
                          <p className="text-sm font-semibold text-surface-800">{selectedRecord.gender}</p>
                        </div>
                      </>
                    )}
                  </div>
                  {selectedRecord?.allergies?.length > 0 && (
                    <div className="mt-3 p-2 bg-warning-50 border border-warning-100 rounded-lg flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning-500 shrink-0" />
                      <span className="text-xs text-warning-700"><strong>Allergies:</strong> {selectedRecord.allergies.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Diagnosis & Prescription */}
              {selectedAppt.status !== 'completed' ? (
                <div className="card">
                  <div className="card-body space-y-4">
                    <h2 className="font-semibold text-surface-800 flex items-center gap-2">
                      <Pill className="w-4 h-4 text-accent-500" /> Write Prescription
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-surface-600 mb-1.5">Diagnosis *</label>
                      <textarea value={diagnosis} onChange={e => setDiagnosis(e.target.value)} placeholder="Enter diagnosis..." className="input min-h-[60px] resize-none" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-surface-600">Medicines *</label>
                        <button onClick={addMedicine} className="btn btn-secondary btn-sm"><Plus className="w-3 h-3" /> Add</button>
                      </div>
                      <div className="space-y-2">
                        {medicines.map((med, i) => (
                          <div key={i} className="grid grid-cols-5 gap-2 items-center">
                            <input value={med.name} onChange={e => updateMedicine(i, 'name', e.target.value)} placeholder="Medicine name" className="input col-span-1 text-xs" />
                            <input value={med.dosage} onChange={e => updateMedicine(i, 'dosage', e.target.value)} placeholder="Dosage" className="input text-xs" />
                            <input value={med.frequency} onChange={e => updateMedicine(i, 'frequency', e.target.value)} placeholder="Frequency" className="input text-xs" />
                            <input value={med.duration} onChange={e => updateMedicine(i, 'duration', e.target.value)} placeholder="Duration" className="input text-xs" />
                            {medicines.length > 1 && (
                              <button onClick={() => removeMedicine(i)} className="p-1.5 hover:bg-danger-50 rounded-lg transition-colors">
                                <Trash2 className="w-3.5 h-3.5 text-danger-400" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-600 mb-1.5">Additional Notes</label>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any additional notes..." className="input min-h-[50px] resize-none" />
                    </div>

                    <button onClick={handleSavePrescription} disabled={!diagnosis || medicines.every(m => !m.name)} className="btn btn-accent w-full justify-center disabled:opacity-50">
                      <Save className="w-4 h-4" /> Save Prescription & Complete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="card-body text-center py-8">
                    <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Save className="w-6 h-6 text-success-500" />
                    </div>
                    <p className="font-semibold text-surface-700">Consultation Completed</p>
                    <p className="text-sm text-surface-400">This appointment has been finalized</p>
                  </div>
                </div>
              )}

              {/* Patient History */}
              {patientHistory.length > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h2 className="font-semibold text-surface-800 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-accent-500" /> Previous Prescriptions
                    </h2>
                    <div className="space-y-2">
                      {patientHistory.slice(0, 3).map(rx => (
                        <div key={rx.id} className="p-3 bg-surface-50 rounded-xl">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-surface-700">{rx.diagnosis}</span>
                            <span className="text-xs text-surface-400">{rx.date}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {rx.medicines.map((m, i) => <span key={i} className="badge badge-neutral text-[10px]">{m.name}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
