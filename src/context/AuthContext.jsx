import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'medicare_users';
const TOKEN_KEY = 'medicare_token';

const defaultUsers = [
  { id: 'u1', name: 'John Patient', email: 'patient@medicare.com', password: 'password123', role: 'patient', phone: '555-0101', avatar: null },
  { id: 'u2', name: 'Dr. Sarah Wilson', email: 'doctor@medicare.com', password: 'password123', role: 'doctor', phone: '555-0102', avatar: null, specialization: 'Cardiologist', experience: 12 },
  { id: 'u3', name: 'Dr. Michael Chen', email: 'doctor2@medicare.com', password: 'password123', role: 'doctor', phone: '555-0103', avatar: null, specialization: 'Dermatologist', experience: 8 },
  { id: 'u4', name: 'Dr. Emily Rodriguez', email: 'doctor3@medicare.com', password: 'password123', role: 'doctor', phone: '555-0104', avatar: null, specialization: 'Neurologist', experience: 15 },
  { id: 'u5', name: 'Dr. James Smith', email: 'doctor4@medicare.com', password: 'password123', role: 'doctor', phone: '555-0105', avatar: null, specialization: 'Orthopedic', experience: 10 },
  { id: 'u6', name: 'Dr. Lisa Park', email: 'doctor5@medicare.com', password: 'password123', role: 'doctor', phone: '555-0106', avatar: null, specialization: 'Pediatrician', experience: 7 },
  { id: 'u7', name: 'Dr. Robert Brown', email: 'doctor6@medicare.com', password: 'password123', role: 'doctor', phone: '555-0107', avatar: null, specialization: 'ENT Specialist', experience: 20 },
  { id: 'u8', name: 'Dr. Amanda White', email: 'doctor7@medicare.com', password: 'password123', role: 'doctor', phone: '555-0108', avatar: null, specialization: 'Ophthalmologist', experience: 9 },
  { id: 'u9', name: 'Dr. David Lee', email: 'doctor8@medicare.com', password: 'password123', role: 'doctor', phone: '555-0109', avatar: null, specialization: 'General Physician', experience: 5 },
  { id: 'u10', name: 'Mary Receptionist', email: 'reception@medicare.com', password: 'password123', role: 'receptionist', phone: '555-0110', avatar: null },
  { id: 'u11', name: 'Admin User', email: 'admin@medicare.com', password: 'password123', role: 'admin', phone: '555-0111', avatar: null },
  { id: 'u12', name: 'Alice Johnson', email: 'alice@medicare.com', password: 'password123', role: 'patient', phone: '555-0112', avatar: null },
  { id: 'u13', name: 'Bob Williams', email: 'bob@medicare.com', password: 'password123', role: 'patient', phone: '555-0113', avatar: null },
  // Additional doctors for each specialization
  { id: 'u14', name: 'Dr. Jennifer Adams', email: 'doctor9@medicare.com', password: 'password123', role: 'doctor', phone: '555-0114', avatar: null, specialization: 'Cardiologist', experience: 14 },
  { id: 'u15', name: 'Dr. Thomas Garcia', email: 'doctor10@medicare.com', password: 'password123', role: 'doctor', phone: '555-0115', avatar: null, specialization: 'Cardiologist', experience: 18 },
  { id: 'u16', name: 'Dr. Rachel Kim', email: 'doctor11@medicare.com', password: 'password123', role: 'doctor', phone: '555-0116', avatar: null, specialization: 'Dermatologist', experience: 11 },
  { id: 'u17', name: 'Dr. Kevin Patel', email: 'doctor12@medicare.com', password: 'password123', role: 'doctor', phone: '555-0117', avatar: null, specialization: 'Dermatologist', experience: 6 },
  { id: 'u18', name: 'Dr. Maria Santos', email: 'doctor13@medicare.com', password: 'password123', role: 'doctor', phone: '555-0118', avatar: null, specialization: 'Neurologist', experience: 22 },
  { id: 'u19', name: 'Dr. Christopher Wong', email: 'doctor14@medicare.com', password: 'password123', role: 'doctor', phone: '555-0119', avatar: null, specialization: 'Neurologist', experience: 9 },
  { id: 'u20', name: 'Dr. Jessica Taylor', email: 'doctor15@medicare.com', password: 'password123', role: 'doctor', phone: '555-0120', avatar: null, specialization: 'Orthopedic', experience: 16 },
  { id: 'u21', name: 'Dr. Daniel Martinez', email: 'doctor16@medicare.com', password: 'password123', role: 'doctor', phone: '555-0121', avatar: null, specialization: 'Orthopedic', experience: 13 },
  { id: 'u22', name: 'Dr. Sophia Johnson', email: 'doctor17@medicare.com', password: 'password123', role: 'doctor', phone: '555-0122', avatar: null, specialization: 'Pediatrician', experience: 10 },
  { id: 'u23', name: 'Dr. Alexander Lee', email: 'doctor18@medicare.com', password: 'password123', role: 'doctor', phone: '555-0123', avatar: null, specialization: 'Pediatrician', experience: 8 },
  { id: 'u24', name: 'Dr. Olivia Davis', email: 'doctor19@medicare.com', password: 'password123', role: 'doctor', phone: '555-0124', avatar: null, specialization: 'ENT Specialist', experience: 12 },
  { id: 'u25', name: 'Dr. William Thompson', email: 'doctor20@medicare.com', password: 'password123', role: 'doctor', phone: '555-0125', avatar: null, specialization: 'ENT Specialist', experience: 17 },
  { id: 'u26', name: 'Dr. Isabella Rodriguez', email: 'doctor21@medicare.com', password: 'password123', role: 'doctor', phone: '555-0126', avatar: null, specialization: 'Ophthalmologist', experience: 14 },
  { id: 'u27', name: 'Dr. Ethan Wilson', email: 'doctor22@medicare.com', password: 'password123', role: 'doctor', phone: '555-0127', avatar: null, specialization: 'Ophthalmologist', experience: 7 },
  { id: 'u28', name: 'Dr. Ava Chen', email: 'doctor23@medicare.com', password: 'password123', role: 'doctor', phone: '555-0128', avatar: null, specialization: 'General Physician', experience: 11 },
  { id: 'u29', name: 'Dr. Noah Brown', email: 'doctor24@medicare.com', password: 'password123', role: 'doctor', phone: '555-0129', avatar: null, specialization: 'General Physician', experience: 9 },
  { id: 'u30', name: 'Dr. Mia Garcia', email: 'doctor25@medicare.com', password: 'password123', role: 'doctor', phone: '555-0130', avatar: null, specialization: 'General Physician', experience: 6 }
];

function getUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateToken(user) {
  const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
  return btoa(JSON.stringify(payload));
}

function decodeToken(token) {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        const users = getUsers();
        const fullUser = users.find(u => u.id === decoded.id);
        if (fullUser) {
          const { password, ...safeUser } = fullUser;
          setUser(safeUser);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password' };
    const token = generateToken(found);
    localStorage.setItem(TOKEN_KEY, token);
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    return { success: true, user: safeUser };
  };

  const register = (userData) => {
    const users = getUsers();
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser = {
      id: 'u' + Date.now(),
      ...userData,
      role: userData.role || 'patient',
      avatar: null,
    };
    users.push(newUser);
    saveUsers(users);
    const token = generateToken(newUser);
    localStorage.setItem(TOKEN_KEY, token);
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    return { success: true, user: safeUser };
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const getDoctors = () => {
    return getUsers().filter(u => u.role === 'doctor').map(({ password, ...d }) => d);
  };

  const getAllPatients = () => {
    return getUsers().filter(u => u.role === 'patient').map(({ password, ...p }) => p);
  };

  const updateDoctor = (doctorId, updates) => {
    const users = getUsers();
    const doctorIndex = users.findIndex(u => u.id === doctorId && u.role === 'doctor');
    if (doctorIndex !== -1) {
      users[doctorIndex] = { ...users[doctorIndex], ...updates };
      saveUsers(users);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, getDoctors, getAllPatients, updateDoctor }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be within AuthProvider');
  return ctx;
}

export default AuthContext;
