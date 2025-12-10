// Mock data for the application - In production, this would come from a database

export type OrderStatus = "pending" | "picked_up" | "processing" | "ready" | "delivering" | "delivered" | "cancelled"

export interface Order {
  id: string
  code: string
  clientName: string
  phone: string
  address: string
  city: string
  quartier: string
  serviceType: string
  articleType: string
  quantity: number
  notes?: string
  status: OrderStatus
  livreurId?: string
  estimatedTotal: number
  createdAt: string
  updatedAt: string
}

export interface Livreur {
  id: string
  name: string
  email: string
  phone: string
  isActive: boolean
  ordersCompleted: number
}

export interface Tarif {
  id: string
  category: string
  item: string
  price: number
  isActive: boolean
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    code: "PP-ABC123",
    clientName: "Kofi Mensah",
    phone: "+228 90 12 34 56",
    address: "Boulevard du 13 Janvier",
    city: "Lomé",
    quartier: "Tokoin",
    serviceType: "Lavage & Repassage",
    articleType: "Chemises",
    quantity: 5,
    status: "pending",
    estimatedTotal: 7500,
    createdAt: "2025-12-02T10:30:00",
    updatedAt: "2025-12-02T10:30:00",
  },
  {
    id: "2",
    code: "PP-DEF456",
    clientName: "Ama Koffi",
    phone: "+228 91 23 45 67",
    address: "Rue des Palmiers",
    city: "Lomé",
    quartier: "Hédzranawoé",
    serviceType: "Nettoyage à sec",
    articleType: "Costumes",
    quantity: 2,
    notes: "Costume bleu urgent pour mariage",
    status: "picked_up",
    livreurId: "2",
    estimatedTotal: 18000,
    createdAt: "2025-12-02T09:15:00",
    updatedAt: "2025-12-02T11:00:00",
  },
  {
    id: "3",
    code: "PP-GHI789",
    clientName: "Yao Agbeko",
    phone: "+228 92 34 56 78",
    address: "Avenue de la Libération",
    city: "Lomé",
    quartier: "Nyékonakpoé",
    serviceType: "Service Express",
    articleType: "Robes",
    quantity: 3,
    status: "processing",
    livreurId: "2",
    estimatedTotal: 22500,
    createdAt: "2025-12-01T16:45:00",
    updatedAt: "2025-12-02T08:00:00",
  },
  {
    id: "4",
    code: "PP-JKL012",
    clientName: "Adjoa Lawson",
    phone: "+228 93 45 67 89",
    address: "Rue du Commerce",
    city: "Lomé",
    quartier: "Adidogomé",
    serviceType: "Lavage & Repassage",
    articleType: "Couettes",
    quantity: 2,
    status: "ready",
    livreurId: "2",
    estimatedTotal: 20000,
    createdAt: "2025-12-01T14:00:00",
    updatedAt: "2025-12-02T10:00:00",
  },
  {
    id: "5",
    code: "PP-MNO345",
    clientName: "Kossi Amevor",
    phone: "+228 94 56 78 90",
    address: "Boulevard Circulaire",
    city: "Lomé",
    quartier: "Bè",
    serviceType: "Repassage seul",
    articleType: "Chemises",
    quantity: 10,
    status: "delivering",
    livreurId: "2",
    estimatedTotal: 12500,
    createdAt: "2025-12-01T11:30:00",
    updatedAt: "2025-12-02T14:00:00",
  },
  {
    id: "6",
    code: "PP-PQR678",
    clientName: "Akouvi Dzifa",
    phone: "+228 95 67 89 01",
    address: "Avenue du Golfe",
    city: "Lomé",
    quartier: "Kodjoviakopé",
    serviceType: "Nettoyage à sec",
    articleType: "Manteaux",
    quantity: 1,
    status: "delivered",
    livreurId: "2",
    estimatedTotal: 8000,
    createdAt: "2025-11-30T09:00:00",
    updatedAt: "2025-12-01T16:30:00",
  },
]

export const MOCK_LIVREURS: Livreur[] = [
  {
    id: "2",
    name: "Kodjo A.",
    email: "livreur@pressingpro.tg",
    phone: "+228 90 98 76 54",
    isActive: true,
    ordersCompleted: 47,
  },
  {
    id: "3",
    name: "Afi K.",
    email: "afi@pressingpro.tg",
    phone: "+228 91 11 22 33",
    isActive: true,
    ordersCompleted: 32,
  },
  {
    id: "4",
    name: "Edem B.",
    email: "edem@pressingpro.tg",
    phone: "+228 92 55 66 77",
    isActive: false,
    ordersCompleted: 89,
  },
]

export const MOCK_TARIFS: Tarif[] = [
  { id: "1", category: "Haut", item: "Chemise", price: 1500, isActive: true },
  { id: "2", category: "Haut", item: "T-shirt", price: 1000, isActive: true },
  { id: "3", category: "Haut", item: "Pull", price: 2000, isActive: true },
  { id: "4", category: "Haut", item: "Veste", price: 4000, isActive: true },
  { id: "5", category: "Bas", item: "Pantalon", price: 2000, isActive: true },
  { id: "6", category: "Bas", item: "Jupe", price: 1800, isActive: true },
  { id: "7", category: "Bas", item: "Short", price: 1200, isActive: true },
  { id: "8", category: "Ensemble", item: "Costume (2 pièces)", price: 6000, isActive: true },
  { id: "9", category: "Ensemble", item: "Costume (3 pièces)", price: 8000, isActive: true },
  { id: "10", category: "Robe", item: "Robe simple", price: 3500, isActive: true },
  { id: "11", category: "Robe", item: "Robe de soirée", price: 7500, isActive: true },
  { id: "12", category: "Manteau", item: "Manteau court", price: 6000, isActive: true },
  { id: "13", category: "Manteau", item: "Manteau long", price: 8000, isActive: true },
  { id: "14", category: "Linge de maison", item: "Couette 1 place", price: 8000, isActive: true },
  { id: "15", category: "Linge de maison", item: "Couette 2 places", price: 10000, isActive: true },
  { id: "16", category: "Linge de maison", item: "Drap housse", price: 3000, isActive: true },
]

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "En attente",
  picked_up: "Récupéré",
  processing: "En traitement",
  ready: "Prêt",
  delivering: "En livraison",
  delivered: "Livré",
  cancelled: "Annulé",
}

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  picked_up: "bg-sky-100 text-sky-800",
  processing: "bg-violet-100 text-violet-800",
  ready: "bg-emerald-100 text-emerald-800",
  delivering: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export function formatCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
}
