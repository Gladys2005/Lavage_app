"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle } from "lucide-react"
import { formatCFA } from "@/lib/mock-data"

const serviceTypes = [
  { value: "lavage-repassage", label: "Lavage & Repassage", price: 2000 },
  { value: "nettoyage-sec", label: "Nettoyage à sec", price: 3500 },
  { value: "repassage-seul", label: "Repassage seul", price: 1000 },
  { value: "express", label: "Service Express (24h)", price: 5000 },
]

const articleTypes = [
  { value: "chemises", label: "Chemises", unitPrice: 1500 },
  { value: "pantalons", label: "Pantalons", unitPrice: 2000 },
  { value: "costumes", label: "Costumes", unitPrice: 6000 },
  { value: "robes", label: "Robes", unitPrice: 3500 },
  { value: "manteaux", label: "Manteaux", unitPrice: 8000 },
  { value: "couettes", label: "Couettes", unitPrice: 8000 },
  { value: "autre", label: "Autre", unitPrice: 2500 },
]

const quartiers = [
  "Tokoin",
  "Hédzranawoé",
  "Nyékonakpoé",
  "Adidogomé",
  "Bè",
  "Kodjoviakopé",
  "Agoè",
  "Aflao",
  "Agbalépédogan",
  "Djidjolé",
  "Autre",
]

export function OrderForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderCode, setOrderCode] = useState("")

  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    adresse: "",
    quartier: "",
    ville: "Lomé",
    serviceType: "",
    articleType: "",
    quantite: 1,
    notes: "",
    livraisonDomicile: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate order code
    const code = `PP-${Date.now().toString(36).toUpperCase()}`
    setOrderCode(code)
    setIsSuccess(true)
    setIsSubmitting(false)
  }

  const calculateEstimate = () => {
    const article = articleTypes.find((a) => a.value === formData.articleType)
    if (!article) return 0
    return article.unitPrice * formData.quantite + (formData.livraisonDomicile ? 2000 : 0)
  }

  if (isSuccess) {
    return (
      <Card className="text-center py-12">
        <CardContent className="pt-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-serif text-2xl mb-2">Commande envoyée !</h2>
          <p className="text-muted-foreground mb-6">Votre commande a été enregistrée avec succès.</p>
          <div className="bg-secondary rounded-lg p-4 inline-block mb-6">
            <p className="text-sm text-muted-foreground mb-1">Code de suivi</p>
            <p className="text-2xl font-mono font-bold">{orderCode}</p>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Conservez ce code pour suivre votre commande. Un livreur vous contactera bientôt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.push(`/suivi?code=${orderCode}`)}>Suivre ma commande</Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsSuccess(false)
                setFormData({
                  nom: "",
                  telephone: "",
                  adresse: "",
                  quartier: "",
                  ville: "Lomé",
                  serviceType: "",
                  articleType: "",
                  quantite: 1,
                  notes: "",
                  livraisonDomicile: true,
                })
              }}
            >
              Nouvelle commande
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom complet *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder="Kofi Mensah"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone *</Label>
              <Input
                id="telephone"
                type="tel"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                placeholder="+228 90 00 00 00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adresse">Adresse *</Label>
            <Input
              id="adresse"
              value={formData.adresse}
              onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
              placeholder="Boulevard du 13 Janvier"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quartier">Quartier *</Label>
              <Select
                value={formData.quartier}
                onValueChange={(value) => setFormData({ ...formData, quartier: value })}
                required
              >
                <SelectTrigger id="quartier">
                  <SelectValue placeholder="Sélectionnez un quartier" />
                </SelectTrigger>
                <SelectContent>
                  {quartiers.map((quartier) => (
                    <SelectItem key={quartier} value={quartier}>
                      {quartier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ville">Ville *</Label>
              <Input
                id="ville"
                value={formData.ville}
                onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                placeholder="Lomé"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Détails de la commande</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceType">Type de service *</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                required
              >
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="Sélectionnez un service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="articleType">Type d'articles *</Label>
              <Select
                value={formData.articleType}
                onValueChange={(value) => setFormData({ ...formData, articleType: value })}
                required
              >
                <SelectTrigger id="articleType">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  {articleTypes.map((article) => (
                    <SelectItem key={article.value} value={article.value}>
                      {article.label} - {formatCFA(article.unitPrice)}/unité
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantite">Quantité *</Label>
            <Input
              id="quantite"
              type="number"
              min="1"
              max="50"
              value={formData.quantite}
              onChange={(e) => setFormData({ ...formData, quantite: Number.parseInt(e.target.value) || 1 })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes supplémentaires</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Taches spécifiques, instructions particulières..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Options de livraison & Paiement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="livraison"
              checked={formData.livraisonDomicile}
              onCheckedChange={(checked) => setFormData({ ...formData, livraisonDomicile: checked as boolean })}
            />
            <Label htmlFor="livraison" className="text-sm font-normal cursor-pointer">
              Livraison à domicile (+2 000 FCFA)
            </Label>
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Mode de paiement</span>
              <span className="font-medium">Espèces à la livraison</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Estimation totale</span>
              <span className="font-serif font-bold">{formatCFA(calculateEstimate())}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              * Le montant final sera confirmé après vérification des articles
            </p>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full uppercase tracking-wider" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Confirmer la commande"
        )}
      </Button>
    </form>
  )
}
