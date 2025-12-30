"use client";

import Link from "next/link";
import { Eye, Edit, Trash2, MapPin, Briefcase, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui";

interface CandidatureCardProps {
  candidature: {
    id: number;
    title: string;
    description: string;
    location: string;
    type: string;
    category: string;
    status: string;
    applicationsCount: number;
    deadline: string | null;
    featured: boolean;
  };
}

export function CandidatureCard({ candidature }: CandidatureCardProps) {
  return (
    <div className="p-6 hover:bg-gray-50/60 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {candidature.title}
            </h3>
            <Badge variant={candidature.status as any}>
              {candidature.status === "active"
                ? "Active"
                : candidature.status === "draft"
                ? "Brouillon"
                : "Fermée"}
            </Badge>
            {candidature.featured && (
              <Badge variant="featured">Mise en avant</Badge>
            )}
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
            {candidature.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400" />
              {candidature.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Briefcase className="h-4 w-4 text-gray-400" />
              {candidature.type}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4 text-gray-400" />
              {candidature.applicationsCount} candidature
              {candidature.applicationsCount !== 1 ? "s" : ""}
            </div>
            {candidature.deadline && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                {new Date(candidature.deadline).toLocaleDateString("fr-FR")}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={candidature.type as any}>{candidature.type}</Badge>
            <Badge variant="default">{candidature.category}</Badge>
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
            href={`/admin/candidatures/${candidature.id}/edit`}
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
