import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <img src="/luxury-laundry-service-elegant-white-shirts-hangin.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-6 font-medium">
            Service Premium de Pressing
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-balance font-medium">
            L'excellence au service de votre élégance
          </h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Confiez-nous vos vêtements les plus précieux. Ramassage et livraison à domicile partout à Lomé. Paiement à
            la livraison.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-sm uppercase tracking-wider px-8 py-6">
              <Link href="/commander">
                Passer commande
                <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-sm uppercase tracking-wider px-8 py-6 bg-transparent border-foreground/20 hover:bg-foreground/5"
            >
              <Link href="/suivi">Suivre ma commande</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
