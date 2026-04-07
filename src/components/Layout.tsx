import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, Leaf, Activity, BookOpen, User, LogOut, Menu, X, Heart } from 'lucide-react';
import DailyTipBar from './DailyTipBar';
import Chatbot from './Chatbot';
import { useUserStore } from '../store/useStore';
import { cn } from '../lib/utils';

export default function Layout() {
  const { isAuthenticated, name, logout } = useUserStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/remedy-finder', icon: Search, label: 'Remedy Finder' },
    { to: '/herb-scanner', icon: Leaf, label: 'Herb Scanner' },
    { to: '/herb-library', icon: BookOpen, label: 'Herb Library' },
    { to: '/dosha-quiz', icon: Activity, label: 'Dosha Quiz' },
    { to: '/calorie-tracker', icon: Heart, label: 'Calorie Tracker' },
    { to: '/about', icon: BookOpen, label: 'About IKS' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-emerald-800 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Leaf className="text-emerald-300" size={28} />
              <span className="font-serif text-2xl font-bold tracking-tight">Swasthya 360</span>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => cn(
                    "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-emerald-200",
                    isActive ? "text-emerald-200 border-b-2 border-emerald-300 pb-1" : "text-emerald-50"
                  )}
                >
                  <item.icon size={16} />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Namaste, {name}</span>
                  <button onClick={handleLogout} className="p-2 hover:bg-emerald-700 rounded-full transition-colors" title="Logout">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <NavLink to="/auth" className="flex items-center gap-2 text-sm font-medium bg-emerald-700 hover:bg-emerald-600 px-4 py-2 rounded-full transition-colors">
                  <User size={16} />
                  Login
                </NavLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-emerald-700 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-emerald-800 text-white absolute top-16 left-0 right-0 z-20 shadow-xl border-t border-emerald-700">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors",
                  isActive ? "bg-emerald-700 text-emerald-100" : "hover:bg-emerald-700/50"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <button 
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium hover:bg-emerald-700/50 transition-colors text-red-300"
              >
                <LogOut size={20} />
                Logout
              </button>
            ) : (
              <NavLink 
                to="/auth" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium hover:bg-emerald-700/50 transition-colors"
              >
                <User size={20} />
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pb-32">
        <Outlet />
      </main>

      <Chatbot />
      <DailyTipBar />
    </div>
  );
}
