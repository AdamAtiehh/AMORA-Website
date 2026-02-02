import { ReactNode } from 'react'
import Header from './Header'
import Cart from './Cart'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl tracking-wide mb-2">LUXE</h3>
              <p className="text-sm text-muted-foreground">
                Timeless elegance for the modern woman
              </p>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">About</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              <a href="#" className="hover:text-foreground transition-colors">Shipping</a>
              <a href="#" className="hover:text-foreground transition-colors">Returns</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} LUXE. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Cart />
    </div>
  )
}
