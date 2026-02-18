import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ServiceCard from './ServiceCard';

type TimeFilter = 'all' | 'today' | 'tomorrow' | 'this-week' | 'next-week' | 'this-month';

export default function TrendingSection() {
  const [services, setServices] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*, service_providers(business_name), categories(name)')
        .order('booking_count', { ascending: false })
        .limit(8);

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, [activeFilter]);

  const filters: { label: string; value: TimeFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'This week', value: 'this-week' },
    { label: 'Next week', value: 'next-week' },
    { label: 'This month', value: 'this-month' },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-black mb-8">
          Trending in<span className="text-gray-400">Your Area</span>
        </h2>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`whitespace-nowrap px-4 py-2 rounded text-sm font-medium transition ${
                activeFilter === filter.value
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
