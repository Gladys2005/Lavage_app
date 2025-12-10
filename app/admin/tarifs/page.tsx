"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MOCK_TARIFS, type Tarif, formatCFA } from "@/lib/mock-data"
import { Plus, Pencil } from "lucide-react"

export default function AdminTarifsPage() {
  const [tarifs, setTarifs] = useState<Tarif[]>(MOCK_TARIFS)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingTarif, setEditingTarif] = useState<Tarif | null>(null)
  const [newTarif, setNewTarif] = useState({
    category: "",
    item: "",
    price: "",
  })

  const categories = [...new Set(tarifs.map((t) => t.category))]

  const handleAddTarif = () => {
    const tarif: Tarif = {
      id: Date.now().toString(),
      category: newTarif.category,
      item: newTarif.item,
      price: Number.parseFloat(newTarif.price),
      isActive: true,
    }
    setTarifs((prev) => [...prev, tarif])
    setNewTarif({ category: "", item: "", price: "" })
    setIsAddOpen(false)
  }

  const handleUpdateTarif = () => {
    if (!editingTarif) return
    setTarifs((prev) => prev.map((t) => (t.id === editingTarif.id ? editingTarif : t)))
    setEditingTarif(null)
  }

  const handleToggleActive = (id: string) => {
    setTarifs((prev) => prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t)))
  }

  const groupedTarifs = tarifs.reduce(
    (acc, tarif) => {
      if (!acc[tarif.category]) {
        acc[tarif.category] = []
      }
      acc[tarif.category].push(tarif)
      return acc
    },
    {} as Record<string, Tarif[]>,
  )

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif mb-2">Gestion des tarifs</h1>
          <p className="text-muted-foreground">Configurez vos prix de service en FCFA</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un tarif
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouveau tarif</DialogTitle>
              <DialogDescription>Ajoutez un nouveau tarif à votre grille</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select
                  value={newTarif.category}
                  onValueChange={(value) => setNewTarif({ ...newTarif, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Nouvelle catégorie</SelectItem>
                  </SelectContent>
                </Select>
                {newTarif.category === "new" && (
                  <Input
                    placeholder="Nom de la catégorie"
                    onChange={(e) => setNewTarif({ ...newTarif, category: e.target.value })}
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="item">Article</Label>
                <Input
                  id="item"
                  value={newTarif.item}
                  onChange={(e) => setNewTarif({ ...newTarif, item: e.target.value })}
                  placeholder="Chemise, Pantalon, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Prix (FCFA)</Label>
                <Input
                  id="price"
                  type="number"
                  step="100"
                  min="0"
                  value={newTarif.price}
                  onChange={(e) => setNewTarif({ ...newTarif, price: e.target.value })}
                  placeholder="1500"
                />
              </div>
              <Button
                onClick={handleAddTarif}
                className="w-full"
                disabled={!newTarif.category || !newTarif.item || !newTarif.price}
              >
                Ajouter le tarif
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tarifs by Category */}
      <div className="space-y-6">
        {Object.entries(groupedTarifs).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg font-serif">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {items.map((tarif) => (
                  <div key={tarif.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      <Switch checked={tarif.isActive} onCheckedChange={() => handleToggleActive(tarif.id)} />
                      <span className={tarif.isActive ? "" : "text-muted-foreground line-through"}>{tarif.item}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{formatCFA(tarif.price)}</span>
                      <Button variant="ghost" size="sm" onClick={() => setEditingTarif(tarif)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingTarif} onOpenChange={() => setEditingTarif(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le tarif</DialogTitle>
          </DialogHeader>
          {editingTarif && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Article</Label>
                <Input
                  value={editingTarif.item}
                  onChange={(e) => setEditingTarif({ ...editingTarif, item: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Prix (FCFA)</Label>
                <Input
                  type="number"
                  step="100"
                  min="0"
                  value={editingTarif.price}
                  onChange={(e) =>
                    setEditingTarif({
                      ...editingTarif,
                      price: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <Button onClick={handleUpdateTarif} className="w-full">
                Enregistrer
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
