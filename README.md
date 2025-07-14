# CleanEase Pro - Smart Cleaning CRM Platform

> **A comprehensive WhatsApp-first CRM and appointment management platform designed specifically for cleaning companies**

![CleanEase Pro](https://img.shields.io/badge/Platform-Web%20%2B%20WhatsApp-blue) ![Tech Stack](https://img.shields.io/badge/Tech-React%20%2B%20PHP%20%2B%20MySQL-green) ![Language](https://img.shields.io/badge/Language-Arabic%20%2B%20English-orange) ![Status](https://img.shields.io/badge/Status-Development-yellow)

## 🌟 Overview

CleanEase Pro is a modern, production-ready CRM system designed specifically for cleaning service companies in the Saudi Arabian market. The platform combines powerful admin dashboard functionality with seamless WhatsApp integration, providing a complete solution for appointment management, customer relationships, invoicing, and business automation.

### Key Features

- 🇸🇦 **Arabic-First Design** - Complete RTL support with Arabic as the primary language
- 📱 **WhatsApp-First Approach** - All customer interactions via Meta Cloud WhatsApp API
- 👨‍💼 **Comprehensive Admin Dashboard** - Full management interface for all operations
- 🔐 **Enterprise Security** - JWT authentication with role-based access control
- 📊 **Advanced Analytics** - Real-time business insights and reporting
- 🤖 **Smart Automation** - Automated workflows and chatbot integration
- 💳 **Multi-Payment Support** - Saudi payment methods (Mada, STC Pay, etc.)
- 🌐 **Multi-Language** - Seamless Arabic/English language switching

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript and strict typing
- **Tailwind CSS** with custom Arabic design system
- **Zustand** for state management with persistence
- **React Router v6** with protected routes
- **React Hook Form + Zod** for form handling and validation
- **Radix UI** for accessible component primitives
- **Lucide React** for comprehensive icon library
- **Axios** with interceptors for API communication

### Backend
- **PHP 8.1+** with Slim Framework 4
- **MySQL 8.0** with optimized schema design
- **JWT Authentication** with secure token handling
- **PSR-4 Autoloading** and modern PHP practices
- **Composer** for dependency management
- **RESTful API** design with comprehensive endpoints

### Integration & Services
- **Meta Cloud WhatsApp API** for messaging
- **SMTP Email** integration (Gmail, Hostinger, etc.)
- **Twilio SMS** for additional notifications
- **File Upload** with security validation
- **PDF Generation** for invoices and reports

### DevOps & Deployment
- **Vite** for fast frontend development and building
- **Docker** support for containerized deployment
- **Vercel** for frontend hosting (recommended)
- **Hostinger/Railway** for backend hosting
- **GitHub Actions** for CI/CD pipeline

## 📁 Project Structure

```
cleanease-pro/
├── frontend/                    # React TypeScript Application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── contexts/           # React contexts (Auth, Language)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── layouts/            # Layout wrappers (Admin, Auth)
│   │   ├── pages/              # Route-based page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Appointments.tsx
│   │   │   ├── Customers.tsx
│   │   │   ├── Invoices.tsx
│   │   │   ├── Inventory.tsx
│   │   │   ├── Tickets.tsx
│   │   │   ├── PricingRules.tsx
│   │   │   ├── AutomationRules.tsx
│   │   │   ├── ChatbotBuilder.tsx
│   │   │   ├── Analytics.tsx
│   │   │   └── Settings.tsx
│   │   ├── services/           # API integration services
│   │   ├── store/              # Zustand state management
│   │   ├── styles/             # Tailwind + custom CSS
│   │   ├── types/              # TypeScript type definitions
│   │   └── utils/              # Utility functions
│   ├── public/                 # Static assets
│   └── package.json           # Dependencies and scripts
├── backend/                     # PHP Slim API
│   ├── api/
│   │   ├── routes/             # API route definitions
│   │   ├── controllers/        # Business logic handlers
│   │   ├── models/             # Database models
│   │   ├── middleware/         # Authentication, CORS, etc.
│   │   ├── services/           # Business services
│   │   └── webhooks/           # WhatsApp webhook handlers
│   ├── public/
│   │   └── index.php          # API entry point
│   └── composer.json          # PHP dependencies
├── database/                    # Database management
│   ├── migrations/             # SQL schema migrations
│   └── seeders/               # Initial data seeders
├── docs/                       # Documentation
├── deploy/                     # Deployment configurations
├── mock-api/                   # Development mock server
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **PHP 8.1+** with required extensions
- **MySQL 8.0** or compatible database
- **Composer** for PHP dependencies
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cleanease-pro
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   composer install
   ```

4. **Database setup**
   ```bash
   # Create database
   mysql -u root -p -e "CREATE DATABASE cleanease_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   
   # Run migrations
   mysql -u root -p cleanease_pro < database/migrations/001_create_tables.sql
   
   # Seed initial data
   mysql -u root -p cleanease_pro < database/seeders/001_initial_data.sql
   ```

5. **Environment configuration**
   ```bash
   # Backend environment
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database and API credentials
   
   # Frontend environment
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your API URL
   ```

6. **Start development servers**
   ```bash
   # Option 1: Use mock API for development
   cd mock-api && npm install && npm start
   cd frontend && npm run dev
   
   # Option 2: Use PHP backend
   cd backend && php -S localhost:8000 -t public
   cd frontend && npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Mock API: http://localhost:8000
   - Login: admin@cleanease.pro / password

## 📱 Core Features Implemented

### ✅ Phase 1 - Frontend Foundation (Completed)
- [x] React TypeScript application with strict typing
- [x] Comprehensive UI component library
- [x] Arabic/English RTL language support
- [x] Authentication system with JWT
- [x] Dashboard with real-time analytics
- [x] All 11 core pages implemented
- [x] Responsive mobile-first design
- [x] State management with Zustand
- [x] Form handling with validation

### 🔄 Phase 2 - Backend Implementation (In Progress)
- [x] PHP Slim framework setup
- [x] MySQL database schema design
- [x] Basic authentication endpoints
- [x] Mock API for development
- [ ] Complete PHP API implementation
- [ ] WhatsApp Cloud API integration
- [ ] Email and SMS services
- [ ] File upload handling
- [ ] PDF generation for invoices

### 🔄 Phase 3 - Advanced Features (Planned)
- [ ] WhatsApp chatbot builder
- [ ] Automation rules engine
- [ ] Advanced analytics dashboard
- [ ] Inventory management system
- [ ] Support ticket system
- [ ] Pricing rules engine
- [ ] Invoice generation and delivery

## 🛡️ Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt
- **Rate Limiting** to prevent API abuse
- **CORS Protection** with configurable origins
- **Input Validation** using Zod schemas
- **Activity Logging** for audit trails

## 🌐 Multi-Language Support

### Languages Supported
- **Arabic (ar)** - Primary language with full RTL support
- **English (en)** - Secondary language

### RTL Implementation
- Automatic direction switching based on language
- Mirrored layouts and component positioning
- Arabic typography with Tajawal font
- Proper text alignment and icon positioning

## 📊 Screenshots

### Login Page
![Login Page](https://github.com/user-attachments/assets/7127b147-bc7b-4f2d-adcf-228d870c5e45)

### Dashboard - Arabic RTL
![Dashboard Arabic](https://github.com/user-attachments/assets/4a9eedda-f218-452d-b0c5-d5f0a2066a74)

### Dashboard - English LTR
![Dashboard English](https://github.com/user-attachments/assets/d86d556d-eb46-4c7a-89f7-c7684f3cce29)

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### Backend (Hostinger/Railway)
```bash
cd backend
# Upload files via FTP or deploy to Railway
# Ensure .env file is configured for production
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, questions, or feature requests:
- **Email**: support@cleanease.pro
- **WhatsApp**: +966 50 123 4567

---

**Built with ❤️ for the Saudi Arabian cleaning services market** 