# Hop4Deals Frontend

React.js frontend application for the Hop4Deals platform.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
client/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   │   ├── admin/       # Admin-specific components
│   │   └── user/        # User-specific components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── context/        # React context
│   ├── utils/          # Utility functions
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
└── tailwind.config.js  # TailwindCSS configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#a855f7)
- **Secondary**: Gray (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Consistent card styling with hover effects
- **Buttons**: Primary, secondary, and danger variants
- **Forms**: Styled form inputs and validation
- **Modals**: Overlay modals for forms and confirmations

## 🔧 Key Features

### Authentication
- JWT-based authentication
- Protected routes
- Role-based access control
- Automatic token refresh
- Logout functionality

### Admin Dashboard
- User management
- Category management
- Brand management
- Deal management
- Blog management
- Statistics overview

### User Dashboard
- Role-based module access
- Content management
- Privilege-based restrictions
- Overview dashboard

### Public Home Page
- Hot deals display
- Trending brands
- Featured blogs
- Responsive design
- Search and filter functionality

## 🛠️ Components

### Core Components
- **App**: Main application component
- **Navbar**: Navigation bar with authentication
- **ProtectedRoute**: Route protection component
- **AdminSidebar**: Admin navigation sidebar
- **UserSidebar**: User navigation sidebar

### Admin Components
- **AdminOverview**: Admin dashboard overview
- **AdminUsers**: User management
- **AdminCategories**: Category management
- **AdminBrands**: Brand management
- **AdminDeals**: Deal management
- **AdminBlogs**: Blog management

### User Components
- **UserOverview**: User dashboard overview
- **UserCategories**: Category management (user)
- **UserBrands**: Brand management (user)
- **UserDeals**: Deal management (user)
- **UserBlogs**: Blog management (user)

### Pages
- **Home**: Public home page
- **Login**: Authentication page
- **AdminDashboard**: Admin dashboard
- **UserDashboard**: User dashboard

## 🔐 Authentication Context

The `AuthContext` provides:
- User authentication state
- Login/logout functionality
- Privilege checking
- Role validation
- Token management

## 🎯 API Integration

### Services
- **authAPI**: Authentication endpoints
- **usersAPI**: User management
- **categoriesAPI**: Category management
- **brandsAPI**: Brand management
- **dealsAPI**: Deal management
- **blogsAPI**: Blog management

### Axios Configuration
- Base URL configuration
- Request/response interceptors
- Automatic token attachment
- Error handling

## 🎨 Styling

### TailwindCSS
- Utility-first CSS framework
- Custom color palette
- Responsive design
- Component styling

### Custom CSS
- Global styles
- Component-specific styles
- Animations and transitions
- Scrollbar styling

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid system
- Responsive navigation
- Touch-friendly interactions

## 🚀 Performance

### Optimization
- Code splitting
- Lazy loading
- Image optimization
- Bundle optimization

### Best Practices
- Component reusability
- State management
- Error boundaries
- Loading states

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Dependencies

### Core
- react: UI library
- react-dom: DOM rendering
- react-router-dom: Routing
- axios: HTTP client

### Styling
- tailwindcss: CSS framework
- autoprefixer: CSS autoprefixing
- postcss: CSS processing

### Development
- react-scripts: Development tools
- @testing-library/react: Testing utilities
- @testing-library/jest-dom: Jest DOM matchers
- @testing-library/user-event: User event testing

## 🚀 Deployment

### Build Process
1. Run `npm run build`
2. Deploy the `build` folder
3. Configure server for SPA routing

### Deployment Platforms
- Netlify
- Vercel
- AWS S3 + CloudFront
- Heroku
- DigitalOcean

## 🔧 Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📝 Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

## 🛡️ Security

### Best Practices
- Input validation
- XSS prevention
- CSRF protection
- Secure token storage
- HTTPS enforcement

### Authentication
- JWT token management
- Automatic token refresh
- Secure logout
- Route protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

