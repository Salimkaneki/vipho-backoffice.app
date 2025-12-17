import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor: string; 
  bgColor: string;   
  subtitle?: string;
}

export default function KPICard({ 
  title, 
  value, 
  icon: Icon, 
  iconColor, 
  bgColor, 
  subtitle 
}: KPICardProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 w-full">
      {/* Icône à gauche - Taille fixe et compacte */}
      <div className={`shrink-0 w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
        <Icon className={`${iconColor} w-6 h-6`} />
      </div>

      {/* Contenu textuel - Prend tout l'espace restant */}
      <div className="flex flex-col min-w-0">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-tight truncate">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-gray-900 leading-none">
            {value}
          </span>
          {subtitle && (
            <span className="text-[10px] font-medium text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}