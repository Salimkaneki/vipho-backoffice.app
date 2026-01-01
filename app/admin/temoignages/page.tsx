"use client";

import Link from "next/link";
import { Plus, Search, Edit, Eye, Trash2, Calendar, User, Building, Star } from "lucide-react";
import { useState } from "react";
import { Input, Select, Badge } from "@/components/ui";
import { KPICard, TemoignageCard } from "@/components/admin";

// Données mockées pour la démonstration
const mockTemoignages = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Directrice Marketing",
    company: "TechCorp",
    content: "Une expérience exceptionnelle avec l'équipe. Leur expertise et leur professionnalisme ont dépassé nos attentes.",
    rating: 5,
    status: "published",
    date: "2025-12-15",
    featured: true,
  },
  {
    id: 2,
    name: "Jean Martin",
    role: "Chef de Projet",
    company: "InnovateLab",
    content: "Collaboration fructueuse qui a permis de mener à bien notre projet dans les délais impartis.",
    rating: 4,
    status: "published",
    date: "2025-12-10",
    featured: false,
  },
  {
    id: 3,
    name: "Sophie Leroy",
    role: "Responsable RH",
    company: "StartUp Plus",
    content: "Service client remarquable et solutions adaptées à nos besoins spécifiques.",
    rating: 5,
    status: "draft",
    date: "2025-12-05",
    featured: false,
  },
];

const statusColors = {
  published: "bg-green-100 text-green-800",
  draft: "bg-gray-100 text-gray-800",
  archived: "bg-red-100 text-red-800",
};

export default function TemoignagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");

  const statusOptions = [
    { value: "all", label: "Tous les statuts" },
    { value: "published", label: "Publié" },
    { value: "draft", label: "Brouillon" },
    { value: "archived", label: "Archivé" },
  ];

  const ratingOptions = [
    { value: "all", label: "Toutes les notes" },
    { value: "5", label: "5 étoiles" },
    { value: "4", label: "4 étoiles" },
    { value: "3", label: "3 étoiles" },
    { value: "2", label: "2 étoiles" },
    { value: "1", label: "1 étoile" },
  ];

  const filteredTemoignages = mockTemoignages.filter(temoignage => {
    const matchesSearch = temoignage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         temoignage.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         temoignage.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || temoignage.status === selectedStatus;
    const matchesRating = selectedRating === "all" || temoignage.rating.toString() === selectedRating;

    return matchesSearch && matchesStatus && matchesRating;
  });

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Témoignages
          </h1>
          <p className="text-sm text-gray-500">
            Gérez les témoignages de vos clients et partenaires
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/temoignages/create"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-primary-700 transition-all inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nouveau témoignage
          </Link>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          title="Total témoignages"
          value={mockTemoignages.length.toString()}
          icon={User}
          iconColor="text-gray-600"
          bgColor="bg-gray-50"
        />

        <KPICard
          title="Témoignages publiés"
          value={mockTemoignages.filter(t => t.status === "published").length.toString()}
          icon={Eye}
          iconColor="text-primary-700"
          bgColor="bg-primary-50"
        />

        <KPICard
          title="Note moyenne"
          value={(mockTemoignages.reduce((sum, t) => sum + t.rating, 0) / mockTemoignages.length).toFixed(1)}
          icon={Star}
          iconColor="text-yellow-600"
          bgColor="bg-yellow-50"
        />

        <KPICard
          title="Témoignages en attente"
          value={mockTemoignages.filter(t => t.status === "draft").length.toString()}
          icon={Edit}
          iconColor="text-orange-600"
          bgColor="bg-orange-50"
        />
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher des témoignages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-8"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
            <Select
              placeholder="Statut"
              options={statusOptions}
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value)}
              className="h-8"
            />

            <Select
              placeholder="Note"
              options={ratingOptions}
              value={selectedRating}
              onValueChange={(value) => setSelectedRating(value)}
              className="h-8"
            />
          </div>
        </div>
      </div>

      {/* Liste des témoignages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemoignages.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-400 mb-4">
              <User className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun témoignage trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedStatus !== "all" || selectedRating !== "all"
                ? "Essayez de modifier vos filtres de recherche."
                : "Commencez par recueillir votre premier témoignage."}
            </p>
            <Link
              href="/admin/temoignages/create"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-all shadow-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Ajouter un témoignage
            </Link>
          </div>
        ) : (
          filteredTemoignages.map((temoignage) => (
            <TemoignageCard key={temoignage.id} temoignage={temoignage} />
          ))
        )}
      </div>
    </div>
  );
}