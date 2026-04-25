import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Heart, Stethoscope, Users, Calendar, FileText, CreditCard, Shield, Star, ArrowRight, ArrowLeft, Phone, Mail, MapPin, Clock, Award, GraduationCap } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'General Medicine',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    experience: 12,
    education: 'MD from Harvard Medical School',
    rating: 4.9,
    reviews: 156,
    languages: ['English', 'Spanish'],
    availability: 'Mon-Fri 9AM-5PM',
    bio: 'Dr. Sarah Johnson is a board-certified family physician with over 12 years of experience in comprehensive healthcare. She specializes in preventive care, chronic disease management, and patient education.',
    achievements: [
      'Board Certified in Family Medicine',
      'Fellow of the American Academy of Family Physicians',
      'Published 15+ research papers',
      'Patient Satisfaction Award 2023'
    ],
    services: [
      'Annual Physical Exams',
      'Chronic Disease Management',
      'Preventive Care',
      'Health Screenings',
      'Vaccinations'
    ]
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    experience: 15,
    education: 'MD from Johns Hopkins University',
    rating: 4.8,
    reviews: 203,
    languages: ['English', 'Mandarin'],
    availability: 'Mon-Thu 8AM-4PM',
    bio: 'Dr. Michael Chen is a renowned cardiologist specializing in interventional cardiology and heart failure management. He has performed over 2000 cardiac procedures.',
    achievements: [
      'Board Certified in Cardiovascular Disease',
      'Fellow of the American College of Cardiology',
      'Chief of Cardiology 2019-2022',
      'Excellence in Patient Care Award'
    ],
    services: [
      'Cardiac Catheterization',
      'Echocardiography',
      'Stress Testing',
      'Heart Failure Management',
      'Arrhythmia Treatment'
    ]
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    experience: 8,
    education: 'MD from University of California',
    rating: 4.9,
    reviews: 98,
    languages: ['English', 'Spanish'],
    availability: 'Tue-Sat 10AM-6PM',
    bio: 'Dr. Emily Rodriguez is a dermatologist specializing in medical and cosmetic dermatology. She is passionate about helping patients achieve healthy, beautiful skin.',
    achievements: [
      'Board Certified in Dermatology',
      'Member of American Academy of Dermatology',
      'Cosmetic Dermatology Fellowship',
      'Patient Choice Award 2022'
    ],
    services: [
      'Acne Treatment',
      'Skin Cancer Screening',
      'Cosmetic Procedures',
      'Laser Treatments',
      'Dermatologic Surgery'
    ]
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Pediatrics',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    experience: 10,
    education: 'MD from Stanford University',
    rating: 4.9,
    reviews: 178,
    languages: ['English'],
    availability: 'Mon-Fri 8AM-4PM',
    bio: 'Dr. James Wilson is a pediatrician dedicated to providing comprehensive care for children from infancy through adolescence. He believes in building strong relationships with families.',
    achievements: [
      'Board Certified in Pediatrics',
      'Fellow of the American Academy of Pediatrics',
      'Pediatric Research Award',
      'Parent Satisfaction Award'
    ],
    services: [
      'Well-Child Visits',
      'Immunizations',
      'Developmental Screenings',
      'Acute Illness Care',
      'Behavioral Health'
    ]
  },
  {
    id: 5,
    name: 'Dr. Lisa Park',
    specialty: 'Orthopedics',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    experience: 14,
    education: 'MD from University of Pennsylvania',
    rating: 4.8,
    reviews: 145,
    languages: ['English', 'Korean'],
    availability: 'Mon-Thu 9AM-5PM',
    bio: 'Dr. Lisa Park is an orthopedic surgeon specializing in sports medicine and joint replacement. She is committed to helping patients regain mobility and live active lives.',
    achievements: [
      'Board Certified in Orthopedic Surgery',
      'Sports Medicine Fellowship',
      'Joint Replacement Specialist',
      'Athletic Trainer Award'
    ],
    services: [
      'Joint Replacement',
      'Sports Medicine',
      'Arthroscopic Surgery',
      'Fracture Care',
      'Physical Therapy'
    ]
  }
];

export default function DoctorsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const specialty = searchParams.get('specialty');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  useEffect(() => {
    if (specialty) {
      const specialtyMap = {
        'general-medicine': 'General Medicine',
        'cardiology': 'Cardiology',
        'dermatology': 'Dermatology',
        'pediatrics': 'Pediatrics',
        'orthopedics': 'Orthopedics'
      };
      const mappedSpecialty = specialtyMap[specialty] || specialty;
      setFilteredDoctors(doctors.filter(doctor =>
        doctor.specialty.toLowerCase() === mappedSpecialty.toLowerCase()
      ));
    } else {
      setFilteredDoctors(doctors);
    }
  }, [specialty]);

  const handleBookAppointment = (doctorId) => {
    navigate('/login');
  };

  if (selectedDoctor) {
    return (
      <div className="min-h-screen bg-surface-50">
        {/* Header */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-surface-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="flex items-center gap-2 text-surface-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Doctors
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-surface-800">MediCare</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Doctor Details */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-full h-80 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-surface-800 mb-2">{selectedDoctor.name}</h1>
                    <p className="text-xl text-primary-600 font-medium mb-2">{selectedDoctor.specialty}</p>
                    <div className="flex items-center gap-4 text-sm text-surface-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning-400 fill-current" />
                        <span>{selectedDoctor.rating} ({selectedDoctor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedDoctor.experience} years experience</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBookAppointment(selectedDoctor.id)}
                    className="btn btn-primary"
                  >
                    Book Appointment
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-surface-800 mb-3">About</h3>
                    <p className="text-surface-600 mb-4">{selectedDoctor.bio}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4 text-primary-500" />
                        <span>{selectedDoctor.education}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary-500" />
                        <span>{selectedDoctor.availability}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary-500" />
                        <span>Languages: {selectedDoctor.languages.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-surface-800 mb-3">Services</h3>
                    <ul className="space-y-2">
                      {selectedDoctor.services.map((service, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-surface-600">
                          <CheckCircle className="w-4 h-4 text-success-500" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-surface-800 mb-3">Achievements & Certifications</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedDoctor.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-surface-600">
                        <Award className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-surface-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-surface-800">MediCare</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our Expert Doctors
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Our board-certified physicians are dedicated to providing exceptional healthcare services with compassion and expertise.
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {specialty && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-surface-800 mb-2">
                {filteredDoctors[0]?.specialty} Specialists
              </h2>
              <p className="text-surface-600">
                Expert {filteredDoctors[0]?.specialty.toLowerCase()} doctors ready to provide exceptional care.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning-400 fill-current" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-surface-800 mb-1">{doctor.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{doctor.specialty}</p>
                  <div className="space-y-2 text-sm text-surface-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{doctor.reviews} reviews</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedDoctor(doctor)}
                      className="flex-1 btn btn-secondary btn-sm"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleBookAppointment(doctor.id)}
                      className="flex-1 btn btn-primary btn-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-16">
              <Stethoscope className="w-16 h-16 text-surface-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-surface-600 mb-2">No doctors found</h3>
              <p className="text-surface-500">Try adjusting your search criteria.</p>
              <button
                onClick={() => navigate('/doctors')}
                className="mt-4 btn btn-primary"
              >
                View All Doctors
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}