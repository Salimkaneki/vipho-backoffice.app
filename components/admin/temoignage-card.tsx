"use client";

import Link from "next/link";
import { Eye, Edit, Trash2, User, Building, Calendar, Star } from "lucide-react";
import { Badge } from "@/components/ui";

interface TemoignageCardProps {
  temoignage: {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    status: string;
    date: string;
    featured: boolean;
  };
}

export function TemoignageCard({ temoignage }: TemoignageCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{temoignage.name}</h3>
            <p className="text-sm text-gray-600">{temoignage.role} chez {temoignage.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant={temoignage.status as any}>
            {temoignage.status === "published"
              ? "Publié"
              : temoignage.status === "draft"
              ? "Brouillon"
              : "Archivé"}
          </Badge>
          {temoignage.featured && (
            <Badge variant="featured">★</Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < temoignage.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">({temoignage.rating}/5)</span>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3 text-sm leading-relaxed">
        "{temoignage.content}"
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{new Date(temoignage.date).toLocaleDateString("fr-FR")}</span>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            title="Voir les détails"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          <Link
            href={`/admin/temoignages/${temoignage.id}/edit`}
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Modifier"
          >
            <Edit className="h-3.5 w-3.5" />
          </Link>
          <button
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Supprimer"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}