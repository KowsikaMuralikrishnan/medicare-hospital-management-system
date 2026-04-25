import { createContext, useContext, useState, useCallback } from 'react';

const DataContext = createContext(null);

const generateId = () => Math.random().toString(36).substr(2, 9);

const today = new Date();
const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 2);
const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
const lastWeek = new Date(today); lastWeek.setDate(today.getDate() - 7);
const twoWeeksAgo = new Date(today); twoWeeksAgo.setDate(today.getDate() - 14);

const fmt = (d) => d.toISOString().split('T')[0];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

const initialAppointments = [
  { id: 'a1', patientId: 'u1', patientName: 'John Patient', doctorId: 'u2', doctorName: 'Dr. Sarah Wilson', specialization: 'Cardiologist', date: fmt(tomorrow), time: '09:00', status: 'confirmed', reason: 'Regular checkup', notes: '' },
  { id: 'a2', patientId: 'u1', patientName: 'John Patient', doctorId: 'u3', doctorName: 'Dr. Michael Chen', specialization: 'Dermatologist', date: fmt(dayAfter), time: '10:30', status: 'pending', reason: 'Skin rash consultation', notes: '' },
  { id: 'a3', patientId: 'u12', patientName: 'Alice Johnson', doctorId: 'u2', doctorName: 'Dr. Sarah Wilson', specialization: 'Cardiologist', date: fmt(today), time: '09:30', status: 'confirmed', reason: 'Follow-up', notes: '' },
  { id: 'a4', patientId: 'u13', patientName: 'Bob Williams', doctorId: 'u2', doctorName: 'Dr. Sarah Wilson', specialization: 'Cardiologist', date: fmt(today), time: '10:00', status: 'confirmed', reason: 'Chest pain', notes: '' },
  { id: 'a5', patientId: 'u12', patientName: 'Alice Johnson', doctorId: 'u4', doctorName: 'Dr. Emily Rodriguez', specialization: 'Neurologist', date: fmt(today), time: '14:00', status: 'confirmed', reason: 'Migraine consultation', notes: '' },
  { id: 'a6', patientId: 'u1', patientName: 'John Patient', doctorId: 'u2', doctorName: 'Dr. Sarah Wilson', specialization: 'Cardiologist', date: fmt(lastWeek), time: '09:00', status: 'completed', reason: 'Annual heart checkup', notes: 'Patient is in good health. Recommended exercise.' },
  { id: 'a7', patientId: 'u1', patientName: 'John Patient', doctorId: 'u9', doctorName: 'Dr. David Lee', specialization: 'General Physician', date: fmt(twoWeeksAgo), time: '11:00', status: 'completed', reason: 'Fever and cold', notes: 'Prescribed paracetamol and rest.' },
];

const initialPrescriptions = [
  {
    id: 'p1', appointmentId: 'a6', patientId: 'u1', patientName: 'John Patient', doctorId: 'u2', doctorName: 'Dr. Sarah Wilson',
    date: fmt(lastWeek), diagnosis: 'Routine cardiac evaluation - Normal sinus rhythm',
    medicines: [
      { name: 'Aspirin 75mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' },
      { name: 'Atorvastatin 10mg', dosage: '1 tablet', frequency: 'At bedtime', duration: '30 days' },
    ],
    notes: 'Continue regular exercise. Follow up in 3 months.', allergies: 'None known'
  },
  {
    id: 'p2', appointmentId: 'a7', patientId: 'u1', patientName: 'John Patient', doctorId: 'u9', doctorName: 'Dr. David Lee',
    date: fmt(twoWeeksAgo), diagnosis: 'Acute viral upper respiratory infection',
    medicines: [
      { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Three times daily', duration: '5 days' },
      { name: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'Once daily', duration: '5 days' },
      { name: 'Cough Syrup', dosage: '10ml', frequency: 'Twice daily', duration: '7 days' },
    ],
    notes: 'Rest and hydration recommended. Revisit if symptoms persist.', allergies: 'None known'
  },
];

const initialPatientRecords = [
  { id: 'r1', patientId: 'u1', bloodGroup: 'O+', height: '175 cm', weight: '72 kg', allergies: ['Penicillin'], conditions: ['Mild Hypertension'], emergencyContact: 'Jane Patient - 555-0199', dob: '1990-05-15', gender: 'Male', address: '123 Health St, Medical City' },
  { id: 'r2', patientId: 'u12', bloodGroup: 'A+', height: '162 cm', weight: '58 kg', allergies: [], conditions: [], emergencyContact: 'Mark Johnson - 555-0200', dob: '1985-08-22', gender: 'Female', address: '456 Care Ave, Wellness Town' },
  { id: 'r3', patientId: 'u13', bloodGroup: 'B-', height: '180 cm', weight: '85 kg', allergies: ['Aspirin'], conditions: ['Diabetes Type 2'], emergencyContact: 'Sue Williams - 555-0201', dob: '1978-12-03', gender: 'Male', address: '789 Med Blvd, Health Bay' },
];

const initialLabReports = [
  { id: 'l1', patientId: 'u1', patientName: 'John Patient', doctorId: 'u2', doctorName: 'Dr. Sarah Wilson', testName: 'Complete Blood Count', date: fmt(lastWeek), status: 'completed', result: 'Normal - All values within reference range', type: 'lab' },
  { id: 'l2', patientId: 'u1', patientName: 'John Patient', doctorId: 'u2', doctorName: 'Dr. Sarah Wilson', testName: 'Lipid Panel', date: fmt(lastWeek), status: 'completed', result: 'Total Cholesterol: 195 mg/dL (Normal), LDL: 110 mg/dL, HDL: 55 mg/dL', type: 'lab' },
  { id: 'l3', patientId: 'u12', patientName: 'Alice Johnson', doctorId: 'u4', doctorName: 'Dr. Emily Rodriguez', testName: 'MRI Brain', date: fmt(yesterday), status: 'pending', result: '', type: 'imaging' },
  { id: 'l4', patientId: 'u13', patientName: 'Bob Williams', doctorId: 'u2', doctorName: 'Dr. Sarah Wilson', testName: 'ECG', date: fmt(yesterday), status: 'completed', result: 'Normal sinus rhythm, no abnormalities detected', type: 'lab' },
];

const initialInventory = [
  { id: 'i1', name: 'Paracetamol 500mg', category: 'Analgesic', stock: 500, unit: 'tablets', price: 2.50, reorderLevel: 100, supplier: 'PharmaCorp', expiryDate: '2027-06-15' },
  { id: 'i2', name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 200, unit: 'capsules', price: 5.00, reorderLevel: 50, supplier: 'MediSupply', expiryDate: '2027-03-20' },
  { id: 'i3', name: 'Omeprazole 20mg', category: 'Antacid', stock: 320, unit: 'capsules', price: 3.75, reorderLevel: 80, supplier: 'PharmaCorp', expiryDate: '2027-09-10' },
  { id: 'i4', name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 45, unit: 'tablets', price: 1.50, reorderLevel: 60, supplier: 'HealthFirst', expiryDate: '2027-01-30' },
  { id: 'i5', name: 'Metformin 500mg', category: 'Antidiabetic', stock: 180, unit: 'tablets', price: 4.00, reorderLevel: 50, supplier: 'MediSupply', expiryDate: '2027-07-22' },
  { id: 'i6', name: 'Atorvastatin 10mg', category: 'Statin', stock: 250, unit: 'tablets', price: 6.00, reorderLevel: 60, supplier: 'PharmaCorp', expiryDate: '2027-11-05' },
  { id: 'i7', name: 'Aspirin 75mg', category: 'Blood Thinner', stock: 400, unit: 'tablets', price: 1.00, reorderLevel: 100, supplier: 'HealthFirst', expiryDate: '2027-04-18' },
  { id: 'i8', name: 'Ibuprofen 400mg', category: 'NSAID', stock: 15, unit: 'tablets', price: 3.00, reorderLevel: 50, supplier: 'PharmaCorp', expiryDate: '2027-02-28' },
  { id: 'i9', name: 'Cough Syrup 100ml', category: 'Cough/Cold', stock: 75, unit: 'bottles', price: 8.50, reorderLevel: 30, supplier: 'MediSupply', expiryDate: '2026-12-15' },
  { id: 'i10', name: 'Bandage Roll', category: 'Supplies', stock: 120, unit: 'rolls', price: 2.00, reorderLevel: 40, supplier: 'HealthFirst', expiryDate: '2028-06-01' },
];

const initialInvoices = [
  { id: 'inv1', patientId: 'u1', patientName: 'John Patient', date: fmt(lastWeek), items: [{ desc: 'Consultation - Cardiology', amount: 150 }, { desc: 'ECG Test', amount: 50 }, { desc: 'Medications', amount: 35 }], total: 235, status: 'paid', paymentMethod: 'Card' },
  { id: 'inv2', patientId: 'u1', patientName: 'John Patient', date: fmt(twoWeeksAgo), items: [{ desc: 'Consultation - General', amount: 80 }, { desc: 'Medications', amount: 25 }], total: 105, status: 'paid', paymentMethod: 'Cash' },
  { id: 'inv3', patientId: 'u12', patientName: 'Alice Johnson', date: fmt(yesterday), items: [{ desc: 'Consultation - Neurology', amount: 200 }, { desc: 'MRI Brain', amount: 350 }], total: 550, status: 'pending', paymentMethod: '' },
  { id: 'inv4', patientId: 'u13', patientName: 'Bob Williams', date: fmt(yesterday), items: [{ desc: 'Consultation - Cardiology', amount: 150 }, { desc: 'ECG', amount: 50 }], total: 200, status: 'paid', paymentMethod: 'UPI' },
];

const initialQueue = [
  { id: 'q1', tokenNo: 1, patientId: 'u12', patientName: 'Alice Johnson', doctorId: 'u2', doctorName: 'Dr. Sarah Wilson', status: 'in-progress', checkInTime: '09:15', type: 'appointment' },
  { id: 'q2', tokenNo: 2, patientId: 'u13', patientName: 'Bob Williams', doctorId: 'u2', doctorName: 'Dr. Sarah Wilson', status: 'waiting', checkInTime: '09:45', type: 'appointment' },
  { id: 'q3', tokenNo: 3, patientId: 'u1', patientName: 'John Patient', doctorId: 'u4', doctorName: 'Dr. Emily Rodriguez', status: 'waiting', checkInTime: '10:00', type: 'walk-in' },
];

const initialDocuments = [
  { id: 'd1', patientId: 'u1', name: 'Blood Report - Jan 2026', type: 'lab-report', uploadDate: fmt(lastWeek), uploadedBy: 'Dr. Sarah Wilson', mimeType: 'application/pdf' },
  { id: 'd2', patientId: 'u1', name: 'Chest X-Ray', type: 'imaging', uploadDate: fmt(twoWeeksAgo), uploadedBy: 'Dr. David Lee', mimeType: 'image/jpeg' },
];

const initialNotifications = [
  { id: 'n1', userId: 'u1', message: 'Your appointment with Dr. Sarah Wilson is confirmed for tomorrow at 09:00', type: 'appointment', read: false, date: fmt(today) },
  { id: 'n2', userId: 'u1', message: 'Lab report for Complete Blood Count is ready', type: 'report', read: false, date: fmt(yesterday) },
  { id: 'n3', userId: 'u2', message: 'New appointment request from Alice Johnson', type: 'appointment', read: true, date: fmt(yesterday) },
];

export function DataProvider({ children }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [patientRecords, setPatientRecords] = useState(initialPatientRecords);
  const [labReports, setLabReports] = useState(initialLabReports);
  const [inventory, setInventory] = useState(initialInventory);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [queue, setQueue] = useState(initialQueue);
  const [documents, setDocuments] = useState(initialDocuments);
  const [notifications, setNotifications] = useState(initialNotifications);

  // ---- Appointments ----
  const bookAppointment = useCallback((appt) => {
    const newAppt = { id: 'a' + generateId(), status: 'pending', notes: '', ...appt };
    setAppointments(prev => [...prev, newAppt]);
    addNotification(appt.doctorId, `New appointment from ${appt.patientName}`, 'appointment');
    return newAppt;
  }, []);

  const updateAppointment = useCallback((id, updates) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const cancelAppointment = useCallback((id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
  }, []);

  const getAvailableSlots = useCallback((doctorId, date) => {
    const booked = appointments
      .filter(a => a.doctorId === doctorId && a.date === date && a.status !== 'cancelled')
      .map(a => a.time);
    return timeSlots.filter(s => !booked.includes(s));
  }, [appointments]);

  const getAppointmentsByPatient = useCallback((patientId) => {
    return appointments.filter(a => a.patientId === patientId).sort((a, b) => b.date.localeCompare(a.date));
  }, [appointments]);

  const getAppointmentsByDoctor = useCallback((doctorId, date) => {
    if (date) return appointments.filter(a => a.doctorId === doctorId && a.date === date && a.status !== 'cancelled');
    return appointments.filter(a => a.doctorId === doctorId && a.status !== 'cancelled');
  }, [appointments]);

  // ---- Prescriptions ----
  const addPrescription = useCallback((rx) => {
    const newRx = { id: 'p' + generateId(), date: fmt(new Date()), ...rx };
    setPrescriptions(prev => [...prev, newRx]);
    addNotification(rx.patientId, `New prescription from ${rx.doctorName}`, 'prescription');
    return newRx;
  }, []);

  const getPrescriptionsByPatient = useCallback((patientId) => {
    return prescriptions.filter(p => p.patientId === patientId).sort((a, b) => b.date.localeCompare(a.date));
  }, [prescriptions]);

  // ---- Patient Records ----
  const getPatientRecord = useCallback((patientId) => {
    return patientRecords.find(r => r.patientId === patientId) || null;
  }, [patientRecords]);

  const updatePatientRecord = useCallback((patientId, updates) => {
    setPatientRecords(prev => {
      const exists = prev.find(r => r.patientId === patientId);
      if (exists) return prev.map(r => r.patientId === patientId ? { ...r, ...updates } : r);
      return [...prev, { id: 'r' + generateId(), patientId, ...updates }];
    });
  }, []);

  // ---- Lab Reports ----
  const requestLabTest = useCallback((report) => {
    const newReport = { id: 'l' + generateId(), date: fmt(new Date()), status: 'pending', result: '', ...report };
    setLabReports(prev => [...prev, newReport]);
    return newReport;
  }, []);

  const updateLabReport = useCallback((id, updates) => {
    setLabReports(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  }, []);

  const getLabReportsByPatient = useCallback((patientId) => {
    return labReports.filter(r => r.patientId === patientId);
  }, [labReports]);

  // ---- Inventory ----
  const updateInventoryItem = useCallback((id, updates) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  }, []);

  const addInventoryItem = useCallback((item) => {
    const newItem = { id: 'i' + generateId(), ...item };
    setInventory(prev => [...prev, newItem]);
    return newItem;
  }, []);

  // ---- Invoices ----
  const createInvoice = useCallback((inv) => {
    const newInv = { id: 'inv' + generateId(), date: fmt(new Date()), status: 'pending', paymentMethod: '', ...inv };
    setInvoices(prev => [...prev, newInv]);
    return newInv;
  }, []);

  const updateInvoice = useCallback((id, updates) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, ...updates } : inv));
  }, []);

  // ---- Queue ----
  const addToQueue = useCallback((entry) => {
    const maxToken = queue.reduce((max, q) => Math.max(max, q.tokenNo), 0);
    const newEntry = { id: 'q' + generateId(), tokenNo: maxToken + 1, status: 'waiting', checkInTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }), ...entry };
    setQueue(prev => [...prev, newEntry]);
    return newEntry;
  }, [queue]);

  const updateQueueEntry = useCallback((id, updates) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  }, []);

  const removeFromQueue = useCallback((id) => {
    setQueue(prev => prev.filter(q => q.id !== id));
  }, []);

  // ---- Documents ----
  const uploadDocument = useCallback((doc) => {
    const newDoc = { id: 'd' + generateId(), uploadDate: fmt(new Date()), ...doc };
    setDocuments(prev => [...prev, newDoc]);
    return newDoc;
  }, []);

  const getDocumentsByPatient = useCallback((patientId) => {
    return documents.filter(d => d.patientId === patientId);
  }, [documents]);

  // ---- Notifications ----
  const addNotification = useCallback((userId, message, type) => {
    setNotifications(prev => [...prev, { id: 'n' + generateId(), userId, message, type, read: false, date: fmt(new Date()) }]);
  }, []);

  const getNotifications = useCallback((userId) => {
    return notifications.filter(n => n.userId === userId).sort((a, b) => b.date.localeCompare(a.date));
  }, [notifications]);

  const markNotificationRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const value = {
    appointments, prescriptions, patientRecords, labReports, inventory, invoices, queue, documents, notifications,
    bookAppointment, updateAppointment, cancelAppointment, getAvailableSlots, getAppointmentsByPatient, getAppointmentsByDoctor,
    addPrescription, getPrescriptionsByPatient,
    getPatientRecord, updatePatientRecord,
    requestLabTest, updateLabReport, getLabReportsByPatient,
    updateInventoryItem, addInventoryItem,
    createInvoice, updateInvoice,
    addToQueue, updateQueueEntry, removeFromQueue,
    uploadDocument, getDocumentsByPatient,
    addNotification, getNotifications, markNotificationRead,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be within DataProvider');
  return ctx;
}

export default DataContext;
