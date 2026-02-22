interface ServiceCardProps {
  service: any;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition h-full">
      <div className="relative h-40 sm:h-48 bg-gray-200 overflow-hidden">
        {service.image_url && (
          <img
            src={service.image_url}
            alt={service.name}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        )}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black text-white px-2 sm:px-3 py-1 rounded text-xs font-medium">
          Explore
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="font-bold text-black mb-1 text-sm line-clamp-2">{service.name}</h3>
        <div className="text-xs sm:text-sm text-gray-600 mb-3 flex-1">
          <div className="line-clamp-1">{service.service_providers?.business_name}</div>
          <div className="text-xs text-gray-500">{service.location}</div>
        </div>

        <button className="w-full bg-black text-white py-2 rounded text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-900 transition">
          Dibs it
        </button>
      </div>
    </div>
  );
}
