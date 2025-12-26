"use client";

import { useState } from "react";
import { Input, Textarea, Select, ImageUpload } from "@/components/ui";
import Header from "../../components/layouts/header";

export default function TestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    category: "",
    image: undefined as File | undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: "education", label: "Éducation" },
    { value: "sante", label: "Santé" },
    { value: "environnement", label: "Environnement" },
    { value: "social", label: "Social" },
  ];

  const handleInputChange = (field: string, value: string | File | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    if (!formData.description.trim()) newErrors.description = "La description est requise";
    if (!formData.category) newErrors.category = "La catégorie est requise";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      alert("Formulaire soumis avec succès !");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Test des Composants UI
              </h1>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Nom"
                    placeholder="Entrez votre nom"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={errors.name}
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="Entrez votre email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errors.email}
                  />

                  <Textarea
                    label="Description"
                    placeholder="Entrez une description détaillée"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    error={errors.description}
                    rows={4}
                  />

                  <Select
                    label="Catégorie"
                    placeholder="Sélectionnez une catégorie"
                    options={categories}
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                    error={errors.category}
                  />

                  <ImageUpload
                    label="Image"
                    value={formData.image}
                    onChange={(file) => handleInputChange("image", file)}
                  />

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      Soumettre
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          name: "",
                          email: "",
                          description: "",
                          category: "",
                          image: undefined,
                        });
                        setErrors({});
                      }}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Réinitialiser
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
