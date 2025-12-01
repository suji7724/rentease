import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  MapPin,
  DollarSign,
  Phone,
  FileText,
  CheckCircle,
} from "lucide-react";

const PropertyForm = ({ onPropertyAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    contact: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/properties",
        formData
      );

      if (res.data) {
        setIsSuccess(true);
        setFormData({
          title: "",
          location: "",
          price: "",
          description: "",
          contact: "",
        });

        if (typeof onPropertyAdded === "function") onPropertyAdded();

        setTimeout(() => setIsSuccess(false), 2000);
      }
    } catch (error) {
      alert(" Failed to add property");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-8"
    >
      {/*  Success Floating Badge */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-2 text-sm"
          >
            <CheckCircle size={16} /> Property Added
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">
        Add New Property
      </h2>

      <div className="space-y-4">
        <InputField
          icon={Home}
          name="title"
          placeholder="Property Title"
          value={formData.title}
          onChange={handleChange}
        />

        <InputField
          icon={MapPin}
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <InputField
          icon={DollarSign}
          name="price"
          placeholder="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />

        <InputField
          icon={Phone}
          name="contact"
          placeholder="Contact Info"
          value={formData.contact}
          onChange={handleChange}
        />

        <div className="relative">
          <FileText className="absolute left-4 top-4 text-blue-500" size={18} />
          <textarea
            name="description"
            placeholder="Describe the property..."
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition"
          />
        </div>
      </div>

      {/*  Animated Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={isLoading}
        className={`w-full mt-8 py-3 text-lg font-semibold rounded-xl text-white shadow-lg transition-all ${
          isSuccess
            ? "bg-green-600"
            : isLoading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        type="submit"
      >
        {isLoading ? "Adding..." : isSuccess ? "Added " : "Add Property"}
      </motion.button>
    </motion.form>
  );
};

/*  Reusable Modern Input Field */
const InputField = ({
  icon: Icon,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
    </div>
  );
};

export default PropertyForm;




