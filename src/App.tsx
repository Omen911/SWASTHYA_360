/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import RemedyFinder from './pages/RemedyFinder';
import DoshaQuiz from './pages/DoshaQuiz';
import HerbScanner from './pages/HerbScanner';
import CalorieTracker from './pages/CalorieTracker';
import About from './pages/About';
import HerbLibrary from './pages/HerbLibrary';
import HerbDetail from './pages/HerbDetail';
import { useUserStore } from './store/useStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUserStore();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="remedy-finder" element={<RemedyFinder />} />
          <Route path="herb-scanner" element={<HerbScanner />} />
          <Route path="herb-library" element={<HerbLibrary />} />
          <Route path="herb-library/:id" element={<HerbDetail />} />
          <Route path="dosha-quiz" element={<DoshaQuiz />} />
          <Route path="calorie-tracker" element={<CalorieTracker />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
