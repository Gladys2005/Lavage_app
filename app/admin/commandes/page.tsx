"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  MOCK_ORDERS,
  MOCK_LIVREURS,
  STATUS_LABELS,
  STATUS_COLORS,
  type Order,
  type OrderStatus,
  formatCFA,
} from "@/lib/mock-data"
import { Search, Eye, UserPlus } from "lucide-react"

export default function AdminCommandesPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isAssignOpen, setIsAssignOpen] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order,
      ),
    )
  }

  const handleAssignLivreur = (orderId: string, livreurId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, livreurId, updatedAt: new Date().toISOString() } : order,
      ),
    )
    setIsAssignOpen(false)
  }

  const getLivreurName = (livreurId?: string) => {
    if (!livreurId) return "Non assigné"
    const livreur = MOCK_LIVREURS.find((l) => l.id === livreurId)
    return livreur?.name || "Inconnu"
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-serif mb-2">Gestion des commandes</h1>
        <p className="text-muted-foreground">Gérez et suivez toutes les commandes</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par code, nom ou téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Code</th>
                  <th className="text-left p-4 font-medium text-sm">Client</th>
                  <th className="text-left p-4 font-medium text-sm hidden md:table-cell">Service</th>
                  <th className="text-left p-4 font-medium text-sm hidden lg:table-cell">Livreur</th>
                  <th className="text-left p-4 font-medium text-sm">Statut</th>
                  <th className="text-left p-4 font-medium text-sm hidden sm:table-cell">Total</th>
                  <th className="text-right p-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30">
                    <td className="p-4">
                      <span className="font-mono font-medium">{order.code}</span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{order.clientName}</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div>
                        <p>{order.serviceType}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.quantity}x {order.articleType}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className={order.livreurId ? "" : "text-muted-foreground"}>
                        {getLivreurName(order.livreurId)}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge className={STATUS_COLORS[order.status]}>{STATUS_LABELS[order.status]}</Badge>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="font-medium">{formatCFA(order.estimatedTotal)}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order)
                            setIsDetailOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order)
                            setIsAssignOpen(true)
                          }}
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">Aucune commande trouvée</div>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">Détails de la commande</DialogTitle>
            <DialogDescription>{selectedOrder?.code}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Client</Label>
                  <p className="font-medium">{selectedOrder.clientName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Téléphone</Label>
                  <p className="font-medium">{selectedOrder.phone}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Adresse</Label>
                <p className="font-medium">
                  {selectedOrder.address}, {selectedOrder.quartier}, {selectedOrder.city}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Service</Label>
                  <p className="font-medium">{selectedOrder.serviceType}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Articles</Label>
                  <p className="font-medium">
                    {selectedOrder.quantity}x {selectedOrder.articleType}
                  </p>
                </div>
              </div>
              {selectedOrder.notes && (
                <div>
                  <Label className="text-muted-foreground">Notes</Label>
                  <p className="font-medium">{selectedOrder.notes}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Livreur</Label>
                  <p className="font-medium">{getLivreurName(selectedOrder.livreurId)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Total</Label>
                  <p className="font-medium">{formatCFA(selectedOrder.estimatedTotal)}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Changer le statut</Label>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => {
                    handleStatusChange(selectedOrder.id, value as OrderStatus)
                    setSelectedOrder({ ...selectedOrder, status: value as OrderStatus })
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Livreur Dialog */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif">Assigner un livreur</DialogTitle>
            <DialogDescription>Commande {selectedOrder?.code}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {MOCK_LIVREURS.filter((l) => l.isActive).map((livreur) => (
              <button
                key={livreur.id}
                onClick={() => selectedOrder && handleAssignLivreur(selectedOrder.id, livreur.id)}
                className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div>
                  <p className="font-medium">{livreur.name}</p>
                  <p className="text-sm text-muted-foreground">{livreur.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{livreur.ordersCompleted} livraisons</p>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
