interface ServiceCardProps {
  service: any;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {service.image_url && (
          <img
            src={service.image_url}
            alt={service.name}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        )}
        <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded text-xs font-medium">
          Explore
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-black mb-1">{service.name}</h3>
        <div className="text-sm text-gray-600 mb-3">
          <div>{service.service_providers?.business_name}</div>
          <div className="text-xs">{service.location}</div>
        </div>

        <button className="w-full bg-black text-white py-2 rounded text-sm font-medium hover:bg-gray-800 transition">
          Dibs it
        </button>
      </div>
    </div>
  );
}
