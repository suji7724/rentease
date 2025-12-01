import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, DollarSign, MapPin, FileText } from "lucide-react";
import { motion } from "framer-motion";

const PropertyDetails = () => {
  const { id } = useParams(); //  Get property ID from URL
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading property details...
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-6"
        >
          <ArrowLeft size={18} /> Back to Listings
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {property.title}
        </h1>

        <p className="text-gray-600 flex items-center gap-2 mb-2">
          <MapPin size={18} className="text-gray-400" /> {property.location}
        </p>

        <p className="text-blue-600 text-xl font-semibold flex items-center gap-2 mb-4">
          <DollarSign size={20} /> {property.price}
        </p>

        <p className="text-gray-700 leading-relaxed flex items-start gap-2 mb-4">
          <FileText size={18} className="text-gray-500 mt-1" />
          {property.description}
        </p>

        <p className="text-sm text-gray-500 mt-6">
          📞 Contact: <span className="font-medium text-gray-700">{property.contact}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;
