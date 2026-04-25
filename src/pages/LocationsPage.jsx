import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Phone, Clock, Star, ArrowLeft, Navigation, Car, Train, Plane } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: 'MediCare Downtown Clinic',
    address: '123 Medical Center Drive, Downtown, NY 10001',
    phone: '+1 (555) 123-4567',
    hours: 'Mon-Fri: 8AM-8PM, Sat: 9AM-5PM, Sun: 10AM-4PM',
    rating: 4.8,
    reviews: 245,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: ['General Medicine', 'Cardiology', 'Dermatology', 'Laboratory'],
    coordinates: { lat: 40.7589, lng: -73.9851 },
    parking: 'Underground parking available',
    publicTransport: 'Subway: 4,5,6 trains at Grand Central',
    emergency: '24/7 Emergency services available'
  },
  {
    id: 2,
    name: 'MediCare Westside Medical Center',
    address: '456 Health Boulevard, Westside, NY 10002',
    phone: '+1 (555) 234-5678',
    hours: 'Mon-Fri: 7AM-9PM, Sat: 8AM-6PM, Sun: 9AM-5PM',
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: ['Emergency Care', 'Surgery', 'Pediatrics', 'Radiology'],
    coordinates: { lat: 40.7831, lng: -73.9712 },
    parking: 'Valet parking and surface lot',
    publicTransport: 'Bus: M104, M10, M11',
    emergency: 'Level 1 Trauma Center'
  },
  {
    id: 3,
    name: 'MediCare Eastside Specialty Clinic',
    address: '789 Wellness Avenue, Eastside, NY 10003',
    phone: '+1 (555) 345-6789',
    hours: 'Mon-Fri: 9AM-7PM, Sat: 10AM-4PM, Closed Sunday',
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: ['Orthopedics', 'Physical Therapy', 'Sports Medicine'],
    coordinates: { lat: 40.7505, lng: -73.9934 },
    parking: 'Street parking and nearby garage',
    publicTransport: 'Subway: L train at 3rd Ave',
    emergency: 'Urgent care available during business hours'
  },
  {
    id: 4,
    name: 'MediCare North Medical Plaza',
    address: '321 Care Street, North District, NY 10004',
    phone: '+1 (555) 456-7890',
    hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-3PM, Closed Sunday',
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: ['Family Medicine', 'Internal Medicine', 'Mental Health'],
    coordinates: { lat: 40.7282, lng: -74.0078 },
    parking: 'Public parking garage nearby',
    publicTransport: 'Subway: 1,2,3 trains at Chambers St',
    emergency: 'Telemedicine available after hours'
  }
];

export default function LocationsPage() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);

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
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-600 py-16">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')"}} />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Locations
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Find a MediCare facility near you. We have multiple locations across the city to serve your healthcare needs.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-surface-800 mb-4">Find Us on the Map</h2>
            <p className="text-surface-600">Click on any location to view detailed information</p>
          </div>

          {/* Google Maps Integration */}
          <div className="bg-surface-100 rounded-2xl h-96 mb-8 overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sManhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MediCare Locations Map"
            ></iframe>
          </div>

          {/* Location Markers Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-surface-50 rounded-lg p-4 text-center cursor-pointer hover:bg-primary-50 transition-colors"
                onClick={() => setSelectedLocation(location)}
              >
                <MapPin className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <h4 className="font-semibold text-surface-800 text-sm mb-1">{location.name.split(' ')[1]}</h4>
                <p className="text-surface-600 text-xs">{location.address.split(',')[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <div key={location.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning-400 fill-current" />
                      <span className="text-sm font-medium">{location.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-surface-800 mb-2">{location.name}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span className="text-surface-600 text-sm">{location.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-surface-600 text-sm">{location.phone}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span className="text-surface-600 text-sm">{location.hours}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-surface-800 mb-2">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {location.services.map((service, index) => (
                        <span key={index} className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Car className="w-4 h-4 text-primary-500" />
                      <span className="text-surface-600">{location.parking}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Train className="w-4 h-4 text-primary-500" />
                      <span className="text-surface-600">{location.publicTransport}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedLocation(location)}
                      className="flex-1 btn btn-secondary btn-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => navigate('/login')}
                      className="flex-1 btn btn-primary btn-sm"
                    >
                      Book Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Details Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-surface-800 mb-2">{selectedLocation.name}</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-warning-400 fill-current" />
                    <span className="text-sm font-medium">{selectedLocation.rating} ({selectedLocation.reviews} reviews)</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-surface-400 hover:text-surface-600"
                >
                  ✕
                </button>
              </div>

              <img
                src={selectedLocation.image}
                alt={selectedLocation.name}
                className="w-full h-48 object-cover rounded-xl mb-6"
              />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-surface-800">Address</p>
                    <p className="text-surface-600">{selectedLocation.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-500" />
                  <div>
                    <p className="font-medium text-surface-800">Phone</p>
                    <p className="text-surface-600">{selectedLocation.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-surface-800">Hours</p>
                    <p className="text-surface-600">{selectedLocation.hours}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-surface-800 mb-2">Emergency Services</p>
                  <p className="text-surface-600">{selectedLocation.emergency}</p>
                </div>

                <div>
                  <p className="font-medium text-surface-800 mb-2">Transportation</p>
                  <div className="space-y-1 text-sm text-surface-600">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4" />
                      <span>{selectedLocation.parking}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Train className="w-4 h-4" />
                      <span>{selectedLocation.publicTransport}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    // In a real app, this would open Google Maps directions
                    window.open(`https://maps.google.com/?q=${selectedLocation.coordinates.lat},${selectedLocation.coordinates.lng}`, '_blank');
                  }}
                  className="flex-1 btn btn-secondary"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="flex-1 btn btn-primary"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}