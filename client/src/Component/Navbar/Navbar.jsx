

import { useState } from "react";

const Navbar = () => {

  return (
    <nav className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
       
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src="/logo.png"></img>
          </a>
        </div>

      
        <div className="hidden items-center space-x-6 md:flex">
          <a href="/discover" className="flex items-center text-orange-500">
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Discover
          </a>
          <a href="/likes" className="flex items-center">
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Likes
          </a>
          <a href="/matchs" className="flex items-center">
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Matchs
          </a>
          <div className="relative">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white">
              <span className="text-sm">U</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
