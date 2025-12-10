"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, Sparkles, CheckCircle, Clock, MapPin, Phone, AlertCircle } from "lucide-react"
import { formatCFA } from "@/lib/mock-data"

type OrderStatus = "pending" | "picked_up" | "processing" | "ready" | "delivering" | "delivered"

interface OrderInfo {
  code: string
  status: OrderStatus
  clientName: string
  address: string
  phone: string
  serviceType: string
  articleType: string
  quantity: number
  createdAt: string
  estimatedDelivery: string
  estimatedTotal: number
  livreur?: {
    name: string
    phone: string
  }
  timeline: {
    status: OrderStatus
    label: string
    timestamp?: string
    completed: boolean
    current: boolean
  }[]
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof Package }> = {
  pending: { label: "En attente de ramassage", color: "bg-amber-100 text-amber-800", icon: Clock },
  picked_up: { label: "Articles récupérés", color: "bg-sky-100 text-sky-800", icon: Package },
  processing: { label: "En traitement", color: "bg-violet-100 text-violet-800", icon: Sparkles },
  ready: { label: "Prêt pour livraison", color: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
  delivering: { label: "En cours de livraison", color: "bg-orange-100 text-orange-800", icon: Truck },
  delivered: { label: "Livré", color: "bg-green-100 text-green-800", icon: CheckCircle },
}

function getMockOrderData(code: string): OrderInfo | null {
  if (!code.startsWith("PP-")) {
    return null
  }

  const statuses: OrderStatus[] = ["pending", "picked_up", "processing", "ready", "delivering", "delivered"]
  const randomStatusIndex = Math.floor(Math.random() * 4)

  const currentStatus = statuses[randomStatusIndex]

  const timeline = [
    {
      status: "pending" as OrderStatus,
      label: "Commande reçue",
      timestamp: "02/12/2025 14:30",
      completed: true,
      current: false,
    },
    {
      status: "picked_up" as OrderStatus,
      label: "Articles récupérés",
      timestamp: randomStatusIndex >= 1 ? "02/12/2025 16:00" : undefined,
      completed: randomStatusIndex >= 1,
      current: randomStatusIndex === 1,
    },
    {
      status: "processing" as OrderStatus,
      label: "En traitement",
      timestamp: randomStatusIndex >= 2 ? "02/12/2025 18:00" : undefined,
      completed: randomStatusIndex >= 2,
      current: randomStatusIndex === 2,
    },
    {
      status: "ready" as OrderStatus,
      label: "Prêt pour livraison",
      timestamp: randomStatusIndex >= 3 ? "03/12/2025 10:00" : undefined,
      completed: randomStatusIndex >= 3,
      current: randomStatusIndex === 3,
    },
    {
      status: "delivering" as OrderStatus,
      label: "En cours de livraison",
      timestamp: randomStatusIndex >= 4 ? "03/12/2025 14:00" : undefined,
      completed: randomStatusIndex >= 4,
      current: randomStatusIndex === 4,
    },
    {
      status: "delivered" as OrderStatus,
      label: "Livré",
      timestamp: randomStatusIndex >= 5 ? "03/12/2025 15:30" : undefined,
      completed: randomStatusIndex >= 5,
      current: randomStatusIndex === 5,
    },
  ]

  return {
    code,
    status: currentStatus,
    clientName: "Kofi Mensah",
    address: "Boulevard du 13 Janvier, Tokoin, Lomé",
    phone: "+228 90 12 34 56",
    serviceType: "Lavage & Repassage",
    articleType: "Chemises",
    quantity: 5,
    estimatedTotal: 9500,
    createdAt: "02/12/2025 14:30",
    estimatedDelivery: "03/12/2025",
    livreur:
      randomStatusIndex >= 1
        ? {
            name: "Kodjo A.",
            phone: "+228 90 98 76 54",
          }
        : undefined,
    timeline,
  }
}

export function OrderTracker({ orderCode }: { orderCode: string }) {
  const [order, setOrder] = useState<OrderInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    setNotFound(false)

    const timer = setTimeout(() => {
      const orderData = getMockOrderData(orderCode)
      if (orderData) {
        setOrder(orderData)
        setNotFound(false)
      } else {
        setOrder(null)
        setNotFound(true)
      }
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [orderCode])

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-48 mx-auto" />
            <div className="h-4 bg-muted rounded w-64 mx-auto" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (notFound) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="font-serif font-medium text-lg mb-2">Commande introuvable</h3>
          <p className="text-muted-foreground">
            Aucune commande trouvée avec le code <span className="font-mono font-bold">{orderCode}</span>.
            <br />
            Vérifiez le code et réessayez.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!order) return null

  const StatusIcon = statusConfig[order.status].icon

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Commande</p>
              <CardTitle className="font-mono text-2xl">{order.code}</CardTitle>
            </div>
            <Badge className={`${statusConfig[order.status].color} text-sm px-3 py-1`}>
              <StatusIcon className="h-4 w-4 mr-2" />
              {statusConfig[order.status].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Timeline */}
          <div className="relative">
            {order.timeline.map((step, index) => (
              <div key={step.status} className="flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-primary text-primary-foreground"
                        : step.current
                          ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  {index < order.timeline.length - 1 && (
                    <div className={`w-0.5 flex-1 mt-2 ${step.completed ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p
                    className={`font-medium ${step.current ? "text-foreground" : step.completed ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {step.label}
                  </p>
                  {step.timestamp && <p className="text-sm text-muted-foreground">{step.timestamp}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Détails de la commande</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Service</p>
              <p className="font-medium">{order.serviceType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Articles</p>
              <p className="font-medium">
                {order.quantity}x {order.articleType}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date de commande</p>
              <p className="font-medium">{order.createdAt}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Livraison estimée</p>
              <p className="font-medium">{order.estimatedDelivery}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total estimé</span>
              <span className="font-serif font-bold text-lg">{formatCFA(order.estimatedTotal)}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Adresse de livraison</p>
                <p className="font-medium">{order.address}</p>
              </div>
            </div>
          </div>

          {order.livreur && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Livreur assigné</p>
                  <p className="font-medium">{order.livreur.name}</p>
                  <a
                    href={`tel:${order.livreur.phone}`}
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                  >
                    <Phone className="h-3 w-3" />
                    {order.livreur.phone}
                  </a>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">Paiement en espèces à la livraison</p>
    </div>
  )
}
