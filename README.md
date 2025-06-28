# Clean Master – Smart Cleaning Appointment Platform

> **A comprehensive web-based booking system in Arabic (RTL) for cleaning services with WhatsApp bot integration**

![Clean Master Platform](https://img.shields.io/badge/Platform-Web%20%2B%20Mobile-blue) ![Language](https://img.shields.io/badge/Language-Arabic%20RTL-green) ![Status](https://img.shields.io/badge/Status-Development-orange)

## 🌟 Overview

Clean Master is a modern, comprehensive cleaning services platform designed specifically for the Saudi Arabian market. The platform features Arabic-first design with RTL support, WhatsApp bot integration, and a complete booking management system.

### Key Features

- 🇸🇦 **Arabic-First Design** - Native RTL support with Arabic as the default language
- 📱 **Mobile-First UI** - Responsive design optimized for mobile devices
- 🤖 **WhatsApp Bot Integration** - AI-powered chatbot for bookings and customer support
- 👨‍💼 **Admin Dashboard** - Comprehensive management panel for services and bookings
- 🔐 **JWT Authentication** - Secure user authentication with role-based access
- 📊 **Analytics & Reporting** - Built-in analytics for business insights
- 💳 **Multi-Payment Support** - Ready for various payment methods
- 🌐 **Multilingual** - Arabic and English language support

## 🛠️ Technology Stack

### Frontend
- **React.js 18** - Modern React with hooks and context
- **Tailwind CSS** - Utility-first CSS framework with custom Arabic styling
- **React Router DOM** - Client-side routing
- **React i18next** - Internationalization with Arabic RTL support
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful SVG icons
- **React Hook Form + Zod** - Form handling and validation
- **Axios** - HTTP client for API communication

### Backend
- **Node.js + Express** - RESTful API server
- **MongoDB + Mongoose** - NoSQL database with ODM
- **JWT** - Token-based authentication
- **Bcrypt.js** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting

### DevOps & Deployment
- **Vite** - Fast frontend build tool
- **Nodemon** - Development auto-restart
- **Vercel** - Frontend deployment (recommended)
- **Railway/DigitalOcean** - Backend deployment (recommended)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clean-master
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies
   npm run install:all
   
   # Or install manually:
   cd client && npm install
   cd ../server && npm install
   cd ../whatsapp-bot && npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp server/.env.example server/.env
   
   # Edit the .env file with your configuration
   nano server/.env
   ```

4. **Database Setup**
   - Start MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in your `.env` file

5. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually:
   npm run client:dev  # Frontend on http://localhost:5173
   npm run server:dev  # Backend on http://localhost:5000
   ```

## 📁 Project Structure

```
clean-master/
├── client/                 # React.js Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── i18n/          # Internationalization
│   │   ├── contexts/      # React contexts
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js Backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── controllers/      # Route controllers
│   └── package.json
├── whatsapp-bot/         # WhatsApp Bot Integration
│   ├── handlers/         # Message handlers
│   ├── services/         # Business logic
│   └── package.json
└── README.md
```

## 🎨 UI/UX Features

### Design System
- **Blue gradient theme** - Professional and clean aesthetic
- **Rounded UI elements** - Modern, friendly appearance
- **Arabic typography** - Tajawal font for Arabic, Inter for English
- **Custom animations** - Smooth transitions and micro-interactions
- **Mobile-first approach** - Optimized for touch interfaces

### User Experience
- **Intuitive booking flow** - 4-step booking process
- **Real-time validation** - Instant feedback on form inputs
- **Loading states** - Visual feedback during operations
- **Error handling** - User-friendly error messages in Arabic
- **Responsive navigation** - Collapsible mobile menu

## 🔧 API Documentation

### Authentication Endpoints
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
GET  /api/auth/me          # Get current user
PUT  /api/auth/me          # Update profile
POST /api/auth/logout      # Logout user
```

### Services Endpoints
```
GET    /api/services           # Get all services
GET    /api/services/:id       # Get single service
POST   /api/services           # Create service (Admin)
PUT    /api/services/:id       # Update service (Admin)
DELETE /api/services/:id       # Delete service (Admin)
```

### Bookings Endpoints
```
GET    /api/bookings           # Get user bookings
GET    /api/bookings/:id       # Get single booking
POST   /api/bookings           # Create booking
PUT    /api/bookings/:id       # Update booking
PUT    /api/bookings/:id/cancel # Cancel booking
```

### Admin Endpoints
```
GET /api/admin/dashboard        # Dashboard statistics
GET /api/admin/bookings         # All bookings with filters
PUT /api/admin/bookings/:id/status  # Update booking status
PUT /api/admin/bookings/:id/assign  # Assign staff to booking
```

## 🤖 WhatsApp Bot Integration

The WhatsApp bot provides automated customer support and booking capabilities:

### Features
- **Automated responses** - FAQ and service information
- **Booking creation** - Direct booking through chat
- **Status updates** - Real-time booking notifications
- **Arabic NLP** - Natural language processing in Arabic
- **Fallback to human** - Seamless handoff to support team

### Setup
1. Configure Twilio WhatsApp Business API credentials
2. Set webhook URL for message handling
3. Deploy bot service to cloud platform
4. Test integration with sandbox number

## 📱 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
vercel --prod
```

### Backend (Railway)
```bash
cd server
# Connect to Railway
railway login
railway init
railway add postgresql  # If using PostgreSQL
railway deploy
```

### Environment Variables
Ensure all production environment variables are set:
- `NODE_ENV=production`
- `MONGODB_URI` - Production database URL
- `JWT_SECRET` - Strong secret key
- `CLIENT_URL` - Frontend URL
- `TWILIO_*` - WhatsApp credentials

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt with salt rounds
- **Rate Limiting** - API request throttling
- **CORS Protection** - Cross-origin request filtering
- **Helmet Security** - HTTP security headers
- **Input Validation** - Joi schema validation
- **SQL Injection Prevention** - MongoDB ODM protection

## 🌐 Internationalization

### Languages Supported
- **Arabic (ar)** - Primary language with RTL support
- **English (en)** - Secondary language

### RTL Implementation
- Automatic direction switching
- Mirrored layouts for Arabic
- Proper text alignment
- Icon positioning adjustments

## 📊 Analytics & Monitoring

- **User Analytics** - Registration, login, activity tracking
- **Booking Analytics** - Conversion rates, popular services
- **Performance Monitoring** - API response times, error rates
- **Business Metrics** - Revenue tracking, customer satisfaction

## 🧪 Testing

```bash
# Run frontend tests
cd client && npm test

# Run backend tests
cd server && npm test

# Run E2E tests
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development** - React.js, Tailwind CSS, Arabic RTL
- **Backend Development** - Node.js, Express, MongoDB
- **WhatsApp Integration** - Twilio API, NLP, Automation
- **UI/UX Design** - Arabic-first design, mobile optimization

## 📞 Support

For support and questions:
- **Email**: support@cleanmaster.sa
- **WhatsApp**: +966 50 123 4567
- **Documentation**: [docs.cleanmaster.sa](https://docs.cleanmaster.sa)

---

**Built with ❤️ for the Saudi Arabian market** 