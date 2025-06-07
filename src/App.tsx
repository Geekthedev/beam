import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { OnboardingPage } from './components/pages/OnboardingPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { CourseExplorerPage } from './components/pages/CourseExplorerPage';
// import { CoursesPage } from './components/pages/CoursesPage';
// import { AITutorPage } from './components/pages/AITutorPage';
// import { NotebookPage } from './components/pages/NotebookPage';
// import { AchievementsPage } from './components/pages/AchievementsPage';
// import { SettingsPage } from './components/pages/SettingsPage';
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
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/explorer" element={<CourseExplorerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;