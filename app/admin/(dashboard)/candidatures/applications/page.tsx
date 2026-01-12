"use client";

import Link from "next/link";
import { Search, Eye, Download, CheckCircle, XCircle, Clock, User, Briefcase, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Input, Select, Badge } from "@/components/ui";
import { ApplicationCard } from "@/components/admin";

// Données mockées pour la démonstration
const mockApplications = [
  {
    id: 1,
    candidateName: "Marie Dupont",
    candidateEmail: "marie.dupont@email.com",
    candidatePhone: "+33 6 12 34 56 78",
    positionTitle: "Développeur Full-Stack Senior",
    positionId: 1,
    status: "pending",
    appliedDate: "2025-12-20",
    experience: "5 ans",
    motivation: "Je suis passionnée par le développement web et je souhaite contribuer à des projets à impact social.",
    cv: "cv_marie_dupont.pdf",
    coverLetter: "lettre_marie_dupont.pdf",
  },
  {
    id: 2,
    candidateName: "Jean Martin",
    candidateEmail: "jean.martin@email.com",
    candidatePhone: "+33 6 98 76 54 32",
    positionTitle: "Chef de Projet Éducatif",
    positionId: 2,
    status: "reviewed",
    appliedDate: "2025-12-18",
    experience: "8 ans",
    motivation: "Mon expérience en gestion de projet éducatif et ma passion pour l'innovation pédagogique me motivent à rejoindre votre équipe.",
    cv: "cv_jean_martin.pdf",
    coverLetter: null,
  },
  {
    id: 3,
    candidateName: "Sophie Leroy",
    candidateEmail: "sophie.leroy@email.com",
    candidatePhone: "+33 6 55 44 33 22",
    positionTitle: "Responsable Communication",
    positionId: 3,
    status: "accepted",
    appliedDate: "2025-12-15",
    experience: "6 ans",
    motivation: "Avec mon background en communication digitale et mon intérêt pour les causes sociales, je suis enthousiaste à l'idée de contribuer à votre mission.",
    cv: "cv_sophie_leroy.pdf",
    coverLetter: "lettre_sophie_leroy.pdf",
  },
  {
    id: 4,
    candidateName: "Pierre Durand",
    candidateEmail: "pierre.durand@email.com",
    candidatePhone: "+33 6 77 88 99 00",
    positionTitle: "Développeur Full-Stack Senior",
    positionId: 1,
    status: "rejected",
    appliedDate: "2025-12-22",
    experience: "3 ans",
    motivation: "Jeune développeur motivé, je souhaite mettre mes compétences au service de projets qui ont du sens.",
    cv: "cv_pierre_durand.pdf",
    coverLetter: "lettre_pierre_durand.pdf",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const statusLabels = {
  pending: "En attente",
  reviewed: "Examinée",
  accepted: "Acceptée",
  rejected: "Refusée",
};

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Extraire les positions uniques pour le filtre
  const positions = Array.from(new Set(mockApplications.map(app => app.positionTitle)))
    .map(title => ({
      value: title,
      label: title,
    }));

  const positionOptions = [
    { value: "all", label: "Tous les postes" },
    ...positions,
  ];

  const statusOptions = [
    { value: "all", label: "Tous les statuts" },
    { value: "pending", label: "En attente" },
    { value: "reviewed", label: "Examinée" },
    { value: "accepted", label: "Acceptée" },
    { value: "rejected", label: "Refusée" },
  ];

  const filteredApplications = mockApplications.filter(application => {
    const matchesSearch = application.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.positionTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === "all" || application.positionTitle === selectedPosition;
    const matchesStatus = selectedStatus === "all" || application.status === selectedStatus;

    return matchesSearch && matchesPosition && matchesStatus;
  });

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    console.log(`Changing status of application ${applicationId} to ${newStatus}`);
    // Ici on mettrait à jour le statut dans la base de données
  };

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
    return (first + last).toUpperCase();
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Candidatures reçues
          </h1>
          <p className="text-sm text-gray-500">
            Gérez les candidatures soumises à vos offres d&apos;emploi
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/candidatures"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-primary-700 transition-all inline-flex items-center gap-2"
          >
            <Briefcase className="h-4 w-4" />
            Voir les offres
          </Link>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total candidatures</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockApplications.length}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-xl text-primary-700">
              <User className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">En attente</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mockApplications.filter(a => a.status === "pending").length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl text-yellow-800">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Acceptées</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mockApplications.filter(a => a.status === "accepted").length}
              </p>
            </div>
            <div className="p-3 bg-primary-50 rounded-xl text-primary-700">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Refusées</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mockApplications.filter(a => a.status === "rejected").length}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-gray-600">
              <XCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, email ou poste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-8"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
            <Select
              placeholder="Poste"
              options={positionOptions}
              value={selectedPosition}
              onValueChange={(value) => setSelectedPosition(value)}
              className="h-8"
            />

            <Select
              placeholder="Statut"
              options={statusOptions}
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value)}
              className="h-8"
            />
          </div>
        </div>
      </div>

      {/* Liste des candidatures */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredApplications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <User className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune candidature trouvée
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedPosition !== "all" || selectedStatus !== "all"
                ? "Essayez de modifier vos filtres de recherche."
                : "Les candidatures apparaîtront ici une fois que des candidats postuleront à vos offres."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}