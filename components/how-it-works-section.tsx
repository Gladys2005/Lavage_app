const steps = [
  {
    number: "01",
    title: "Commandez en ligne",
    description: "Remplissez le formulaire avec vos besoins et votre adresse à Lomé.",
  },
  {
    number: "02",
    title: "Nous récupérons",
    description: "Notre livreur vient chercher vos vêtements à l'heure convenue.",
  },
  {
    number: "03",
    title: "Traitement expert",
    description: "Vos articles sont traités avec le plus grand soin par nos professionnels.",
  },
  {
    number: "04",
    title: "Livraison & Paiement",
    description: "Vos vêtements propres sont livrés. Payez en espèces à la livraison.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-medium">Comment ça marche</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium">Un processus simple</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center lg:text-left">
              <div className="font-serif text-7xl text-primary/20 mb-4 font-medium">{step.number}</div>
              <h3 className="font-serif text-xl mb-3 font-medium">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
