import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PreviewProvider } from './context/PreviewContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './layouts/MainLayout';
import { LinksPage } from './pages/LinksPage';
import { ProfilePage } from './pages/ProfilePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PublicProfile } from './pages/PublicProfile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/u/:userId" element={<PublicProfile />} />

          {/* Protected Routes inside MainLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<PreviewProvider><Outlet /></PreviewProvider>}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/links" replace />} />
                <Route path="links" element={<LinksPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
