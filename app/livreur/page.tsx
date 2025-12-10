"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MOCK_ORDERS, STATUS_LABELS, STATUS_COLORS, type Order, type OrderStatus, formatCFA } from "@/lib/mock-data"
import { Package, MapPin, Phone, CheckCircle, Truck, Navigation, ChevronRight } from "lucide-react"

export default function LivreurDashboardPage() {
  const { user } = useAuth()

  // Filter orders assigned to current livreur
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS.filter((o) => o.livreurId === user?.id))
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const activeOrders = orders.filter((o) => ["picked_up", "processing", "ready", "delivering"].includes(o.status))
  const completedToday = orders.filter((o) => o.status === "delivered").length

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order,
      ),
    )
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
  }

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const flow: Record<string, OrderStatus> = {
      picked_up: "processing",
      processing: "ready",
      ready: "delivering",
      delivering: "delivered",
    }
    return flow[currentStatus] || null
  }

  const getNextStatusLabel = (currentStatus: OrderStatus): string | null => {
    const nextStatus = getNextStatus(currentStatus)
    return nextStatus ? STATUS_LABELS[nextStatus] : null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-sky-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeOrders.length}</p>
                <p className="text-sm text-muted-foreground">En cours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedToday}</p>
                <p className="text-sm text-muted-foreground">Livrées</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Mes commandes assignées
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Aucune commande assignée pour le moment</div>
          ) : (
            <div className="divide-y divide-border">
              {orders
                .filter((o) => o.status !== "delivered")
                .sort((a, b) => {
                  // Priority: delivering > ready > processing > picked_up
                  const priority: Record<string, number> = {
                    delivering: 0,
                    ready: 1,
                    processing: 2,
                    picked_up: 3,
                  }
                  return (priority[a.status] || 99) - (priority[b.status] || 99)
                })
                .map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-medium">{order.code}</span>
                      <Badge className={STATUS_COLORS[order.status]}>{STATUS_LABELS[order.status]}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{order.clientName}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {order.quartier}, {order.city}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </button>
                ))}

              {/* Completed orders section */}
              {orders.filter((o) => o.status === "delivered").length > 0 && (
                <>
                  <div className="p-4 bg-muted/30">
                    <p className="text-sm font-medium text-muted-foreground">Commandes livrées</p>
                  </div>
                  {orders
                    .filter((o) => o.status === "delivered")
                    .map((order) => (
                      <div key={order.id} className="p-4 opacity-60">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-mono text-sm">{order.code}</span>
                            <p className="text-sm">{order.clientName}</p>
                          </div>
                          <Badge className={STATUS_COLORS[order.status]}>{STATUS_LABELS[order.status]}</Badge>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between font-serif">
              <span>{selectedOrder?.code}</span>
              {selectedOrder && (
                <Badge className={STATUS_COLORS[selectedOrder.status]}>{STATUS_LABELS[selectedOrder.status]}</Badge>
              )}
            </DialogTitle>
            <DialogDescription>Détails de la commande</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Client Info */}
              <div className="space-y-3">
                <h4 className="font-medium">Client</h4>
                <div className="bg-secondary rounded-lg p-4 space-y-2">
                  <p className="font-medium text-lg">{selectedOrder.clientName}</p>
                  <a
                    href={`tel:${selectedOrder.phone}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {selectedOrder.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <h4 className="font-medium">Adresse</h4>
                <div className="bg-secondary rounded-lg p-4">
                  <p>{selectedOrder.address}</p>
                  <p>
                    {selectedOrder.quartier}, {selectedOrder.city}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selectedOrder.address}, ${selectedOrder.quartier}, ${selectedOrder.city}, Togo`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-primary hover:underline text-sm"
                  >
                    <Navigation className="h-4 w-4" />
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-3">
                <h4 className="font-medium">Commande</h4>
                <div className="bg-secondary rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span>{selectedOrder.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Articles</span>
                    <span>
                      {selectedOrder.quantity}x {selectedOrder.articleType}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-border">
                    <span>Total à encaisser</span>
                    <span>{formatCFA(selectedOrder.estimatedTotal)}</span>
                  </div>
                </div>
                {selectedOrder.notes && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                    <p className="font-medium text-amber-800 mb-1">Note :</p>
                    <p className="text-amber-700">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              {getNextStatus(selectedOrder.status) && (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    const nextStatus = getNextStatus(selectedOrder.status)
                    if (nextStatus) {
                      handleStatusChange(selectedOrder.id, nextStatus)
                    }
                  }}
                >
                  Marquer comme "{getNextStatusLabel(selectedOrder.status)}"
                </Button>
              )}

              {selectedOrder.status === "delivered" && (
                <div className="text-center text-emerald-600 font-medium flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Commande livrée
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
