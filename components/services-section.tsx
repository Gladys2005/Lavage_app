import { Shirt, Sparkles, Clock, Truck } from "lucide-react"

const services = [
  {
    icon: Shirt,
    title: "Lavage & Repassage",
    description: "Vos vêtements lavés avec soin et repassés à la perfection par nos experts.",
  },
  {
    icon: Sparkles,
    title: "Nettoyage à sec",
    description: "Traitement spécialisé pour vos pièces délicates, costumes et tenues de cérémonie.",
  },
  {
    icon: Clock,
    title: "Service Express",
    description: "Besoin urgent ? Récupérez vos vêtements en 24h avec notre service prioritaire.",
  },
  {
    icon: Truck,
    title: "Livraison à domicile",
    description: "Nous venons chercher et livrer vos vêtements partout à Lomé et environs.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-medium">Nos Services</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium">Une expertise à votre service</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-background border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3 font-medium">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
