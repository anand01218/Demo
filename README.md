# Anantax HRMS Frontend

A modern Human Resource Management System built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Employee Management** - Complete employee lifecycle management
- **Attendance Tracking** - Real-time attendance monitoring with check-in/out
- **Leave Management** - Leave requests, approvals, and tracking
- **Department Management** - Organize employees by departments
- **Role & Permissions** - Granular access control system
- **Dashboard Analytics** - Comprehensive HR metrics and insights
- **Responsive Design** - Mobile-first responsive interface
- **Dark Mode** - Built-in dark/light theme support

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit + RTK Query
- **UI Components:** Custom components with Headless UI
- **Icons:** Lucide React + Font Awesome
- **Forms:** React Hook Form
- **Notifications:** Sonner
- **Date Handling:** React DatePicker

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd anantax_hrms_frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
│   ├── common/            # Shared components
│   ├── pagesUI/           # Page-specific components
│   └── ui/                # Base UI components
├── redux/                 # Redux store and API slices
│   ├── api/               # RTK Query API endpoints
│   └── slices/            # Redux slices
├── interface/             # TypeScript interfaces
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── data/                  # Static data and configurations
```

## 🔑 Key Components

### Authentication

- JWT-based authentication
- Role-based access control
- Protected routes

### Employee Management

- Employee CRUD operations
- Profile management
- Department assignment

### Attendance System

- Manual check-in/out
- Attendance tracking
- Time calculations

### Leave Management

- Leave request workflow
- Approval system
- Leave balance tracking

## 🎨 UI/UX Features

- **Responsive Design** - Works on all device sizes
- **Dark Mode** - Toggle between light and dark themes
- **Interactive Tables** - Sortable, filterable data tables
- **Modal System** - Consistent modal components
- **Form Validation** - Real-time form validation
- **Loading States** - Skeleton loaders and spinners

## 🔌 API Integration

The frontend integrates with a REST API using RTK Query:

- **Base URL:** `/api/v1`
- **Authentication:** Bearer token
- **Error Handling:** Centralized error management
- **Caching:** Automatic query caching and invalidation

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🚀 Build & Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary software developed for Anantax.

## 🆘 Support

For support and questions, contact the development team.
