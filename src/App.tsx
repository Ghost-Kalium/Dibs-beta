import { useState, useEffect } from 'react';
import { Search, LogOut, Menu, X } from 'lucide-react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import TrendingSection from './components/TrendingSection';
import ThisWeekSection from './components/ThisWeekSection';
import ExploreSection from './components/ExploreSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} onLoginClick={() => setShowAuthModal(true)} />
      <HeroSection />
      <CategoryGrid />
      <TrendingSection />
      <ThisWeekSection />
      <ExploreSection />
      <Footer />

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}

export default App;
