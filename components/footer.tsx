import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                <span className="text-foreground font-serif font-bold text-lg">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold tracking-wide">PressingPro</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-background/60">Togo</span>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm">
              Service professionnel de blanchisserie et pressing avec ramassage et livraison à domicile à Lomé et au
              Togo.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 font-medium">Navigation</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-background/70 hover:text-background transition-colors">
                Accueil
              </Link>
              <Link href="/commander" className="text-sm text-background/70 hover:text-background transition-colors">
                Commander
              </Link>
              <Link href="/suivi" className="text-sm text-background/70 hover:text-background transition-colors">
                Suivi commande
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 font-medium">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-background/70">
              <p>contact@pressingpro.tg</p>
              <p>+228 90 00 00 00</p>
              <p>Lomé, Togo</p>
              <p>Lun-Sam: 7h-19h</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">&copy; 2025 PressingPro Togo. Tous droits réservés.</p>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-background/50 hover:text-background transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="text-sm text-background/50 hover:text-background transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
