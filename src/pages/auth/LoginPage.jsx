import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, Mail, Lock, ArrowRight, Stethoscope, Users, UserCog, Shield } from 'lucide-react';

const demoAccounts = [
  { email: 'patient@medicare.com', password: 'password123', role: 'Patient', icon: Users, color: 'from-primary-500 to-primary-600', desc: 'Book appointments & view records' },
  { email: 'doctor@medicare.com', password: 'password123', role: 'Doctor', icon: Stethoscope, color: 'from-accent-500 to-accent-600', desc: 'Manage patients & prescriptions' },
  { email: 'reception@medicare.com', password: 'password123', role: 'Receptionist', icon: UserCog, color: 'from-warning-500 to-warning-600', desc: 'Queue management & billing' },
  { email: 'admin@medicare.com', password: 'password123', role: 'Admin', icon: Shield, color: 'from-purple-500 to-purple-600', desc: 'Manage clinic & analytics' },
];

const rolePaths = {
  patient: '/patient',
  doctor: '/doctor',
  receptionist: '/reception',
  admin: '/admin',
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setIsLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate(rolePaths[result.user.role] || '/patient');
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }, 500);
  };

  const handleDemoLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setIsLoading(true);
    setTimeout(() => {
      const result = login(account.email, account.password);
      if (result.success) navigate(rolePaths[result.user.role] || '/patient');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse-slow" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">MediCare</h1>
                <p className="text-white/70 text-sm">Clinic Management System</p>
              </div>
            </Link>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Modern Healthcare<br />
            <span className="text-white/80">Management Platform</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            Streamline your clinic operations with our comprehensive management system. Handle appointments, prescriptions, billing, and more.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { label: 'Appointments', value: '2,500+' },
              { label: 'Doctors', value: '50+' },
              { label: 'Patients', value: '10,000+' },
              { label: 'Satisfaction', value: '98%' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-surface-50">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-surface-800">MediCare</h1>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-surface-800">Welcome back</h2>
            <p className="text-surface-400 mt-1">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-danger-50 border border-danger-100 rounded-xl text-danger-600 text-sm animate-slide-up">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-surface-600 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="input pl-10" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-600 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="input pl-10" />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="btn btn-primary w-full justify-center btn-lg">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-200" /></div>
            <div className="relative flex justify-center"><span className="bg-surface-50 px-3 text-xs text-surface-400 uppercase tracking-wider">Quick Demo Access</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {demoAccounts.map(acc => (
              <button
                key={acc.role}
                onClick={() => handleDemoLogin(acc)}
                disabled={isLoading}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-surface-200 hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-200"
              >
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${acc.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <acc.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-semibold text-surface-600">{acc.role}</span>
                <span className="text-[10px] text-surface-400 text-center leading-tight">{acc.desc}</span>
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-surface-400 mt-6">
            Don't have an account? <Link to="/register" className="text-primary-600 font-medium hover:text-primary-700">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
