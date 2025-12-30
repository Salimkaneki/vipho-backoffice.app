"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  UserCheck,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  FileText,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Candidatures: pathname?.startsWith("/admin/candidatures") || false,
  });

  const menu = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Blogs & Articles", icon: BookOpen, href: "/admin/blogs-et-articles" },
    {
      label: "Candidatures",
      icon: UserCheck,
      href: "/admin/candidatures",
      submenu: [
        { label: "Offres d'emploi", href: "/admin/candidatures" },
        { label: "Candidatures reçues", href: "/admin/candidatures/applications" },
      ]
    },
    { label: "Collectes", icon: Heart, href: "/admin/collectes" },
    { label: "Témoignages", icon: MessageSquare, href: "/admin/temoignages" },
    { label: "Paramètres", icon: Settings, href: "/admin/parametres" },
  ];

  return (
    <aside className="h-screen w-72 bg-white border-r border-gray-200 flex flex-col">
      
      {/* Logo */}
      <div className="h-16 px-5 flex items-center border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
            V
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-semibold text-gray-900">Vipho</div>
            <div className="text-xs font-medium text-gray-500">Backoffice</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-5 space-y-6 overflow-auto">
        <div>
          <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</p>
          <div className="space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href));
          const hasSubmenu = item.submenu && item.submenu.length > 0;

          if (hasSubmenu) {
            const isOpen = openMenus[item.label] || false;
            return (
              <div key={item.label}>
                <button
                  onClick={() => setOpenMenus(prev => ({ ...prev, [item.label]: !isOpen }))}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
                    ${isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-700 hover:bg-gray-50"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      <Icon size={18} />
                    </div>
                    {item.label}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="mt-1 pl-4 border-l border-gray-200 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors
                          ${pathname === subItem.href
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                        `}
                      >
                        <FileText size={16} className={pathname === subItem.href ? "text-primary-600" : "text-gray-400"} />
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
                ${isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-50"}
              `}
            >
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${
                isActive ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600"
              }`}>
                <Icon size={18} />
              </div>
              {item.label}
            </Link>
          );
        })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition">
          <div className="h-9 w-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <LogOut size={18} />
          </div>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
