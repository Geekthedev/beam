import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { OnboardingPage } from './components/pages/OnboardingPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { CourseExplorerPage } from './components/pages/CourseExplorerPage';

// Auth Pages
import { SignUpStudentPage } from './components/pages/auth/SignUpStudentPage';
import { SignUpTeacherPage } from './components/pages/auth/SignUpTeacherPage';
import { SignUpParentPage } from './components/pages/auth/SignUpParentPage';
import { SignUpAdminPage } from './components/pages/auth/SignUpAdminPage';
import { ForgotPasswordPage } from './components/pages/auth/ForgotPasswordPage';
import { VerifyEmailPage } from './components/pages/auth/VerifyEmailPage';

// Student Pages
import { StudentDashboardPage } from './components/pages/student/StudentDashboardPage';
import { BrowseCoursesPage } from './components/pages/student/BrowseCoursesPage';

import { useBeamStore } from './store/useBeamStore';
import { mockUser, mockCourses, mockAchievements } from './data/mockData';

function App() {
  const { theme, setUser, courses } = useBeamStore();

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Initialize mock data
    if (courses.length === 0) {
      useBeamStore.setState({
        courses: mockCourses,
        achievements: mockAchievements,
      });
    }
    
    // Auto-login for demo purposes
    setUser(mockUser);
  }, [courses.length, setUser]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Auth Routes */}
          <Route path="/signup/student" element={<SignUpStudentPage />} />
          <Route path="/signup/teacher" element={<SignUpTeacherPage />} />
          <Route path="/signup/parent" element={<SignUpParentPage />} />
          <Route path="/signup/admin" element={<SignUpAdminPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/explorer" element={<CourseExplorerPage />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/browse-courses" element={<BrowseCoursesPage />} />
          
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;