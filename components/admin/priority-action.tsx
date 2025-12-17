import { LucideIcon } from "lucide-react";

interface PriorityActionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  onClick?: () => void;
}

export default function PriorityAction({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  borderColor,
  onClick
}: PriorityActionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border ${borderColor} ${bgColor} hover:opacity-80 transition group`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${iconColor.replace('text-', 'text-').replace('-600', '-900')}`}>{title}</p>
          <p className={`text-xs ${iconColor.replace('text-', 'text-').replace('-600', '-700')}`}>{description}</p>
        </div>
        <div className={`w-8 h-8 ${bgColor.replace('bg-', 'bg-').replace('-50', '-100')} rounded-full flex items-center justify-center group-hover:opacity-80 transition`}>
          <Icon className={`${iconColor} w-4 h-4`} />
        </div>
      </div>
    </button>
  );
}