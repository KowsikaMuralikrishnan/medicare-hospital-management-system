import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Stethoscope, Users, Calendar, FileText, CreditCard, Shield, Star, ArrowRight, CheckCircle, Phone, Mail, MapPin, Clock, Award, ChevronDown } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const features = [
  {
    icon: Calendar,
    title: 'Easy Appointments',
    description: 'Book appointments online with your preferred doctors and get instant confirmation.'
  },
  {
    icon: FileText,
    title: 'Digital Records',
    description: 'Access your medical history, prescriptions, and test results anytime, anywhere.'
  },
  {
    icon: CreditCard,
    title: 'Secure Billing',
    description: 'Transparent pricing with secure online payments and detailed billing statements.'
  },
  {
    icon: Shield,
    title: 'Privacy Protected',
    description: 'Your health data is encrypted and protected with enterprise-grade security.'
  }
];

const services = [
  {
    name: 'General Medicine',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Comprehensive primary care services including preventive screenings, chronic disease management, and routine check-ups.'
  },
  {
    name: 'Cardiology',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Advanced cardiac care with state-of-the-art diagnostic equipment, interventional procedures, and heart health monitoring.'
  },
  {
    name: 'Dermatology',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Complete skin care solutions including medical dermatology, cosmetic procedures, and skin cancer screenings.'
  },
  {
    name: 'Pediatrics',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Specialized care for infants, children, and adolescents with focus on growth, development, and preventive care.'
  },
  {
    name: 'Orthopedics',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Expert orthopedic care for bones, joints, and muscles including sports medicine, joint replacement, and rehabilitation.'
  },
  {
    name: 'ENT',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Comprehensive ear, nose, and throat care including allergy treatment, hearing services, and sinus procedures.'
  },
  {
    name: 'Ophthalmology',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Complete eye care services from routine exams to advanced surgical procedures and vision correction.'
  },
  {
    name: 'Emergency Care',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: '24/7 emergency medical services with rapid response times and comprehensive trauma care capabilities.'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Patient',
    content: 'MediCare has transformed how I manage my healthcare. Booking appointments is so easy, and I can access all my records instantly. The telemedicine feature saved me a trip to the clinic during a busy work week.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Cardiologist',
    content: 'The platform streamlines patient management significantly. Digital records have reduced paperwork by 80%, and the appointment scheduling system has eliminated double-bookings. Highly recommended for modern practices.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Patient',
    content: 'Outstanding service and user-friendly interface. The emergency appointment feature was a lifesaver when my child needed urgent care. The staff is always helpful and responsive.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Dr. James Wilson',
    role: 'Family Physician',
    content: 'MediCare has revolutionized our practice. The integrated system allows us to focus more on patient care rather than administrative tasks. The patient portal has improved communication tremendously.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Maria Garcia',
    role: 'Patient',
    content: 'I love how easy it is to manage my family\'s healthcare through one platform. From booking appointments to viewing test results, everything is at my fingertips. The customer support is excellent too.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Dr. Lisa Park',
    role: 'Pediatrician',
    content: 'The child-friendly interface and comprehensive health tracking features make MediCare perfect for pediatric care. Parents appreciate the easy access to their children\'s health information.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  }
];

const stats = [
  { value: '10,000+', label: 'Happy Patients' },
  { value: '50+', label: 'Expert Doctors' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Emergency Care' }
];

const faqData = [
  {
    question: 'How do I book an appointment?',
    answer: 'You can book appointments online through our patient portal, by calling our reception at +1 (555) 123-4567, or visiting our clinic in person. Online booking is available 24/7 and allows you to choose your preferred doctor, time slot, and receive instant confirmation via email and SMS.'
  },
  {
    question: 'Do you accept insurance?',
    answer: 'Yes, we accept most major insurance plans including Medicare, Medicaid, Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and many others. Our billing team will help verify your coverage, explain your benefits, and handle all insurance claims. We also offer competitive self-pay rates for uninsured patients.'
  },
  {
    question: 'What should I bring to my appointment?',
    answer: 'Please bring a valid photo ID, your insurance card, and any relevant medical records. If it\'s your first visit, arrive 15 minutes early to complete registration. For specialist appointments, bring previous test results, medication lists, and referral forms. We also recommend bringing a list of current medications and any questions you have for your doctor.'
  },
  {
    question: 'How can I access my medical records?',
    answer: 'All patients can access their medical records through our secure patient portal after creating an account. Digital records include test results, prescriptions, visit summaries, vaccination records, and billing statements. You can also request paper copies of your records for a small fee.'
  },
  {
    question: 'Do you offer telemedicine services?',
    answer: 'Yes, we offer comprehensive telemedicine services for follow-up visits, consultations, prescription renewals, and minor medical concerns. Telemedicine appointments are conducted via secure video calls and are covered by most insurance plans. This service is particularly convenient for patients with mobility issues or those living in remote areas.'
  },
  {
    question: 'What are your hours of operation?',
    answer: 'Our clinics are open Monday through Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 2:00 PM. Emergency care is available 24/7 at our main facility. Online appointment booking and patient portal access are available around the clock. For urgent medical concerns outside regular hours, please call our emergency line.'
  },
  {
    question: 'How do I refill my prescriptions?',
    answer: 'Prescription refills can be requested through the patient portal, by calling our pharmacy at +1 (555) 123-4568, or by asking your doctor during an appointment. Most routine refills are processed within 24 hours. For controlled substances or new prescriptions, please schedule an appointment with your doctor.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, cash, and electronic payments. For your convenience, we also offer online bill pay through the patient portal. Payment plans are available for larger balances, and we can work with you to make healthcare affordable.'
  }
];

export default function HomePage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleBookAppointment = () => {
    navigate('/login');
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')"}} />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-surface-800 mb-6">
                Your Health,<br />
                <span className="text-gradient">Our Priority</span>
              </h1>
              <p className="text-xl text-surface-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Experience modern healthcare management with our comprehensive platform.
                Book appointments, access records, and manage your health journey seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button
                  onClick={handleBookAppointment}
                  className="btn btn-primary btn-lg"
                >
                  Book Appointment <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="btn btn-secondary btn-lg"
                >
                  Learn More
                </button>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-surface-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  <span>24/7 Emergency Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  <span>Expert Medical Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  <span>Modern Facilities</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Medical consultation"
                      className="w-full h-48 object-cover rounded-2xl shadow-lg"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Advanced medical equipment"
                      className="w-full h-32 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img
                      src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Healthcare professional with patient"
                      className="w-full h-32 object-cover rounded-2xl shadow-lg"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Modern medical facility"
                      className="w-full h-48 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-success-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-surface-800">98%</div>
                    <div className="text-sm text-surface-600">Patient Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 via-blue-50 to-accent-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{backgroundImage: "url('https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-surface-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-800 mb-4">
              Why Choose MediCare?
            </h2>
            <p className="text-xl text-surface-600 max-w-2xl mx-auto">
              Experience healthcare excellence with our comprehensive medical services and modern technology
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-surface-800 mb-4">Expert Medical Team</h3>
              <p className="text-surface-600 leading-relaxed">
                Our board-certified physicians and specialists provide the highest quality care using the latest medical advancements and evidence-based treatments.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-surface-800 mb-4">Advanced Technology</h3>
              <p className="text-surface-600 leading-relaxed">
                State-of-the-art medical equipment and digital health records ensure accurate diagnoses, efficient treatments, and seamless care coordination.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-surface-800 mb-4">Patient-Centered Care</h3>
              <p className="text-surface-600 leading-relaxed">
                We prioritize your comfort and convenience with personalized care plans, flexible scheduling, and compassionate support throughout your journey.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-surface-800 mb-4">Comprehensive Healthcare Solutions</h3>
                <p className="text-surface-600 mb-6">
                  From preventive care to specialized treatments, we offer a full spectrum of medical services designed to meet all your healthcare needs under one roof.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">Preventive health screenings and wellness programs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">Chronic disease management and monitoring</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">Emergency care and urgent medical services</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">Telemedicine consultations and follow-ups</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Medical facility"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-800 mb-4">
              Our Medical Services
            </h2>
            <p className="text-xl text-surface-600 max-w-2xl mx-auto mb-8">
              Comprehensive healthcare services for all your medical needs, delivered by our expert medical professionals
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-surface-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-500" />
                <span>24/7 Emergency Care</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-500" />
                <span>Advanced Technology</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-500" />
                <span>Expert Doctors</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center rounded-xl border border-surface-200 hover:border-primary-200 transition-all duration-300 hover:shadow-xl group overflow-hidden bg-white">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <button
                    onClick={() => navigate(`/doctors?specialty=${service.name.toLowerCase().replace(' ', '-')}`)}
                    className="w-full btn btn-primary btn-sm"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section id="emergency" className="py-24 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-800 mb-4">
              Emergency Care When You Need It Most
            </h2>
            <p className="text-xl text-surface-600 max-w-3xl mx-auto">
              Our 24/7 emergency services are equipped to handle any medical emergency with rapid response times and expert care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2">Heart Attack</h3>
              <p className="text-surface-600 text-sm">Immediate cardiac care with advanced life support and catheterization lab.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2">Trauma Care</h3>
              <p className="text-surface-600 text-sm">Level 1 trauma center with surgical teams available 24/7 for critical injuries.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2">Pediatric Emergency</h3>
              <p className="text-surface-600 text-sm">Specialized emergency care for children with pediatric specialists on duty.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2">Stroke Care</h3>
              <p className="text-surface-600 text-sm">Rapid stroke assessment and treatment within the critical first hour.</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-surface-800 mb-4">Don't Wait - Get Help Now</h3>
                <p className="text-surface-600 mb-6">
                  In case of emergency, every second counts. Our emergency departments are staffed with board-certified physicians, nurses, and support staff ready to provide immediate care.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">Average ER wait time: 15 minutes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">Helicopter ambulance service available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">24/7 radiology and laboratory services</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">Direct admission to ICU when needed</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-red-600 text-white rounded-2xl p-8 mb-6">
                  <Phone className="w-12 h-12 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">Emergency Hotline</h4>
                  <p className="text-2xl font-bold mb-4">+1 (555) 911-0000</p>
                  <p className="text-sm opacity-90">Available 24 hours a day, 7 days a week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-surface-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')"}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-surface-800 mb-6">
                About MediCare: Revolutionizing Healthcare
              </h2>
              <p className="text-lg text-surface-600 mb-6">
                MediCare is a cutting-edge healthcare management platform that seamlessly connects patients, healthcare providers, and medical facilities through an intuitive, secure digital ecosystem. Founded with the vision of making quality healthcare accessible to everyone, we combine advanced technology with compassionate care.
              </p>
              <p className="text-lg text-surface-600 mb-6">
                Our comprehensive platform includes electronic health records, telemedicine capabilities, appointment scheduling, prescription management, and billing services. We serve over 50 clinics across the country and have helped more than 10,000 patients receive timely, efficient care.
              </p>
              <p className="text-lg text-surface-600 mb-8">
                At MediCare, we believe in patient-centered care that puts your health and convenience first. Our team of experienced healthcare professionals, combined with our innovative technology, ensures that you receive the best possible care when you need it most.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-success-500" />
                  <span className="text-surface-700">24/7 Emergency Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-success-500" />
                  <span className="text-surface-700">HIPAA Compliant Security</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-success-500" />
                  <span className="text-surface-700">Mobile App Access</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-success-500" />
                  <span className="text-surface-700">Telemedicine Services</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-success-500" />
                  <span className="text-surface-700">Multi-Language Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-success-500" />
                  <span className="text-surface-700">Insurance Integration</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-surface-800 mb-4">Our Commitment to Excellence</h3>
                <p className="text-surface-600 mb-4">
                  We are committed to maintaining the highest standards of healthcare delivery through continuous innovation, staff training, and quality improvement initiatives.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">15+</div>
                    <div className="text-sm text-surface-600">Years of Service</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">50+</div>
                    <div className="text-sm text-surface-600">Partner Clinics</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">98%</div>
                    <div className="text-sm text-surface-600">Patient Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Medical team"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                <div className="relative z-10 text-center text-white">
                  <Heart className="w-16 h-16 text-white mx-auto mb-4 opacity-90" />
                  <h3 className="text-2xl font-bold mb-2">Patient-Centered Care</h3>
                  <p className="opacity-90">Your health is our top priority</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Technology Section */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-800 mb-4">
              Advanced Technology for Better Care
            </h2>
            <p className="text-xl text-surface-600 max-w-3xl mx-auto">
              We leverage cutting-edge medical technology and digital innovation to provide superior healthcare services and improve patient outcomes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-surface-800 mb-4">AI-Powered Diagnostics</h3>
              <p className="text-surface-600 leading-relaxed">
                Our advanced AI algorithms assist in early disease detection and personalized treatment recommendations, improving accuracy and patient outcomes.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-surface-800 mb-4">Electronic Health Records</h3>
              <p className="text-surface-600 leading-relaxed">
                Comprehensive digital health records ensure seamless information sharing between providers, reducing errors and improving care coordination.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-surface-800 mb-4">Remote Patient Monitoring</h3>
              <p className="text-surface-600 leading-relaxed">
                Continuous health monitoring through wearable devices and mobile apps enables proactive care and early intervention when needed.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-surface-800 mb-4">State-of-the-Art Medical Equipment</h3>
                <p className="text-surface-600 mb-6">
                  Our facilities are equipped with the latest medical technology, including advanced imaging systems, robotic surgical equipment, and digital diagnostic tools that ensure accurate diagnoses and effective treatments.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">3D Mammography</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">MRI & CT Scanning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">Digital X-Ray</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">Ultrasound Technology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">Cardiac Monitoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-surface-700">Laboratory Services</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Advanced medical technology"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm font-semibold text-surface-800">Latest Technology</div>
                  <div className="text-xs text-surface-600">FDA Approved Equipment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-800 mb-4">
              What Our Patients & Doctors Say
            </h2>
            <p className="text-xl text-surface-600 max-w-2xl mx-auto mb-8">
              Trusted by thousands of patients and healthcare professionals across the country
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-surface-600">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-warning-400 fill-current" />
                <span>4.9/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-warning-400" />
                <span>10,000+ Reviews</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-surface-800">{testimonial.name}</div>
                      <div className="text-sm text-surface-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warning-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-surface-600 leading-relaxed">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"}} />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of satisfied patients and healthcare providers using MediCare
          </p>
          <button
            onClick={handleGetStarted}
            className="btn btn-lg bg-white text-primary-600 hover:bg-surface-50"
          >
            Get Started Today <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>




      <section id="faq" className="py-24 bg-gradient-to-br from-blue-50 via-white to-accent-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"}} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-surface-600">
              Get answers to common questions about our services
            </p>
          </div>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-surface-800 hover:bg-surface-50 transition-colors rounded-lg"
                >
                  <span className="flex-1">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-primary-600 flex-shrink-0 ml-4 transition-transform duration-300 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 py-4 border-t border-surface-200 text-surface-600 animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-surface-800 mb-3">Still have questions?</h3>
            <p className="text-surface-600 mb-4">Our support team is here to help you with any additional questions you may have.</p>
            <a href="mailto:support@medicare.com" className="text-primary-600 font-medium hover:text-primary-700">
              Contact our support team →
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary-50 to-accent-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{backgroundImage: "url('https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-800 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-surface-600 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by leading healthcare organizations and our community
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-warning-600" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2">Healthcare Excellence Award</h3>
              <p className="text-surface-600 text-sm">2023 - American Medical Association</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-success-600" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2">Patient Safety Award</h3>
              <p className="text-surface-600 text-sm">2023 - Joint Commission</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2">Innovation in Healthcare</h3>
              <p className="text-surface-600 text-sm">2022 - Healthcare Technology Association</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2">Community Health Champion</h3>
              <p className="text-surface-600 text-sm">2023 - Local Health Department</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Growing Family</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              With over 10,000 satisfied patients and 50+ healthcare providers, MediCare continues to expand our services to better serve our community. Experience the difference that quality healthcare makes.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>98% Patient Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>50+ Expert Doctors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>24/7 Emergency Care</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Modern Facilities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-surface-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MediCare</span>
              </div>
              <p className="text-surface-300">
                Modern healthcare management platform for clinics and patients.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-surface-300">
                <li>Appointments</li>
                <li>Medical Records</li>
                <li>Billing</li>
                <li>Prescriptions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-surface-300">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-surface-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@medicare.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Health St, Medical City</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-surface-700 mt-12 pt-8 text-center text-surface-400">
            <p>&copy; 2024 MediCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
