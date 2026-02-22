import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Briefcase, Users, Users2, Palette, UtensilsCrossed, Home, Car, Baby } from 'lucide-react';

const iconMap: { [key: string]: any } = {
  Creative: Briefcase,
  Personal: Users,
  'Meeting Room': Users2,
  'Art Classes': Palette,
  Catering: UtensilsCrossed,
  Accommodation: Home,
  Transportation: Car,
  Childcare: Baby,
};

export default function CategoryGrid() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .limit(8);

      if (!error && data) {
        setCategories(data);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="h-40 bg-gray-100 animate-pulse" />;
  }

  return (
    <section className="bg-white py-8 sm:py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.name] || Briefcase;
            return (
              <button
                key={category.id}
                className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition active:bg-gray-100"
              >
                <Icon size={28} className="text-black sm:w-8 sm:h-8" />
                <span className="text-xs sm:text-sm font-medium text-black text-center line-clamp-2">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
