import { LucideIcon } from "lucide-react";

interface ActivityCardProps {
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  title: string;
  description: string;
  time: string;
}

export default function ActivityCard({ icon: Icon, iconColor, bgColor, title, description, time }: ActivityCardProps) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center shrink-0`}>
        <Icon className={`${iconColor} w-4 h-4`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}