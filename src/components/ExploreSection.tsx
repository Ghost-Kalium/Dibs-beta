import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users } from 'lucide-react';

export default function ExploreSection() {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .limit(5);

      if (!error && data) {
        setProviders(data);
      }
      setLoading(false);
    };

    fetchProviders();
  }, []);

  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-black mb-8">Explore Our Services</h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-40 bg-gray-200">
                  {provider.image_url && (
                    <img
                      src={provider.image_url}
                      alt={provider.business_name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-black text-sm mb-2">
                    {provider.business_name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                    <Users size={14} />
                    <span>{provider.followers_count} followers</span>
                  </div>

                  <button className="w-full bg-black text-white py-2 rounded text-xs font-medium hover:bg-gray-800 transition">
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
