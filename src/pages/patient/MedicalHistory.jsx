import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Activity, FileText, Calendar, Pill, AlertTriangle, User, Droplets, Ruler, Weight } from 'lucide-react';

export default function MedicalHistory() {
  const { user } = useAuth();
  const { getAppointmentsByPatient, getPrescriptionsByPatient, getPatientRecord, getLabReportsByPatient } = useData();

  const appointments = getAppointmentsByPatient(user.id).filter(a => a.status === 'completed');
  const prescriptions = getPrescriptionsByPatient(user.id);
  const record = getPatientRecord(user.id);
  const labReports = getLabReportsByPatient(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-800">Medical History</h1>
        <p className="text-surface-400 mt-1">Your complete medical records and history</p>
      </div>

      {/* Patient Profile Card */}
      {record && (
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-surface-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-500" /> Patient Profile
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Droplets, label: 'Blood Group', value: record.bloodGroup, color: 'text-danger-500', bg: 'bg-danger-50' },
                { icon: Ruler, label: 'Height', value: record.height, color: 'text-accent-500', bg: 'bg-accent-50' },
                { icon: Weight, label: 'Weight', value: record.weight, color: 'text-primary-500', bg: 'bg-primary-50' },
                { icon: User, label: 'Gender', value: record.gender, color: 'text-purple-500', bg: 'bg-purple-50' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
                  <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-surface-400">{item.label}</p>
                    <p className="text-sm font-semibold text-surface-700">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {record.allergies?.length > 0 && (
              <div className="mt-4 p-3 bg-warning-50 border border-warning-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-warning-500" />
                  <span className="text-sm font-semibold text-warning-700">Allergies</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {record.allergies.map(a => <span key={a} className="badge badge-warning">{a}</span>)}
                </div>
              </div>
            )}

            {record.conditions?.length > 0 && (
              <div className="mt-3 p-3 bg-accent-50 border border-accent-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-accent-500" />
                  <span className="text-sm font-semibold text-accent-700">Existing Conditions</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {record.conditions.map(c => <span key={c} className="badge badge-info">{c}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Consultation Timeline */}
      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-surface-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary-500" /> Consultation History
          </h2>
          {appointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-10 h-10 text-surface-200 mx-auto mb-2" />
              <p className="text-sm text-surface-400">No past consultations</p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-surface-100" />
              <div className="space-y-6">
                {appointments.map(appt => {
                  const rx = prescriptions.find(p => p.appointmentId === appt.id);
                  return (
                    <div key={appt.id} className="relative pl-14">
                      <div className="absolute left-4 w-4 h-4 rounded-full bg-primary-500 border-2 border-white shadow" />
                      <div className="p-4 bg-surface-50 rounded-xl hover:bg-surface-100 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-surface-800">{appt.doctorName}</h3>
                            <p className="text-xs text-surface-400">{appt.specialization}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-surface-700">{appt.date}</p>
                            <p className="text-xs text-surface-400">{appt.time}</p>
                          </div>
                        </div>
                        <p className="text-sm text-surface-500 mb-2"><span className="font-medium">Reason:</span> {appt.reason}</p>
                        {appt.notes && <p className="text-sm text-surface-500"><span className="font-medium">Notes:</span> {appt.notes}</p>}

                        {rx && (
                          <div className="mt-3 p-3 bg-white rounded-lg border border-surface-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Pill className="w-4 h-4 text-primary-500" />
                              <span className="text-sm font-semibold text-surface-700">Prescription</span>
                            </div>
                            <p className="text-xs text-surface-500 mb-2">{rx.diagnosis}</p>
                            <div className="space-y-1">
                              {rx.medicines.map((med, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                  <span className="font-medium text-surface-600">{med.name}</span>
                                  <span className="text-surface-400">{med.dosage} · {med.frequency} · {med.duration}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lab Reports */}
      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-surface-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-500" /> Lab Reports
          </h2>
          {labReports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-10 h-10 text-surface-200 mx-auto mb-2" />
              <p className="text-sm text-surface-400">No lab reports</p>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {labReports.map(r => (
                    <tr key={r.id}>
                      <td className="font-medium text-surface-800">{r.testName}</td>
                      <td>{r.doctorName}</td>
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
  );
}
