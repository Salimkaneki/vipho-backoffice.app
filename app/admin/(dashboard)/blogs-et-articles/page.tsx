"use client";

import Link from "next/link";
import { Plus, Search, Edit, Eye, Trash2, Calendar, User, Tag } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, Input, Select, Badge } from "@/components/ui";
import { KPICard } from "@/components/admin";

// Données mockées pour la démonstration
const mockArticles = [
  {
    id: 1,
    title: "Nouveau projet éducatif lancé dans la région",
    excerpt: "Découvrez comment notre dernier projet vise à améliorer l'accès à l'éducation pour tous les enfants de la communauté.",
    category: "Projets",
    author: "Marie Dupont",
    status: "published",
    publishDate: "2025-12-20",
    tags: ["éducation", "projet", "communauté"],
    featuredImage: null,
  },
  {
    id: 2,
    title: "Guide complet : Comment participer à nos collectes",
    excerpt: "Un tutoriel détaillé pour vous aider à contribuer efficacement à nos campagnes de collecte de fonds.",
    category: "Tutoriels",
    author: "Jean Martin",
    status: "draft",
    publishDate: null,
    tags: ["tutoriel", "collecte", "participation"],
    featuredImage: null,
  },
  {
    id: 3,
    title: "Événement solidaire : Grande collecte de jouets",
    excerpt: "Rejoignez-nous pour notre événement annuel de collecte de jouets au profit des enfants défavorisés.",
    category: "Événements",
    author: "Sophie Leroy",
    status: "scheduled",
    publishDate: "2025-12-25",
    tags: ["événement", "jouets", "solidarité"],
    featuredImage: null,
  },
];

const statusColors = {
  published: "bg-green-100 text-green-800",
  draft: "bg-gray-100 text-gray-800",
  scheduled: "bg-blue-100 text-blue-800",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function BlogsArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const categoryOptions = [
    { value: "all", label: "Toutes les catégories" },
    { value: "actualites", label: "Actualités" },
    { value: "tutoriels", label: "Tutoriels" },
    { value: "evenements", label: "Événements" },
    { value: "projets", label: "Projets" },
    { value: "partenaires", label: "Partenaires" },
  ];

  const statusOptions = [
    { value: "all", label: "Tous les statuts" },
    { value: "published", label: "Publié" },
    { value: "draft", label: "Brouillon" },
    { value: "scheduled", label: "Programmé" },
  ];

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || slugify(article.category) === selectedCategory;
    const matchesStatus = selectedStatus === "all" || article.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen w-full">
      {/* Header avec actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Articles & Blogs
          </h1>
          <p className="text-sm text-gray-500">
            Gérez vos articles, tutoriels et actualités
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/blogs-et-articles/create"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-primary-700 transition-all inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nouvel article
          </Link>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher des articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-8"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-105">
            <Select
              placeholder="Catégorie"
              options={categoryOptions}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="h-8"
            />
            <Select
              placeholder="Statut"
              options={statusOptions}
              value={selectedStatus}
              onValueChange={setSelectedStatus}
              className="h-8"
            />
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total articles"
          value={mockArticles.length.toString()}
          icon={Edit}
          iconColor="text-blue-600"
          bgColor="bg-blue-100"
        />

        <KPICard
          title="Publiés"
          value={mockArticles.filter(a => a.status === "published").length.toString()}
          icon={Eye}
          iconColor="text-green-600"
          bgColor="bg-green-100"
        />

        <KPICard
          title="Brouillons"
          value={mockArticles.filter(a => a.status === "draft").length.toString()}
          icon={Edit}
          iconColor="text-gray-600"
          bgColor="bg-gray-100"
        />

        <KPICard
          title="Programmés"
          value={mockArticles.filter(a => a.status === "scheduled").length.toString()}
          icon={Calendar}
          iconColor="text-blue-600"
          bgColor="bg-blue-100"
        />
      </div>

      {/* Liste des articles */}
      <Card className="overflow-hidden">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Edit className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun article trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                ? "Essayez de modifier vos filtres de recherche."
                : "Commencez par créer votre premier article."}
            </p>
            <Link
              href="/admin/blogs-et-articles/create"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Créer un article
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredArticles.map((article) => (
              <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {article.title}
                      </h3>
                      <Badge variant={article.status as any}>
                        {article.status === "published" ? "Publié" :
                         article.status === "draft" ? "Brouillon" :
                         "Programmé"}
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        {article.category}
                      </div>
                      {article.publishDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(article.publishDate).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>

                    {article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <Link
                      href={`/admin/blogs-et-articles/${article.id}/edit`}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}