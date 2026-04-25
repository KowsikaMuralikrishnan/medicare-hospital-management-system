import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, Menu, X, LogOut, Bell, Trash2 } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New appointment request from patient', timestamp: 'Just now' },
    { id: 2, message: 'Doctor profile updated successfully', timestamp: '2 hours ago' },
    { id: 3, message: 'New prescription submitted', timestamp: '5 hours ago' }
  ]);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
      if (notificationRef.current && !notificationRef.current.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNavClick = (link) => {
    setShowMobileMenu(false);
    
    if (link.route) {
      // Navigate to route
      navigate(link.route);
    } else if (link.id) {
      // Scroll to section
      if (location.pathname === '/') {
        const element = document.getElementById(link.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home and scroll
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(link.id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowProfile(false);
  };

  const handleLogoClick = () => {
    // Only navigate to home if user is not logged in
    if (!user) {
      navigate('/');
    }
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'Services', id: 'services' },
    { label: 'Emergency', id: 'emergency' },
    { label: 'About', id: 'about' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Location', route: '/locations' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact Us', id: 'contact' }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - only show when not logged in */}
          {!user && (
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient hidden sm:inline">MediCare</span>
            </div>
          )}

          {/* Desktop Navigation and right section */}
          {user ? (
            <div className="flex items-center gap-4 ml-auto">
              {/* Notification Icon */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-surface-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5 text-surface-600" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                      {notifications.length}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-surface-100 overflow-hidden">
                    <div className="p-4 border-b border-surface-100 flex items-center justify-between">
                      <h3 className="font-semibold text-surface-800">Notifications</h3>
                      {notifications.length > 0 && (
                        <button
                          onClick={clearAllNotifications}
                          className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notif => (
                          <div key={notif.id} className="p-3 border-b border-surface-50 hover:bg-surface-50 transition-colors flex items-start gap-3 group">
                            <div className="w-3 h-3 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-surface-700">{notif.message}</p>
                              <p className="text-xs text-surface-400 mt-1">{notif.timestamp}</p>
                            </div>
                            <button
                              onClick={() => removeNotification(notif.id)}
                              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity text-surface-400 hover:text-danger-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-surface-400">
                          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Icon */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-sm font-semibold">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-surface-700">{user.name}</span>
                </button>
                {showProfile && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-surface-100 overflow-hidden">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 p-3 text-sm text-danger-500 hover:bg-danger-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* full nav for guests */}
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id || link.route}
                    onClick={() => handleNavClick(link)}
                    className="text-surface-600 hover:text-primary-600 font-medium transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Login
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden p-2 hover:bg-surface-100 rounded-lg transition-colors"
                >
                  {showMobileMenu ? (
                    <X className="w-6 h-6 text-surface-600" />
                  ) : (
                    <Menu className="w-6 h-6 text-surface-600" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {!user && showMobileMenu && (
          <div className="lg:hidden flex flex-col gap-2 mt-4 pt-4 border-t border-surface-100">
            {navLinks.map((link) => (
              <button
                key={link.id || link.route}
                onClick={() => handleNavClick(link)}
                className="text-left px-4 py-2 text-surface-600 hover:text-primary-600 hover:bg-surface-50 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
