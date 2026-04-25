import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Search, Star, Clock, Briefcase, MapPin, Calendar, X, ChevronRight } from 'lucide-react';

const specializations = ['All', 'Cardiologist', 'Dermatologist', 'Neurologist', 'Orthopedic', 'Pediatrician', 'ENT Specialist', 'Ophthalmologist', 'General Physician'];

export default function DoctorListing() {
  const { getDoctors, user } = useAuth();
  const { getAvailableSlots, bookAppointment } = useData();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [specFilter, setSpecFilter] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [bookDate, setBookDate] = useState('');
  const [bookTime, setBookTime] = useState('');
  const [bookReason, setBookReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle specialty parameter from URL
  useEffect(() => {
    const specialtyParam = searchParams.get('specialty');
    if (specialtyParam) {
      // Convert URL format (e.g., 'general-medicine') to display format (e.g., 'General Medicine')
      const formattedSpecialty = specialtyParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Map service names to doctor specializations
      const specialtyMap = {
        'General Medicine': 'General Physician',
        'Cardiology': 'Cardiologist',
        'Dermatology': 'Dermatologist',
        'Pediatrics': 'Pediatrician',
        'Orthopedics': 'Orthopedic',
        'ENT': 'ENT Specialist',
        'Ophthalmology': 'Ophthalmologist',
        'Emergency Care': 'General Physician'
      };
      
      const mappedSpecialty = specialtyMap[formattedSpecialty] || formattedSpecialty;
      setSpecFilter(mappedSpecialty);
    } else if (!specialtyParam) {
      // Reset to 'All' when no specialty parameter
      setSpecFilter('All');
    }
  }, [searchParams]);

  const doctors = getDoctors();
  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization?.toLowerCase().includes(search.toLowerCase());
    const matchSpec = specFilter === 'All' || d.specialization === specFilter;
    return matchSearch && matchSpec;
  });

  const today = new Date().toISOString().split('T')[0];
  const availableSlots = selectedDoc && bookDate ? getAvailableSlots(selectedDoc.id, bookDate) : [];

  const handleBook = () => {
    if (!bookDate || !bookTime || !bookReason) return;
    bookAppointment({
      patientId: user.id,
      patientName: user.name,
      doctorId: selectedDoc.id,
      doctorName: selectedDoc.name,
      specialization: selectedDoc.specialization,
      date: bookDate,
      time: bookTime,
      reason: bookReason,
    });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedDoc(null);
      setBookDate('');
      setBookTime('');
      setBookReason('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-800">Find Doctors</h1>
        <p className="text-surface-400 mt-1">Browse our specialized doctors and book your appointment</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or specialization..." className="input pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {specializations.map(spec => (
            <button key={spec} onClick={() => setSpecFilter(spec)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${specFilter === spec ? 'bg-primary-500 text-white shadow-sm' : 'bg-surface-100 text-surface-500 hover:bg-surface-200'}`}>
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(doc => (
          <div key={doc.id} className="card hover:shadow-lg transition-all duration-300 group">
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-100 to-primary-100 flex items-center justify-center text-xl font-bold text-primary-600 shrink-0">
                  {doc.name.split(' ').pop().charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-surface-800 text-base">{doc.name}</h3>
                  <span className="badge badge-info mt-1">{doc.specialization}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-surface-500">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{doc.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-500">
                  <Star className="w-3.5 h-3.5 text-warning-400" />
                  <span>4.{5 + (doc.experience % 5)}/5 rating</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Available Mon-Fri, 9AM-5PM</span>
                </div>
              </div>

              <button onClick={() => setSelectedDoc(doc)} className="btn btn-primary w-full justify-center mt-4 group-hover:shadow-md">
                Book Appointment <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-surface-200 mx-auto mb-3" />
          <p className="text-surface-500">No doctors found matching your criteria</p>
        </div>
      )}

      {/* Booking Modal */}
      {selectedDoc && (
        <div className="modal-overlay" onClick={() => setSelectedDoc(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {showSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-success-500" />
                </div>
                <h3 className="text-xl font-bold text-surface-800 mb-2">Appointment Booked!</h3>
                <p className="text-surface-400">Your appointment has been successfully scheduled.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h3 className="text-lg font-bold text-surface-800">Book Appointment</h3>
                  <button onClick={() => setSelectedDoc(null)} className="p-1 hover:bg-surface-100 rounded-lg"><X className="w-5 h-5 text-surface-400" /></button>
                </div>
                <div className="modal-body space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-100 to-primary-100 flex items-center justify-center text-lg font-bold text-primary-600">
                      {selectedDoc.name.split(' ').pop().charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-surface-800">{selectedDoc.name}</p>
                      <p className="text-xs text-surface-400">{selectedDoc.specialization}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-600 mb-1.5">Select Date *</label>
                    <input type="date" value={bookDate} min={today} onChange={e => { setBookDate(e.target.value); setBookTime(''); }} className="input" />
                  </div>

                  {bookDate && (
                    <div>
                      <label className="block text-sm font-medium text-surface-600 mb-1.5">Select Time Slot *</label>
                      {availableSlots.length === 0 ? (
                        <p className="text-sm text-danger-500">No available slots for this date</p>
                      ) : (
                        <div className="grid grid-cols-4 gap-2">
                          {availableSlots.map(slot => (
                            <button key={slot} onClick={() => setBookTime(slot)} className={`p-2 rounded-lg text-xs font-medium transition-all ${bookTime === slot ? 'bg-primary-500 text-white shadow-sm' : 'bg-surface-100 text-surface-600 hover:bg-primary-50'}`}>
                              {slot}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-surface-600 mb-1.5">Reason for Visit *</label>
                    <textarea value={bookReason} onChange={e => setBookReason(e.target.value)} placeholder="Describe your reason for visit..." className="input min-h-[80px] resize-none" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button onClick={() => setSelectedDoc(null)} className="btn btn-secondary">Cancel</button>
                  <button onClick={handleBook} disabled={!bookDate || !bookTime || !bookReason} className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                    Confirm Booking
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
