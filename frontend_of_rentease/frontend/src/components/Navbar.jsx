import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">🏠 RentEase</h1>
        <ul className="flex space-x-8 text-gray-600 font-medium">
          <li className="hover:text-blue-600 cursor-pointer transition">
            Home
          </li>
          <li className="hover:text-blue-600 cursor-pointer transition">
            Add Property
          </li>
          <li className="hover:text-blue-600 cursor-pointer transition">
            Listings
          </li>
          <li className="hover:text-blue-600 cursor-pointer transition">
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
}