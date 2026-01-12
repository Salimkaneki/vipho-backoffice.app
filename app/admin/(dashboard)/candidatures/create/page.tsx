"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Input, Textarea, Select, ImageUpload } from "@/components/ui";

interface CandidatureFormData {
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  featuredImage: File | undefined;
  contactEmail: string;
  applicationDeadline: string;
  status: string;
  featured: boolean;
}

export default function CandidatureCreatePage() {
  const [formData, setFormData] = useState<CandidatureFormData>({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    location: "",
    type: "",
    category: "",
    salary: "",
    featuredImage: undefined,
    contactEmail: "",
    applicationDeadline: "",
    status: "draft",
    featured: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: "technique", label: "Technique" },
    { value: "education", label: "Éducation" },
    { value: "communication", label: "Communication" },
    { value: "management", label: "Management" },
    { value: "design", label: "Design" },
    { value: "autre", label: "Autre" },
  ];

  const types = [
    { value: "CDI", label: "CDI" },
    { value: "CDD", label: "CDD" },
    { value: "freelance", label: "Freelance" },
    { value: "stage", label: "Stage" },
    { value: "alternance", label: "Alternance" },
  ];

  const statuses = [
    { value: "draft", label: "Brouillon" },
    { value: "active", label: "Active" },
    { value: "scheduled", label: "Programmée" },
  ];

  const handleInputChange = (field: keyof CandidatureFormData, value: string | File | boolean | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Le titre est requis";
    if (!formData.description.trim()) newErrors.description = "La description est requise";
    if (!formData.location.trim()) newErrors.location = "Le lieu est requis";
    if (!formData.type) newErrors.type = "Le type de contrat est requis";
    if (!formData.category) newErrors.category = "La catégorie est requise";
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "L'email de contact est requis";

    if (formData.status === "scheduled" && !formData.applicationDeadline) {
      newErrors.applicationDeadline = "La date limite est requise pour les offres programmées";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Candidature data:", formData);
      alert("Offre d'emploi enregistrée avec succès !");

      // Reset form
      setFormData({
        title: "",
        description: "",
        requirements: "",
        responsibilities: "",
        location: "",
        type: "",
        category: "",
        salary: "",
        featuredImage: undefined,
        contactEmail: "",
        applicationDeadline: "",
        status: "draft",
        featured: false,
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
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/candidatures"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Retour aux offres"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                Créer une offre
              </h1>
              <p className="text-sm text-gray-500">
                Publiez une nouvelle offre d&apos;emploi ou un appel à projets
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
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-primary-700 transition-all inline-flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              {formData.status === "active" ? "Publier l'offre" :
               formData.status === "scheduled" ? "Programmer" :
               "Enregistrer"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informations principales */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Informations de l&apos;offre
              </h2>

              <div className="space-y-6">
                <Input
                  label="Titre du poste"
                  placeholder="Ex: Développeur Full-Stack Senior"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  error={errors.title}
                  required
                  className="text-base"
                />

                <Textarea
                  label="Description générale"
                  placeholder="Décrivez le poste, l'entreprise, les missions principales..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  error={errors.description}
                  rows={6}
                  required
                />
              </div>
            </div>

            {/* Détails */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Détails du poste
              </h2>

              <div className="space-y-6">
                <Textarea
                  label="Responsabilités"
                  placeholder="Liste des principales responsabilités et missions..."
                  value={formData.responsibilities}
                  onChange={(e) => handleInputChange("responsibilities", e.target.value)}
                  rows={4}
                />

                <Textarea
                  label="Prérequis et compétences"
                  placeholder="Diplômes, expériences, compétences techniques requises..."
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-8 lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Paramètres
              </h2>

              <div className="space-y-5">
                <Select
                  label="Type de contrat"
                  placeholder="Sélectionnez le type"
                  options={types}
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                  error={errors.type}
                />

                <Select
                  label="Catégorie"
                  placeholder="Sélectionnez une catégorie"
                  options={categories}
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                  error={errors.category}
                />

                <Input
                  label="Lieu de travail"
                  placeholder="Ex: Paris, France ou Télétravail"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  error={errors.location}
                  required
                />

                <Input
                  label="Rémunération (optionnel)"
                  placeholder="Ex: 35-45k€ ou À discuter"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                />

                <Input
                  label="Email de contact"
                  type="email"
                  placeholder="contact@organisation.fr"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  error={errors.contactEmail}
                  required
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
                    label="Date limite de candidature"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                    error={errors.applicationDeadline}
                    required
                  />
                )}

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange("featured", e.target.checked)}
                    className="h-4 w-4 mt-0.5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="featured" className="text-sm font-medium text-gray-900">
                      Mise en avant
                    </label>
                    <p className="text-xs text-gray-500">
                      Affiche l&apos;offre en priorité.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Média (optionnel)
              </h2>

              <ImageUpload
                label="Image illustrative"
                value={formData.featuredImage}
                onChange={(file) => handleInputChange("featuredImage", file)}
                placeholder="Ajoutez une image représentative du poste"
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}