"use client";

import Link from "next/link";
import { Plus, Search, Edit, Eye, Trash2, Calendar, User, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";
import { Input, Select, Badge } from "@/components/ui";
import { KPICard, CandidatureCard } from "@/components/admin";

// Données mockées pour la démonstration
const mockCandidatures = [
  {
    id: 1,
    title: "Développeur Full-Stack Senior",
    description: "Nous recherchons un développeur expérimenté pour rejoindre notre équipe technique.",
    location: "Paris, France",
    type: "CDI",
    category: "Technique",
    status: "active",
    applicationsCount: 12,
    publishDate: "2025-12-15",
    deadline: "2025-01-15",
    featured: true,
  },
  {
    id: 2,
    title: "Chef de Projet Éducatif",
    description: "Poste responsable de la coordination de projets éducatifs innovants.",
    location: "Lyon, France",
    type: "CDD",
    category: "Éducation",
    status: "draft",
    applicationsCount: 0,
    publishDate: null,
    deadline: "2025-02-01",
    featured: false,
  },
  {
    id: 3,
    title: "Responsable Communication",
    description: "Gestion de la stratégie de communication et des relations presse.",
    location: "Télétravail",
    type: "Freelance",
    category: "Communication",
    status: "closed",
    applicationsCount: 8,
    publishDate: "2025-11-01",
    deadline: "2025-12-01",
    featured: false,
  },
];

const statusColors = {
  active: "bg-green-100 text-green-800",
  draft: "bg-gray-100 text-gray-800",
  closed: "bg-red-100 text-red-800",
};

const typeColors = {
  CDI: "bg-blue-100 text-blue-800",
  CDD: "bg-orange-100 text-orange-800",
  Freelance: "bg-purple-100 text-purple-800",
  Stage: "bg-green-100 text-green-800",
};

export default function CandidaturesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const categoryOptions = [
    { value: "all", label: "Toutes les catégories" },
    { value: "technique", label: "Technique" },
    { value: "éducation", label: "Éducation" },
    { value: "communication", label: "Communication" },
    { value: "management", label: "Management" },
    { value: "design", label: "Design" },
  ];

  const statusOptions = [
    { value: "all", label: "Tous les statuts" },
    { value: "active", label: "Active" },
    { value: "draft", label: "Brouillon" },
    { value: "closed", label: "Fermée" },
  ];

  const typeOptions = [
    { value: "all", label: "Tous les types" },
    { value: "CDI", label: "CDI" },
    { value: "CDD", label: "CDD" },
    { value: "Freelance", label: "Freelance" },
    { value: "Stage", label: "Stage" },
  ];

  const filteredCandidatures = mockCandidatures.filter(candidature => {
    const matchesSearch = candidature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || candidature.category.toLowerCase() === selectedCategory;
    const matchesStatus = selectedStatus === "all" || candidature.status === selectedStatus;
    const matchesType = selectedType === "all" || candidature.type === selectedType;

    return matchesSearch && matchesCategory && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Appels à candidatures
          </h1>
          <p className="text-sm text-gray-500">
            Gérez vos offres d&apos;emploi et appels à projets
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/candidatures/create"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-primary-700 transition-all inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nouvelle offre
          </Link>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          title="Total offres"
          value={mockCandidatures.length.toString()}
          icon={Briefcase}
          iconColor="text-gray-600"
          bgColor="bg-gray-50"
        />

        <KPICard
          title="Offres actives"
          value={mockCandidatures.filter(c => c.status === "active").length.toString()}
          icon={Eye}
          iconColor="text-primary-700"
          bgColor="bg-primary-50"
        />

        <KPICard
          title="Candidatures reçues"
          value={mockCandidatures.reduce((sum, c) => sum + c.applicationsCount, 0).toString()}
          icon={User}
          iconColor="text-primary-700"
          bgColor="bg-primary-50"
        />

        <KPICard
          title="Offres fermées"
          value={mockCandidatures.filter(c => c.status === "closed").length.toString()}
          icon={Trash2}
          iconColor="text-gray-600"
          bgColor="bg-gray-50"
        />
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher des offres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-8"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <Select
              placeholder="Catégorie"
              options={categoryOptions}
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
              className="h-8"
            />

            <Select
              placeholder="Statut"
              options={statusOptions}
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value)}
              className="h-8"
            />

            <Select
              placeholder="Type"
              options={typeOptions}
              value={selectedType}
              onValueChange={(value) => setSelectedType(value)}
              className="h-8"
            />
          </div>
        </div>
      </div>

      {/* Liste des candidatures */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredCandidatures.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Briefcase className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune offre trouvée
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== "all" || selectedStatus !== "all" || selectedType !== "all"
                ? "Essayez de modifier vos filtres de recherche."
                : "Commencez par créer votre première offre d'emploi."}
            </p>
            <Link
              href="/admin/candidatures/create"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-all shadow-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Créer une offre
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredCandidatures.map((candidature) => (
              <CandidatureCard key={candidature.id} candidature={candidature} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}