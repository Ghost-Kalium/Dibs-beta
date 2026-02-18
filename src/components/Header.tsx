import { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HeaderProps {
  user: any;
  onLoginClick: () => void;
}

export default function Header({ user, onLoginClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-black">Dibs</div>

        <div className="hidden md:flex gap-8 items-center">
          <a href="#" className="text-gray-700 hover:text-black text-sm font-medium">
            Find services
          </a>
          <a href="#" className="text-gray-700 hover:text-black text-sm font-medium">
            Support
          </a>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <>
              <span className="text-sm text-gray-700">{user.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-black"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800"
            >
              Log in
            </button>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-4">
            <a href="#" className="block text-gray-700 hover:text-black font-medium">
              Find services
            </a>
            <a href="#" className="block text-gray-700 hover:text-black font-medium">
              Support
            </a>
            {user ? (
              <>
                <div className="text-sm text-gray-700">{user.email}</div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-700 hover:text-black font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="w-full bg-black text-white px-4 py-2 rounded font-medium"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
