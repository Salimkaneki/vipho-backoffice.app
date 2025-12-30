"use client";

import { Eye, Mail, Phone, Briefcase, Download } from "lucide-react";
import { Badge } from "@/components/ui";
import { getInitials } from "@/lib/utils";

interface ApplicationCardProps {
  application: {
    id: number;
    candidateName: string;
    candidateEmail: string;
    candidatePhone: string;
    positionTitle: string;
    status: string;
    appliedDate: string;
    experience: string;
    motivation: string;
    cv: string | null;
    coverLetter: string | null;
  };
  onStatusChange: (id: number, status: string) => void;
}

const statusLabels = {
  pending: "En attente",
  reviewed: "Examinée",
  accepted: "Acceptée",
  rejected: "Refusée",
};

export function ApplicationCard({ application, onStatusChange }: ApplicationCardProps) {
  return (
    <div className="p-6 hover:bg-gray-50/60 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="flex items-start gap-6">
        {/* Avatar et informations principales */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="h-12 w-12 rounded-xl bg-linear-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {getInitials(application.candidateName)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {application.candidateName}
                  </h3>
                  <Badge variant={application.status as any}>
                    {statusLabels[application.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Postulé le{" "}
                  {new Date(application.appliedDate).toLocaleDateString("fr-FR")}{" "}
                  • {application.experience} d'expérience
                </p>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="truncate">{application.candidateEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{application.candidatePhone}</span>
              </div>
            </div>

            {/* Poste */}
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
              <Briefcase className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{application.positionTitle}</span>
            </div>

            {/* Motivation */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700 line-clamp-2">
                <span className="font-medium text-gray-900">Motivation:</span>{" "}
                {application.motivation}
              </p>
            </div>

            {/* Documents */}
            <div className="flex items-center gap-3">
              {application.cv && (
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Download className="h-3 w-3" />
                  CV
                </button>
              )}
              {application.coverLetter && (
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <Download className="h-3 w-3" />
                  Lettre de motivation
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <button
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Voir la candidature"
          >
            <Eye className="h-4 w-4" />
          </button>

          <select
            value={application.status}
            onChange={(e) => onStatusChange(application.id, e.target.value)}
            className="px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="pending">En attente</option>
            <option value="reviewed">Examinée</option>
            <option value="accepted">Acceptée</option>
            <option value="rejected">Refusée</option>
          </select>
        </div>
      </div>
    </div>
  );
}
