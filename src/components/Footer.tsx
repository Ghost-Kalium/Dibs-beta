import { useState } from 'react';
import { Mail, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing:', email);
    setEmail('');
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4">Stay Connected with Dibs</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 sm:px-4 py-2 rounded text-black text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white text-black px-3 sm:px-4 py-2 rounded hover:bg-gray-200 transition whitespace-nowrap"
              >
                <Mail size={16} className="mx-auto sm:inline" />
              </button>
            </form>

            <div className="flex gap-4 mt-4 sm:mt-6">
              <button className="text-white hover:text-gray-300 transition">
                <Facebook size={18} />
              </button>
              <button className="text-white hover:text-gray-300 transition">
                <Twitter size={18} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm">About Dibs</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Media Kit
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm">Join Us</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Facebook Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm">For Service Providers</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Partnership Collaboration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  List your service Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="text-xl sm:text-2xl font-bold">Dibs</div>
        </div>
      </div>
    </footer>
  );
}
