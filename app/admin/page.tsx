"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_ORDERS, MOCK_LIVREURS, STATUS_LABELS, STATUS_COLORS, formatCFA } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, Clock, TrendingUp, Users } from "lucide-react"

export default function AdminDashboardPage() {
  // Calculate stats
  const pendingOrders = MOCK_ORDERS.filter((o) => o.status === "pending").length
  const inProgressOrders = MOCK_ORDERS.filter((o) =>
    ["picked_up", "processing", "ready", "delivering"].includes(o.status),
  ).length
  const completedOrders = MOCK_ORDERS.filter((o) => o.status === "delivered").length
  const activeLivreurs = MOCK_LIVREURS.filter((l) => l.isActive).length

  const todayRevenue = MOCK_ORDERS.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.estimatedTotal, 0)

  const recentOrders = [...MOCK_ORDERS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-serif mb-2">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-3xl font-bold">{pendingOrders}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En cours</p>
                <p className="text-3xl font-bold">{inProgressOrders}</p>
              </div>
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-sky-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Livrées</p>
                <p className="text-3xl font-bold">{completedOrders}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Livreurs actifs</p>
                <p className="text-3xl font-bold">{activeLivreurs}</p>
              </div>
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-violet-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Card */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Chiffre d'affaires (commandes livrées)</p>
              <p className="text-4xl font-serif font-bold">{formatCFA(todayRevenue)}</p>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Commandes récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{order.code}</p>
                    <p className="text-sm text-muted-foreground">{order.clientName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="font-medium">{formatCFA(order.estimatedTotal)}</p>
                    <p className="text-sm text-muted-foreground">{order.serviceType}</p>
                  </div>
                  <Badge className={STATUS_COLORS[order.status]}>{STATUS_LABELS[order.status]}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
