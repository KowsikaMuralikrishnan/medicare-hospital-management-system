<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

# 🏥 MediCare — Clinic Management System

A modern, frontend-only medical practice management system designed for small to medium clinics. Built with **React + Vite + TailwindCSS**, MediCare handles patient appointments, doctor schedules, electronic prescriptions, pharmacy inventory, billing, and queue management — all powered by an in-memory data store with JWT-like authentication simulation.

---

## ✨ Features

### 🔐 Authentication & Access Control
- JWT-like token simulation using `localStorage`
- Role-Based Access Control (RBAC) with 4 roles: **Patient**, **Doctor**, **Receptionist**, **Admin**
- Protected routes that redirect unauthorized users
- Pre-seeded demo accounts for instant testing

### 👤 Patient Portal
| Feature | Description |
|---------|-------------|
| **Dashboard** | Upcoming visits, active prescriptions, completed consultations |
| **Find Doctors** | Browse by specialization, search, view ratings & experience |
| **Book Appointment** | Date picker, available time slots, reason for visit |
| **My Appointments** | Filter by status, reschedule with slot selection, cancel |
| **Medical History** | Profile info, consultation timeline, lab reports table |
| **Reports & Documents** | View/download lab reports, print-friendly PDF export |
| **Upload Reports** | Drag-and-drop file upload with preview |

### 🩺 Doctor Consultation Desk
| Feature | Description |
|---------|-------------|
| **Dashboard** | Today's patient queue, stats, recent prescriptions |
| **Consultation Desk** | Select patient → view info & allergies → write prescription → auto-complete |
| **Patient Records** | Search all patients, view full medical records, prescriptions, lab reports |
| **Lab Requests** | Request lab tests/imaging, track status, mark complete |
| **Prescriptions** | View all written prescriptions, print to PDF |

### 🏢 Reception & Billing
| Feature | Description |
|---------|-------------|
| **Dashboard** | Queue count, today's appointments, pending bills, revenue |
| **Patient Registration** | Walk-in registration form with auto queue token generation |
| **Queue Management** | Kanban board — Waiting → In Progress → Completed |
| **Billing & Invoices** | Create invoices with line items, mark paid, print receipts |

### 📊 Admin & Analytics
| Feature | Description |
|---------|-------------|
| **Dashboard** | Revenue chart, low stock alerts, doctor overview table |
| **Doctor Management** | Doctor profile cards with search |
| **Pharmacy Inventory** | Full CRUD, category filter, low stock warnings, reorder levels |
| **Analytics** | Appointment status bars, revenue breakdown, inventory summary |
| **Settings** | General, notifications, security, appearance configuration |

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React 19](https://react.dev) | UI framework |
| [Vite 7](https://vitejs.dev) | Build tool & dev server |
| [TailwindCSS 4](https://tailwindcss.com) | Utility-first styling |
| [React Router 7](https://reactrouter.com) | Client-side routing |
| [Lucide React](https://lucide.dev) | Icon library |
| [date-fns](https://date-fns.org) | Date utilities |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/MediCare.git
cd MediCare

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔑 Demo Accounts

Use the quick-access buttons on the login page, or sign in manually:

| Role | Email | Password |
|------|-------|----------|
| 👤 Patient | `patient@medicare.com` | `patient123` |
| 🩺 Doctor | `doctor@medicare.com` | `doctor123` |
| 🏢 Receptionist | `reception@medicare.com` | `reception123` |
| 🔧 Admin | `admin@medicare.com` | `admin123` |

---

## 📁 Project Structure

```
MediCare/
├── index.html                    # Entry HTML with Inter font
├── vite.config.js                # Vite + TailwindCSS plugin
├── package.json
│
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Router with role-based routes
    ├── index.css                 # TailwindCSS theme & components
    │
    ├── context/
    │   ├── AuthContext.jsx        # Authentication & user management
    │   └── DataContext.jsx        # In-memory data store (CRUD)
    │
    ├── components/
    │   └── layout/
    │       ├── Sidebar.jsx        # Role-aware navigation
    │       ├── Navbar.jsx         # Top bar (search, notifications, profile)
    │       └── DashboardLayout.jsx # Protected layout wrapper
    │
    └── pages/
        ├── auth/
        │   ├── LoginPage.jsx
        │   └── RegisterPage.jsx
        │
        ├── patient/
        │   ├── PatientDashboard.jsx
        │   ├── DoctorListing.jsx
        │   ├── MyAppointments.jsx
        │   ├── MedicalHistory.jsx
        │   ├── PatientReports.jsx
        │   └── UploadReports.jsx
        │
        ├── doctor/
        │   ├── DoctorDashboard.jsx
        │   ├── ConsultationDesk.jsx
        │   ├── PatientRecords.jsx
        │   ├── LabRequests.jsx
        │   └── DoctorPrescriptions.jsx
        │
        ├── reception/
        │   ├── ReceptionDashboard.jsx
        │   ├── PatientRegistration.jsx
        │   ├── QueueManagement.jsx
        │   └── BillingInvoice.jsx
        │
        └── admin/
            ├── AdminDashboard.jsx
            ├── DoctorManagement.jsx
            ├── PharmacyInventory.jsx
            ├── Analytics.jsx
            └── AdminSettings.jsx
```

---

## 🎨 Design System

MediCare uses a custom medical-themed design system built on TailwindCSS:

- **Primary palette** — Teal/Cyan (`#0f766e` → `#14b8a6`)
- **Accent** — Emerald/Green for medical trust
- **Typography** — [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- **Components** — Glassmorphism cards, gradient buttons, animated badges
- **Animations** — Float, pulse, slide-up, fade-in micro-interactions
- **Responsive** — Mobile-first with collapsible sidebar

### Custom CSS Classes

| Class | Usage |
|-------|-------|
| `.card` / `.card-body` | Container cards with shadow & rounded corners |
| `.btn` / `.btn-primary` / `.btn-accent` | Styled buttons with hover states |
| `.badge` / `.badge-success` / `.badge-warning` | Status indicators |
| `.stat-card` | Dashboard metric cards with hover lift |
| `.glass` | Glassmorphism backdrop blur effect |
| `.gradient-primary` / `.gradient-hero` | Gradient backgrounds |
| `.input` | Styled form inputs with focus rings |
| `.table-container` | Scrollable tables with striped rows |
| `.modal-overlay` / `.modal-content` | Modal dialogs |
| `.sidebar` / `.topbar` | Layout navigation components |

---

## 🔄 Data Flow

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  LoginPage  │────▶│ AuthContext   │────▶│ localStorage │
│             │     │ (JWT sim)    │     │ (tokens)     │
└─────────────┘     └──────────────┘     └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │DashboardLayout│
                    │ (role guard) │
                    └──────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Patient  │ │ Doctor   │ │  Admin   │
        │  Pages   │ │  Pages   │ │  Pages   │
        └──────────┘ └──────────┘ └──────────┘
              │            │            │
              └────────────┼────────────┘
                           ▼
                    ┌──────────────┐
                    │ DataContext   │
                    │ (in-memory)  │
                    └──────────────┘
```

- **AuthContext** manages login/logout/register, stores user session in `localStorage`
- **DataContext** holds all application data in React state (appointments, prescriptions, inventory, invoices, queue, documents, notifications)
- **DashboardLayout** checks authentication and role before rendering child routes

---

## 📋 Key Workflows

### Patient Books an Appointment
1. Patient logs in → navigates to **Find Doctors**
2. Searches/filters by specialization → clicks **Book Appointment**
3. Selects date → picks available time slot → enters reason
4. Appointment created in `DataContext` with status `pending`

### Doctor Completes a Consultation
1. Doctor logs in → opens **Consultation Desk**
2. Selects patient from today's queue (left panel)
3. Views patient info, allergies, and previous prescriptions
4. Writes diagnosis, adds medicines, saves prescription
5. Appointment auto-updated to `completed`

### Receptionist Registers a Walk-in
1. Receptionist opens **Register Patient**
2. Fills in name, phone, assigns doctor
3. Patient registered in `AuthContext`, queue token generated
4. Token appears in **Queue Management** (Kanban board)

### Admin Reviews Analytics
1. Admin logs in → sees revenue chart, low stock alerts
2. Navigates to **Analytics** for appointment breakdowns
3. Checks **Pharmacy Inventory** for restocking needs

---

## 🧪 Testing

### Build Verification
```bash
npm run build
# ✅ 1781 modules transformed
# ✅ 385KB JS (104KB gzip)
# ✅ 48KB CSS (8.5KB gzip)
# ✅ Zero errors
```

### Manual Testing
1. Open http://localhost:5173
2. Use demo buttons to log in as each role
3. Navigate through all sidebar menu items
4. Test CRUD operations (book/cancel appointments, write prescriptions, create invoices)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <strong>MediCare Team</strong>
</p>
