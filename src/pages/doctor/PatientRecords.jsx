import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Search, User, FileText, Activity, Droplets, AlertTriangle } from 'lucide-react';

export default function PatientRecords() {
  const { getAllPatients } = useAuth();
  const { getPatientRecord, getPrescriptionsByPatient, getLabReportsByPatient } = useData();
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = getAllPatients();
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()));

  const record = selectedPatient ? getPatientRecord(selectedPatient.id) : null;
  const prescriptions = selectedPatient ? getPrescriptionsByPatient(selectedPatient.id) : [];
  const labReports = selectedPatient ? getLabReportsByPatient(selectedPatient.id) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-800">Patient Records</h1>
        <p className="text-surface-400 mt-1">Search and view patient medical records</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="card lg:col-span-1">
          <div className="card-body">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients..." className="input pl-10" />
            </div>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {filtered.map(patient => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${selectedPatient?.id === patient.id ? 'bg-accent-50 border-2 border-accent-200' : 'bg-surface-50 hover:bg-surface-100 border-2 border-transparent'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-xs font-bold">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-800">{patient.name}</p>
                      <p className="text-xs text-surface-400">{patient.email}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-2">
          {!selectedPatient ? (
            <div className="card">
              <div className="card-body text-center py-16">
                <User className="w-16 h-16 text-surface-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-surface-500">Select a Patient</h3>
                <p className="text-sm text-surface-400">Choose a patient to view their records</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Patient Profile */}
              <div className="card">
                <div className="card-body">
                  <h2 className="font-semibold text-surface-800 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-accent-500" /> {selectedPatient.name}
                  </h2>
                  {record ? (
                    <>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {[
                          { label: 'Blood', value: record.bloodGroup },
                          { label: 'Height', value: record.height },
                          { label: 'Weight', value: record.weight },
                          { label: 'Gender', value: record.gender },
                          { label: 'DOB', value: record.dob },
                          { label: 'Phone', value: selectedPatient.phone },
                        ].map(item => (
                          <div key={item.label} className="p-2 bg-surface-50 rounded-lg text-center">
                            <p className="text-[10px] text-surface-400 uppercase">{item.label}</p>
                            <p className="text-xs font-semibold text-surface-700">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      {record.allergies?.length > 0 && (
                        <div className="mt-3 p-2 bg-warning-50 border border-warning-100 rounded-lg flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-warning-500" />
                          <span className="text-xs text-warning-700"><strong>Allergies:</strong> {record.allergies.join(', ')}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-surface-400 italic">No detailed record available</p>
                  )}
                </div>
              </div>

              {/* Prescriptions */}
              <div className="card">
                <div className="card-body">
                  <h2 className="font-semibold text-surface-800 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent-500" /> Prescriptions ({prescriptions.length})
                  </h2>
                  {prescriptions.length === 0 ? (
                    <p className="text-sm text-surface-400 text-center py-4">No prescriptions</p>
                  ) : (
                    <div className="space-y-3">
                      {prescriptions.map(rx => (
                        <div key={rx.id} className="p-3 bg-surface-50 rounded-xl">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-semibold text-surface-800">{rx.diagnosis}</span>
                            <span className="text-xs text-surface-400">{rx.date} · {rx.doctorName}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {rx.medicines.map((m, i) => (
                              <span key={i} className="badge badge-neutral text-[10px]">{m.name} ({m.dosage})</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Lab Reports */}
              <div className="card">
                <div className="card-body">
                  <h2 className="font-semibold text-surface-800 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent-500" /> Lab Reports ({labReports.length})
                  </h2>
                  {labReports.length === 0 ? (
                    <p className="text-sm text-surface-400 text-center py-4">No lab reports</p>
                  ) : (
                    <div className="table-container">
                      <table>
                        <thead><tr><th>Test</th><th>Date</th><th>Status</th><th>Result</th></tr></thead>
                        <tbody>
                          {labReports.map(r => (
                            <tr key={r.id}>
                              <td className="font-medium">{r.testName}</td>
                              <td>{r.date}</td>
                              <td><span className={`badge ${r.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{r.status}</span></td>
                              <td className="max-w-xs truncate">{r.result || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
