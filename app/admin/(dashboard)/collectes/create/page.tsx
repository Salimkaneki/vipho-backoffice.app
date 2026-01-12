"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Target, Calendar } from "lucide-react";
import { Input, Textarea, Select, ImageUpload, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface CollecteFormData {
  title: string;
  description: string;
  goal: string;
  category: string;
  startDate: string;
  endDate: string;
  featuredImage: File | undefined;
  status: string;
  contactInfo: string;
  bankDetails: string;
}

export default function CollecteCreatePage() {
  const [formData, setFormData] = useState<CollecteFormData>({
    title: "",
    description: "",
    goal: "",
    category: "",
    startDate: "",
    endDate: "",
    featuredImage: undefined,
    status: "draft",
    contactInfo: "",
    bankDetails: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: "urgence-sociale", label: "Urgence sociale" },
    { value: "education", label: "Éducation" },
    { value: "sante", label: "Santé" },
    { value: "environnement", label: "Environnement" },
    { value: "personnes-agees", label: "Personnes âgées" },
    { value: "enfants", label: "Enfants" },
    { value: "animaux", label: "Animaux" },
    { value: "culture", label: "Culture" },
    { value: "sport", label: "Sport" },
    { value: "autre", label: "Autre" },
  ];

  const statuses = [
    { value: "draft", label: "Brouillon" },
    { value: "active", label: "Active" },
    { value: "paused", label: "En pause" },
    { value: "completed", label: "Terminée" },
  ];

  const handleInputChange = (field: keyof CollecteFormData, value: string | File | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Le titre est obligatoire";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est obligatoire";
    }

    if (!formData.goal || isNaN(Number(formData.goal)) || Number(formData.goal) <= 0) {
      newErrors.goal = "L'objectif doit être un nombre positif";
    }

    if (!formData.category) {
      newErrors.category = "La catégorie est obligatoire";
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (start >= end) {
        newErrors.endDate = "La date de fin doit être postérieure à la date de début";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Ici, vous ajouteriez la logique pour sauvegarder la collecte
    console.log("Données de la collecte:", formData);

    // Simulation d'une sauvegarde réussie
    alert("Collecte créée avec succès !");
  };

  const formatCurrency = (value: string) => {
    const numValue = value.replace(/\D/g, "");
    return numValue ? new Intl.NumberFormat('fr-FR').format(Number(numValue)) : "";
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen w-full">
      {/* Header avec actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/collectes"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Créer une collecte
            </h1>
            <p className="text-sm text-gray-500">
              Configurez votre campagne de collecte de fonds
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/collectes"
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-50 transition-all shadow-sm"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-primary-700 transition-all inline-flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Créer la collecte
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations principales */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="text-primary-600 h-5 w-5" />
              <CardTitle>Informations principales</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Titre de la collecte"
                  placeholder="Ex: Aide aux familles en difficulté"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  error={errors.title}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  label="Description détaillée"
                  placeholder="Décrivez l'objectif de votre collecte, comment les fonds seront utilisés..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  error={errors.description}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Input
                  label="Objectif financier (€)"
                  placeholder="Ex: 5000"
                  value={formData.goal}
                  onChange={(e) => handleInputChange("goal", formatCurrency(e.target.value))}
                  error={errors.goal}
                  required
                />
              </div>

              <div>
                <Select
                  label="Catégorie"
                  options={categories}
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                  error={errors.category}
                  placeholder="Sélectionnez une catégorie"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dates et statut */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="text-primary-600 h-5 w-5" />
              <CardTitle>Dates et statut</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Input
                  label="Date de début"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>

              <div>
                <Input
                  label="Date de fin"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  error={errors.endDate}
                />
              </div>

              <div>
                <Select
                  label="Statut"
                  options={statuses}
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                  placeholder="Sélectionnez un statut"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image et informations complémentaires */}
        <Card>
          <CardHeader>
            <CardTitle>Image et informations complémentaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <ImageUpload
                  label="Image de couverture"
                  value={formData.featuredImage}
                  onChange={(file) => handleInputChange("featuredImage", file)}
                  accept="image/*"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Format recommandé : 1200x600px, JPG ou PNG
                </p>
              </div>

              <div>
                <Textarea
                  label="Informations de contact"
                  placeholder="Comment les donateurs peuvent vous contacter pour plus d'informations..."
                  value={formData.contactInfo}
                  onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Textarea
                  label="Coordonnées bancaires"
                  placeholder="IBAN, BIC, nom de la banque... (Ces informations ne seront visibles que par vous)"
                  value={formData.bankDetails}
                  onChange={(e) => handleInputChange("bankDetails", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}