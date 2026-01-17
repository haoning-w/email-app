"use client";

import { useState } from "react";
import {
  Menu,
  Mail,
  Search,
  SlidersHorizontal,
  HelpCircle,
  Settings,
  LayoutGrid,
} from "lucide-react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="flex w-[100vw] items-center justify-between gap-4 px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Menu button and Logo */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="flex items-center gap-2">
          <Mail className="w-8 h-8 text-blue-500" />
          <span className="text-xl text-gray-700 dark:text-gray-300 font-medium">
            Awesome Mail
          </span>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mail"
            className="w-full pl-10 pr-12 py-3 bg-gray-100 dark:bg-gray-800 rounded-full focus:bg-white dark:focus:bg-gray-700 focus:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500"
          />
          <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <SlidersHorizontal className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-1">
        {/* Help */}
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          title="Support"
        >
          <HelpCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Settings */}
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          title="Settings"
        >
          <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Apps */}
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          title="Google Apps"
        >
          <LayoutGrid className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Profile */}
        <button className="ml-2 w-9 h-9 rounded-full bg-blue-500 text-white font-medium flex items-center justify-center hover:shadow-md transition-shadow">
          U
        </button>
      </div>
    </header>
  );
}
