"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-semibold tracking-wide">PressingPro</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Togo</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/commander"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Commander
            </Link>
            <Link
              href="/suivi"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Suivi
            </Link>
            <Link
              href="/login"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Espace Pro
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="uppercase tracking-wider text-xs px-6">
              <Link href="/commander">Commander</Link>
            </Button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="/commander"
                className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Commander
              </Link>
              <Link
                href="/suivi"
                className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Suivi
              </Link>
              <Link
                href="/login"
                className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Espace Pro
              </Link>
              <Button asChild className="w-full mt-4 uppercase tracking-wider text-xs">
                <Link href="/commander">Commander maintenant</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
