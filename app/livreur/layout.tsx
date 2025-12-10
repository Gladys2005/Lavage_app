"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { LivreurHeader } from "@/components/livreur/livreur-header"

export default function LivreurLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={["livreur"]}>
      <div className="min-h-screen bg-background">
        <LivreurHeader />
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  )
}
