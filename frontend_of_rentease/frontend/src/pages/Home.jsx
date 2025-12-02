import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyForm from "../components/PropertyForm";
import PropertyList from "../components/PropertyList";
import Footer from "../components/Footer";
import logo from "../assets/rentease-logo.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [activeTab, setActiveTab] = useState("add"); //  Track which section is open

  //logout function
  const navigate = useNavigate();
  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("loginTime");
  navigate("/login", {replace: true});
};


  // Fetch all properties from backend
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties`);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/*  Navbar */}
      <header className="bg-gradient-to-r from-zinc-400 via-black to-zinc-800 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* logo and title */}
          <div className="flex items-center gap-1 cursor-pointer group h-12">
            <img
              src={logo}
              alt="RentEase Logo"
              className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-2xl font-bold tracking-tight text-yellow-400 leading-none">
              RentEase
            </span>
          </div>


          
          <nav className="flex space-x-6 font-medium text-gray-200">
            
          </nav>

        

          <nav className="flex space-x-6 font-medium text-gray-600">
            <span
              className={`cursor-pointer hover:text-blue-600 transition ${
                activeTab === "add" ? "text-blue-600 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("add")}
            >
              Add Property
            </span>
            <span
              className={`cursor-pointer hover:text-red-600 transition ${
                activeTab === "listings" ? "text-red-600 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("listings")}
            >
              Listings
            </span>
            <span
              onClick={logout}
              className="cursor-pointer text-blue-500 hover:text-red-600 transition font-semibold"
            >
              Logout
            </span>

          </nav>
        </div>
      </header>

      {/*  Content Section */}
      <main
        className={`min-h-screen transition-all duration-500 noise-bg ${
          activeTab === "add"
            ? "bg-gradient-to-br from-blue-100 via-white to-cyan-100"
            : "bg-gradient-to-br from-zinc-100 via-white to-purple-100"
        }`}
      >
        <div className="max-w-6xl mx-auto py-14 px-6">
          {activeTab === "add" && (
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <PropertyForm onPropertyAdded={fetchProperties} />
              </div>
            </div>
          )}

          {activeTab === "listings" && 
          <div className="bg-white/75 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/40">
            <PropertyList properties={properties} />
          </div>}
        </div>
      </main>

      {/*  Footer */}
      <Footer />
    </div>
  );
}


