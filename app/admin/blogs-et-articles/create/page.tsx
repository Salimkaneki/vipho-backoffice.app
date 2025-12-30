"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Input, Textarea, Select, ImageUpload, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  featuredImage: File | undefined;
  author: string;
  status: string;
  publishDate: string;
}

export default function BlogFormsPage() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    featuredImage: undefined,
    author: "",
    status: "draft",
    publishDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: "actualites", label: "Actualités" },
    { value: "tutoriels", label: "Tutoriels" },
    { value: "evenements", label: "Événements" },
    { value: "projets", label: "Projets" },
    { value: "partenaires", label: "Partenaires" },
  ];

  const statuses = [
    { value: "draft", label: "Brouillon" },
    { value: "published", label: "Publié" },
    { value: "scheduled", label: "Programmé" },
  ];

  const handleInputChange = (field: keyof BlogFormData, value: string | File | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Le titre est requis";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Le résumé est requis";
    if (!formData.content.trim()) newErrors.content = "Le contenu est requis";
    if (!formData.category) newErrors.category = "La catégorie est requise";
    if (!formData.author.trim()) newErrors.author = "L'auteur est requis";

    if (formData.status === "scheduled" && !formData.publishDate) {
      newErrors.publishDate = "La date de publication est requise pour les articles programmés";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Blog data:", formData);
      alert("Article enregistré avec succès !");

      // Reset form
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: "",
        featuredImage: undefined,
        author: "",
        status: "draft",
        publishDate: "",
      });
    }
  };

  const handleSaveDraft = () => {
    setFormData(prev => ({ ...prev, status: "draft" }));
    console.log("Draft saved:", formData);
    alert("Brouillon sauvegardé !");
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen w-full">
      {/* Header avec actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blogs-et-articles"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Ajouter un article
            </h1>
            <p className="text-sm text-gray-500">
              Créez un nouvel article de blog ou une activité
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-50 transition-all shadow-sm"
          >
            Sauvegarder le brouillon
          </button>
          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-primary-700 transition-all"
          >
            {formData.status === "published" ? "Publier maintenant" :
             formData.status === "scheduled" ? "Programmer la publication" :
             "Enregistrer"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section principale */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="text-primary-600 h-5 w-5" />
              <CardTitle>Informations principales</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Titre de l'article"
                  placeholder="Entrez un titre accrocheur"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  error={errors.title}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  label="Résumé (excerpt)"
                  placeholder="Un court résumé qui apparaîtra dans les listes..."
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  error={errors.excerpt}
                  rows={3}
                  required
                />
              </div>

              <Select
                label="Catégorie"
                placeholder="Sélectionnez une catégorie"
                options={categories}
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
                error={errors.category}
              />

              <Input
                label="Auteur"
                placeholder="Nom de l'auteur"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                error={errors.author}
                required
              />

              <Input
                label="Tags (séparés par des virgules)"
                placeholder="environnement, éducation, projet..."
                value={formData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
              />

              <Select
                label="Statut"
                placeholder="Sélectionnez le statut"
                options={statuses}
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              />

              {formData.status === "scheduled" && (
                <Input
                  label="Date de publication"
                  type="datetime-local"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange("publishDate", e.target.value)}
                  error={errors.publishDate}
                  required
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Image à la une */}
        <Card>
          <CardHeader>
            <CardTitle>Image à la une</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              label="Sélectionnez une image"
              value={formData.featuredImage}
              onChange={(file) => handleInputChange("featuredImage", file)}
              placeholder="Cliquez pour ajouter une image d'illustration"
              accept="image/*"
            />
          </CardContent>
        </Card>

        {/* Contenu */}
        <Card>
          <CardHeader>
            <CardTitle>Contenu de l&apos;article</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              label="Contenu complet"
              placeholder="Écrivez le contenu de votre article ici..."
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              error={errors.content}
              rows={15}
              required
            />
          </CardContent>
        </Card>
      </form>
    </div>
  );
}