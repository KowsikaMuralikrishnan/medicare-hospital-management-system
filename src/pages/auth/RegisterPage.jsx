import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) { setError('Please fill in all required fields'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setIsLoading(true);
    setTimeout(() => {
      const result = register({ name: form.name, email: form.email, password: form.password, phone: form.phone, role: 'patient' });
      if (result.success) navigate('/patient');
      else setError(result.error);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-50">
      <div className="w-full max-w-md animate-slide-up">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-surface-800">MediCare</h1>
          </Link>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="text-xl font-bold text-surface-800 text-center mb-1">Create Account</h2>
            <p className="text-surface-400 text-sm text-center mb-6">Register as a new patient</p>

            {error && (
              <div className="mb-4 p-3 bg-danger-50 border border-danger-100 rounded-xl text-danger-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="input pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1.5">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="input pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1.5">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="555-0100" className="input pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1.5">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" className="input pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1.5">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" className="input pl-10" />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="btn btn-primary w-full justify-center btn-lg mt-2">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-surface-400 mt-4">
              Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
