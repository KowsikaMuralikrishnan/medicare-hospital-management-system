🏥 MediCare — Smart Clinic Management System

A full-stack healthcare management platform designed for small and medium-sized clinics. MediCare streamlines patient registration, appointment scheduling, doctor consultations, electronic prescriptions, pharmacy inventory, billing, and analytics through a secure role-based system.

Built using React, Spring Boot, MongoDB, JWT Authentication, and REST APIs, MediCare provides a modern and scalable solution for digital healthcare management.

---

✨ Features

🔐 Authentication & Security

- JWT Authentication
- Secure Login & Registration
- Password Encryption using Spring Security
- Role-Based Access Control (RBAC)
- Session Management
- Protected Routes
- Unauthorized Access Prevention

Supported Roles

- 👤 Patient
- 🩺 Doctor
- 🏢 Receptionist
- 🔧 Admin

---

👤 Patient Module

Dashboard

- Upcoming Appointments
- Recent Consultations
- Active Prescriptions
- Medical Summary

Appointment Management

- Search Doctors
- Filter by Specialization
- Book Appointments
- Reschedule Appointments
- Cancel Appointments
- View Appointment Status

Medical Records

- Consultation History
- Prescription Records
- Laboratory Reports
- Download Medical Documents

Profile Management

- Update Personal Information
- View Medical Details

---

🩺 Doctor Module

Dashboard

- Today's Schedule
- Pending Consultations
- Recent Prescriptions
- Patient Statistics

Consultation Desk

- View Patient Information
- Access Medical History
- Check Allergies
- Write Prescriptions
- Add Diagnosis Notes

Prescription Management

- Create Prescriptions
- View Previous Prescriptions
- Generate Printable Prescriptions

Lab Management

- Request Lab Tests
- Track Lab Reports
- Update Test Status

---

🏢 Receptionist Module

Patient Registration

- Register Walk-In Patients
- Assign Doctors
- Generate Queue Tokens

Queue Management

- Waiting Queue
- In Progress Queue
- Completed Queue

Appointment Management

- Schedule Visits
- Update Appointment Status

Billing

- Generate Invoices
- Manage Payments
- Print Receipts

---

🔧 Admin Module

User Management

- Manage Patients
- Manage Doctors
- Manage Receptionists

Pharmacy Inventory

- Add Medicines
- Update Stock
- Delete Inventory
- Low Stock Alerts
- Reorder Notifications

Analytics Dashboard

- Revenue Analysis
- Appointment Statistics
- Inventory Reports
- Doctor Performance Overview

System Settings

- Security Settings
- Notification Preferences
- Appearance Settings

---

🛠 Tech Stack

Technology| Purpose
React 19| Frontend Development
Vite| Build Tool
Tailwind CSS| UI Styling
React Router| Navigation
Spring Boot| Backend Development
Spring Security| Authentication & Authorization
JWT| Secure Token Management
MongoDB| Database
Spring Data MongoDB| Data Access Layer
REST APIs| Frontend-Backend Communication
Lucide React| Icons
date-fns| Date Utilities

---

🏗 System Architecture

┌───────────────────┐
│ React Frontend    │
└─────────┬─────────┘
          │ REST API
          ▼
┌───────────────────┐
│ Spring Boot       │
│ Backend           │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ MongoDB Database  │
└───────────────────┘

---

📁 Project Structure

MediCare
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/main/java
│   │
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── security/
│   ├── config/
│   └── dto/
│
│   └── application.properties
│
└── README.md

---

🚀 Installation

Prerequisites

- Java 17+
- Node.js 18+
- MongoDB
- Maven

Clone Repository

git clone https://github.com/your-username/MediCare.git
cd MediCare

Backend Setup

cd backend

mvn clean install

mvn spring-boot:run

Backend runs on:

http://localhost:8080

Frontend Setup

cd frontend

npm install

npm run dev

Frontend runs on:

http://localhost:5173

---

🔐 Security Features

- JWT Token Authentication
- Password Encryption (BCrypt)
- Role-Based Authorization
- Secure API Endpoints
- Protected Routes
- Session Management

---

📊 Key Highlights

✅ Full Stack Application

✅ React + Spring Boot Architecture

✅ MongoDB Database Integration

✅ JWT Authentication

✅ Spring Security

✅ Role-Based Access Control

✅ Responsive User Interface

✅ RESTful APIs

✅ Appointment Scheduling System

✅ Electronic Prescriptions

✅ Pharmacy Inventory Management

✅ Billing & Invoice Generation

✅ Analytics Dashboard

---

🎯 Future Enhancements

- SMS Appointment Notifications
- Email Reminders
- Online Payments
- AI Symptom Checker
- Video Consultation
- Electronic Health Records (EHR)
- AWS Cloud Deployment
- Multi-Clinic Support

---

👨‍💻 Developed By

KOWSIKA M 
Final Year Computer Science Engineering Student

Technologies Used

React • Spring Boot • MongoDB • JWT • Spring Security • Tailwind CSS • REST APIs

---

⭐ If you like this project, don't forget to give it a star on GitHub!
