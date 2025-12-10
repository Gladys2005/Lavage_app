import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderForm } from "@/components/order-form"

export default function CommanderPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-medium">Commander</p>
            <h1 className="font-serif text-3xl md:text-4xl mb-4">Passer une commande</h1>
            <p className="text-muted-foreground">
              Remplissez le formulaire ci-dessous pour commander notre service de pressing premium.
            </p>
          </div>
          <OrderForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
