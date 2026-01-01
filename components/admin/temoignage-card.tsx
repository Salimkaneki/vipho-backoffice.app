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
    <div className="p-6 hover:bg-gray-50/60 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
              <User className="h-5 w-5 text-primary-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {temoignage.name}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {temoignage.role} chez {temoignage.company}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < temoignage.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <Badge variant={temoignage.status as any}>
                {temoignage.status === "published"
                  ? "Publié"
                  : temoignage.status === "draft"
                  ? "Brouillon"
                  : "Archivé"}
              </Badge>
              {temoignage.featured && (
                <Badge variant="featured">Mise en avant</Badge>
              )}
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
            "{temoignage.content}"
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{new Date(temoignage.date).toLocaleDateString("fr-FR")}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            title="Voir les détails"
          >
            <Eye className="h-4 w-4" />
          </button>
          <Link
            href={`/admin/temoignages/${temoignage.id}/edit`}
            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Modifier"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button
            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Supprimer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}