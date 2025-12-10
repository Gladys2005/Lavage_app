"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MOCK_LIVREURS, type Livreur } from "@/lib/mock-data"
import { Plus, Phone, Mail, Package } from "lucide-react"

export default function AdminLivreursPage() {
  const [livreurs, setLivreurs] = useState<Livreur[]>(MOCK_LIVREURS)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newLivreur, setNewLivreur] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleToggleActive = (id: string) => {
    setLivreurs((prev) => prev.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l)))
  }

  const handleAddLivreur = () => {
    const livreur: Livreur = {
      id: Date.now().toString(),
      ...newLivreur,
      isActive: true,
      ordersCompleted: 0,
    }
    setLivreurs((prev) => [...prev, livreur])
    setNewLivreur({ name: "", email: "", phone: "" })
    setIsAddOpen(false)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif mb-2">Gestion des livreurs</h1>
          <p className="text-muted-foreground">Gérez votre équipe de livraison</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un livreur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouveau livreur</DialogTitle>
              <DialogDescription>Ajoutez un nouveau livreur à votre équipe</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={newLivreur.name}
                  onChange={(e) => setNewLivreur({ ...newLivreur, name: e.target.value })}
                  placeholder="Ahmed M."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newLivreur.email}
                  onChange={(e) => setNewLivreur({ ...newLivreur, email: e.target.value })}
                  placeholder="livreur@pressingpro.fr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={newLivreur.phone}
                  onChange={(e) => setNewLivreur({ ...newLivreur, phone: e.target.value })}
                  placeholder="06 12 34 56 78"
                />
              </div>
              <Button
                onClick={handleAddLivreur}
                className="w-full"
                disabled={!newLivreur.name || !newLivreur.email || !newLivreur.phone}
              >
                Ajouter le livreur
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total livreurs</p>
            <p className="text-3xl font-bold">{livreurs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Actifs</p>
            <p className="text-3xl font-bold text-green-600">{livreurs.filter((l) => l.isActive).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Inactifs</p>
            <p className="text-3xl font-bold text-muted-foreground">{livreurs.filter((l) => !l.isActive).length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Livreurs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {livreurs.map((livreur) => (
          <Card key={livreur.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">{livreur.name}</h3>
                  <Badge variant={livreur.isActive ? "default" : "secondary"}>
                    {livreur.isActive ? "Actif" : "Inactif"}
                  </Badge>
                </div>
                <Switch checked={livreur.isActive} onCheckedChange={() => handleToggleActive(livreur.id)} />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{livreur.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{livreur.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>{livreur.ordersCompleted} livraisons effectuées</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
