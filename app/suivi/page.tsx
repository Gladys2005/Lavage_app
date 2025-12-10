"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderTracker } from "@/components/order-tracker"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

function SuiviContent() {
  const searchParams = useSearchParams()
  const [orderCode, setOrderCode] = useState("")
  const [searchedCode, setSearchedCode] = useState<string | null>(null)

  useEffect(() => {
    const codeFromUrl = searchParams.get("code")
    if (codeFromUrl) {
      setOrderCode(codeFromUrl)
      setSearchedCode(codeFromUrl)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderCode.trim()) {
      setSearchedCode(orderCode.trim().toUpperCase())
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-4">Suivi de commande</h1>
        <p className="text-muted-foreground">Entrez votre code de commande pour suivre son avancement en temps réel.</p>
      </div>

      <form onSubmit={handleSearch} className="mb-12">
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="orderCode" className="sr-only">
              Code de commande
            </Label>
            <Input
              id="orderCode"
              value={orderCode}
              onChange={(e) => setOrderCode(e.target.value)}
              placeholder="Ex: PP-M1X2Y3Z4"
              className="h-12 text-lg font-mono"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-6">
            <Search className="h-5 w-5 mr-2" />
            Rechercher
          </Button>
        </div>
      </form>

      {searchedCode && <OrderTracker orderCode={searchedCode} />}
    </div>
  )
}

export default function SuiviPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <Suspense
          fallback={
            <div className="max-w-2xl mx-auto px-4 text-center">
              <p className="text-muted-foreground">Chargement...</p>
            </div>
          }
        >
          <SuiviContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
