import { Link } from 'react-router-dom';
import serviceData from '../data/serviceData';
import { Icon } from '@iconify/react/dist/iconify.js';

const ServicesHomeSection = ({ image }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          We Are Specialists In Following Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:p-16">
          {serviceData.map((service) => (
            <Link
              to={`/services#${service.path}`}
              key={service.title}
              className="relative group bg-white p-6 rounded-lg border border-gray-300 overflow-hidden"
            >
              {/* Hover Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 group-hover:opacity-100 transition duration-100"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${service.image})`,
                }}
              ></div>
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-4 pt-10 text-black group-hover:text-white ">
                  {service.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-end text-[#DE0000] group-hover:text-white ">
                    <span>Book now</span>
                    <Icon
                      icon="flowbite:arrow-right-outline"
                      className="h-4 w-5"
                    />
                  </div>
                  <Icon
                    icon={service.icon}
                    alt="service icon"
                    className="h-20 w-20 text-[#DE0000] group-hover:text-white "
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHomeSection;
