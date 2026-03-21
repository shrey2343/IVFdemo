# IVF360 Platform

A comprehensive React + TypeScript application for IVF360 platform with authentication and public pages, designed for medical professionals.

## Features

### Public Pages
- **Landing Page**: Professional homepage with features and benefits
- **Blog**: Medical insights and IVF-related articles
- **Contact**: Contact form and office information
- **Terms & Conditions**: Legal terms and privacy information

### Authentication System
- **Login/Signup**: Secure user authentication
- **Protected Routes**: Dashboard access only for authenticated users
- **Demo Credentials**: `doctor@example.com` / `password`

### Dashboard Features (Protected)
- **Dashboard**: Overview of practice analytics with key metrics
- **Test Analysis**: Comprehensive analysis of IVF-related test results
- **Patient Records**: Patient management and treatment tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for enhanced UX
- **Medical Icons**: Lucide React icons for professional interface

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Router** for navigation
- **Context API** for authentication state

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Protected app layout with sidebar
│   ├── PublicLayout.tsx # Public pages layout with header/footer
│   └── ProtectedRoute.tsx # Route protection component
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context and provider
├── pages/              # Page components
│   ├── Landing.tsx     # Homepage
│   ├── Login.tsx       # Login form
│   ├── Signup.tsx      # Registration form
│   ├── Blog.tsx        # Blog page
│   ├── Contact.tsx     # Contact page
│   ├── Terms.tsx       # Terms and conditions
│   ├── Dashboard.tsx   # Main dashboard (protected)
│   ├── TestAnalysis.tsx # Test results analysis (protected)
│   └── PatientRecords.tsx # Patient management (protected)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main app component with routing
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Authentication Flow

1. **Public Access**: Landing, Blog, Contact, Terms pages are accessible to all
2. **Login Required**: Dashboard, Test Analysis, and Patient Records require authentication
3. **Auto Redirect**: Unauthenticated users are redirected to login page
4. **Session Persistence**: User sessions are stored in localStorage

## Key Components

### Public Pages
- **Landing**: Hero section, features, benefits, and call-to-action
- **Blog**: Medical articles with categories and newsletter signup
- **Contact**: Contact form with office information and map placeholder
- **Terms**: Comprehensive terms and conditions

### Authentication
- **Login**: Email/password with demo credentials
- **Signup**: Registration with form validation
- **Protected Routes**: Automatic redirection for unauthenticated users

### Dashboard (Protected)
- Practice overview with key metrics
- Recent test results table
- Statistics cards with trend indicators

### Test Analysis (Protected)
- Comprehensive test result analysis
- Search and filtering capabilities
- Clinical interpretation display
- Trends visualization placeholder

### Patient Records (Protected)
- Patient information cards
- Treatment stage tracking
- Contact information management
- Recent tests overview

## Styling

The application uses a medical-focused design system:
- **Primary Colors**: Medical blue palette (`medical-*` colors)
- **Accent Colors**: Orange palette (`accent-*` colors)
- **Typography**: Inter font for professional appearance
- **Components**: Consistent button styles, cards, and form elements

## Demo Credentials

For testing the application:
- **Email**: `doctor@example.com`
- **Password**: `password`

## Development

- ESLint configured for code quality
- TypeScript for type safety
- Responsive design patterns
- Accessibility considerations
- Authentication state management

## Future Enhancements

- Real API integration
- Chart integration for data visualization
- Real-time data updates
- Advanced filtering and search
- Export functionality
- Email verification
- Password reset functionality
- Role-based access control