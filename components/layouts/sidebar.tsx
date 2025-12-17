"use client";

import {
  LayoutDashboard,
  BookOpen,
  UserCheck,
  Heart,
  MessageSquare,
  Settings,
  LogOut
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menu = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Blogs & Articles", icon: BookOpen },
    { label: "Candidatures", icon: UserCheck },
    { label: "Collectes", icon: Heart },
    { label: "Témoignages", icon: MessageSquare },
    { label: "Paramètres", icon: Settings },
  ];

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <span className="font-display text-2xl font-bold text-gray-600">
          Vipho Admin
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                transition-colors duration-200
                ${isActive
                  ? "bg-primary-100 text-primary-700 shadow-inner"
                  : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              <Icon size={20} className={`${isActive ? "text-primary-700" : "text-gray-500"}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-500 hover:bg-red-50 transition">
          <LogOut size={20} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
