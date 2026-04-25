import { Settings as SettingsIcon, Bell, Shield, Globe, Palette } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-800">Settings</h1>
        <p className="text-surface-400 mt-1">Manage clinic configuration and preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold text-surface-800">General</h3>
                <p className="text-xs text-surface-400">Clinic name, address, and contact</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1">Clinic Name</label>
                <input defaultValue="MediCare Clinic" className="input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1">Phone</label>
                <input defaultValue="555-0001" className="input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1">Address</label>
                <input defaultValue="123 Healthcare Ave, Medical City" className="input" />
              </div>
              <button className="btn btn-primary btn-sm">Save Changes</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-accent-500" />
              </div>
              <div>
                <h3 className="font-semibold text-surface-800">Notifications</h3>
                <p className="text-xs text-surface-400">Configure notification preferences</p>
              </div>
            </div>
            <div className="space-y-3">
              {['Email Reminders', 'SMS Notifications', 'Report Ready Alerts', 'Broadcast Announcements'].map(item => (
                <div key={item} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                  <span className="text-sm text-surface-700">{item}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-surface-200 peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-warning-50 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-warning-500" />
              </div>
              <div>
                <h3 className="font-semibold text-surface-800">Security</h3>
                <p className="text-xs text-surface-400">Authentication and access control</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                <span className="text-sm text-surface-700">Two-Factor Authentication</span>
                <span className="badge badge-success">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                <span className="text-sm text-surface-700">Session Timeout</span>
                <span className="text-sm text-surface-500">30 minutes</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                <span className="text-sm text-surface-700">Password Policy</span>
                <span className="text-sm text-surface-500">Min 6 characters</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-surface-800">Appearance</h3>
                <p className="text-xs text-surface-400">Customize the UI theme</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                <span className="text-sm text-surface-700">Theme</span>
                <span className="text-sm text-surface-500">Light</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                <span className="text-sm text-surface-700">Primary Color</span>
                <div className="w-6 h-6 rounded-full bg-primary-500 border-2 border-white shadow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
