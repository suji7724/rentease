import React from "react";
import { motion } from "framer-motion";
import { MapPin, DollarSign, Home } from "lucide-react";
import { Link } from "react-router-dom";   

const PropertyList = ({ properties = [] }) => {
  return (
    <motion.div
      className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-tight">
        Property Listings
      </h2>

      {properties.length === 0 ? (
        <motion.p
          className="text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No properties added yet.
        </motion.p>
      ) : (
        <div className="space-y-4">
          {properties.map((p, index) => (
            <motion.div
              key={p._id || index}
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              
              <Link
                to={`/property/${p._id}`}
                className="block border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all bg-white cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Home className="text-blue-500" /> {p.title}
                    </h3>
                    <p className="text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={16} className="text-gray-400" /> {p.location}
                    </p>
                  </div>
                  <p className="text-blue-600 font-semibold flex items-center gap-1">
                    <DollarSign size={16} /> {p.price}
                  </p>
                </div>

                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {p.description}
                </p>
                <p className="text-sm text-gray-500 mt-2">📞 {p.contact}</p>
              </Link>
              {/*  End card Link */}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PropertyList;


