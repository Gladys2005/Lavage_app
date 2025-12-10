import Link from "next/link"
import { Button } from "@/components/ui/button"

const pricingItems = [
  { item: "Chemise", price: "1 500 FCFA" },
  { item: "Pantalon", price: "2 000 FCFA" },
  { item: "Costume (2 pièces)", price: "6 000 FCFA" },
  { item: "Robe simple", price: "3 500 FCFA" },
  { item: "Couette (1 place)", price: "8 000 FCFA" },
]

export function PricingPreview() {
  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-background/60 mb-4 font-medium">Nos Tarifs</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-8 font-medium">Des prix transparents</h2>
            <p className="text-lg text-background/70 leading-relaxed mb-10 max-w-md">
              Nous croyons en la transparence. Découvrez nos tarifs compétitifs adaptés au marché togolais.
            </p>
            <Button asChild variant="secondary" size="lg" className="uppercase tracking-wider text-xs px-8">
              <Link href="/commander">Passer commande</Link>
            </Button>
          </div>

          <div className="bg-background/10 backdrop-blur-sm p-8 md:p-10 border border-background/20">
            <h3 className="font-serif text-xl mb-8 font-medium">Aperçu des tarifs</h3>
            <div className="space-y-5">
              {pricingItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pb-5 border-b border-background/20 last:border-0 last:pb-0"
                >
                  <span className="text-background/80">{item.item}</span>
                  <span className="font-serif text-lg font-medium">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-background/50 mt-8">
              * Livraison gratuite pour les commandes de plus de 15 000 FCFA
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
