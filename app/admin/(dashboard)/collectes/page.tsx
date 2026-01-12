"use client";

import Link from "next/link";
import { Plus, Search, Edit, Eye, Calendar, Target, Users } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, Input, Select } from "@/components/ui";
import { KPICard } from "@/components/admin";

// Données mockées pour la démonstration
const mockCollectes = [
  {
    id: 1,
    title: "Aide aux familles en difficulté",
    description: "Collecte de fonds pour soutenir les familles monoparentales et les personnes en situation de précarité.",
    goal: 15000,
    raised: 8750,
    status: "active" as const,
    startDate: "2025-12-01",
    endDate: "2025-12-31",
    category: "Urgence sociale",
    participants: 245,
    featuredImage: null,
  },
  {
    id: 2,
    title: "Éducation pour tous",
    description: "Campagne pour financer des fournitures scolaires et du matériel pédagogique pour les écoles défavorisées.",
    goal: 25000,
    raised: 18750,
    status: "active" as const,
    startDate: "2025-11-15",
    endDate: "2026-01-15",
    category: "Éducation",
    participants: 189,
    featuredImage: null,
  },
  {
    id: 3,
    title: "Soutien aux personnes âgées",
    description: "Collecte pour améliorer les conditions de vie des personnes âgées isolées dans notre communauté.",
    goal: 12000,
    raised: 12000,
    status: "completed" as const,
    startDate: "2025-10-01",
    endDate: "2025-11-30",
    category: "Personnes âgées",
    participants: 156,
    featuredImage: null,
  },
  {
    id: 4,
    title: "Protection de l'environnement",
    description: "Campagne pour nettoyer les espaces verts et sensibiliser à la protection de l'environnement local.",
    goal: 8000,
    raised: 3200,
    status: "draft" as const,
    startDate: null,
    endDate: null,
    category: "Environnement",
    participants: 0,
    featuredImage: null,
  },
];

const statusColors = {
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  draft: "bg-gray-100 text-gray-800",
  paused: "bg-yellow-100 text-yellow-800",
};

const statusLabels = {
  active: "Active",
  completed: "Terminée",
  draft: "Brouillon",
  paused: "En pause",
};

export default function CollectesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = [
    { value: "all", label: "Tous les statuts" },
    { value: "active", label: "Actives" },
    { value: "completed", label: "Terminées" },
    { value: "draft", label: "Brouillons" },
    { value: "paused", label: "En pause" },
  ];

  const filteredCollectes = mockCollectes.filter((collecte) => {
    const matchesSearch = collecte.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collecte.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || collecte.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const calculateProgress = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen w-full">
      {/* Header avec actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Collectes
          </h1>
          <p className="text-sm text-gray-500">
            Gérez vos campagnes de collecte de fonds
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/collectes/create"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-primary-700 transition-all inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nouvelle collecte
          </Link>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total collectes"
          value={mockCollectes.length.toString()}
          icon={Target}
          iconColor="text-blue-600"
          bgColor="bg-blue-100"
        />

        <KPICard
          title="Actives"
          value={mockCollectes.filter(c => c.status === "active").length.toString()}
          icon={Eye}
          iconColor="text-green-600"
          bgColor="bg-green-100"
        />

        <KPICard
          title="Terminées"
          value={mockCollectes.filter(c => c.status === "completed").length.toString()}
          icon={Calendar}
          iconColor="text-blue-600"
          bgColor="bg-blue-100"
        />

        <KPICard
          title="Total récolté"
          value={formatCurrency(mockCollectes.reduce((sum, c) => sum + c.raised, 0))}
          icon={Users}
          iconColor="text-primary-600"
          bgColor="bg-primary-100"
        />
      </div>

      {/* Filtres stratégiques - juste avant les résultats */}
      <div className="flex justify-end mb-6">
        <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm min-w-fit">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher une collecte..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-8"
              />
            </div>
          </div>
          <div className="w-full sm:w-40">
            <Select
              placeholder="Statut"
              options={statusOptions}
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="h-8"
            />
          </div>
        </div>
      </div>

      {/* Collectes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCollectes.map((collecte) => (
          <Card key={collecte.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {/* Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{collecte.category}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[collecte.status]}`}>
                  {statusLabels[collecte.status]}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{collecte.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{collecte.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{formatCurrency(collecte.raised)}</span>
                  <span className="text-gray-500">{formatCurrency(collecte.goal)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress(collecte.raised, collecte.goal)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {Math.round(calculateProgress(collecte.raised, collecte.goal))}% atteint
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <Eye size={16} />
                  Voir
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-primary-100 text-primary-700 px-3 py-2 rounded-lg hover:bg-primary-200 transition-colors text-sm">
                  <Edit size={16} />
                  Modifier
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCollectes.length === 0 && (
        <div className="text-center py-12">
          <Target className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune collecte trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== "all"
              ? "Essayez de modifier vos filtres de recherche."
              : "Commencez par créer votre première collecte."}
          </p>
          {!searchTerm && statusFilter === "all" && (
            <div className="mt-6">
              <Link
                href="/admin/collectes/create"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus size={20} />
                Créer une collecte
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}