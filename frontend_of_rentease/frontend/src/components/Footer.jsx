import React, { useState, useEffect } from "react";
import { Github, Mail } from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      //  Show footer only when scrolled to bottom 
      if (scrollPosition >= documentHeight - 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`w-full transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-gray-100 text-black-400 py-4 text-center flex flex-col items-center space-y-2">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="text-red-500 font-semibold">RentEase</span>. All rights reserved.
        </p>
        <div className="flex items-center space-x-5">
          <a
            href="https://github.com/suji7724"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-blue-400 transition"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <a
            href="mailto:sujitcoder044@gmail.com"
            className="flex items-center space-x-1 hover:text-blue-400 transition"
          >
            <Mail size={18} />
            <span>Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

