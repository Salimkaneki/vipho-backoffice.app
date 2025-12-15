"use client";

import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut
} from "lucide-react";
import { useState } from "react";
import Header from "../../components/layouts/header";

export default function TestPage() {
  const [active, setActive] = useState("Dashboard");

  const menu = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Utilisateurs", icon: Users },
    { label: "Articles", icon: FileText },
    { label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
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
                  w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
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
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition">
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                {active}
              </h1>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <p className="text-gray-600 text-lg">
                  Page {active} - Interface d'administration Vipho
                </p>
                <p className="text-gray-500 mt-4">
                  Cette page démontre l'intégration de la sidebar et du header avec navigation interactive.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
