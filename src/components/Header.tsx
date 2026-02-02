'use client';

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '../store/cart'
import { collections } from '../data/products'
import { cn } from '../lib/utils'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openCart, getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -ml-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <motion.h1
              className="font-serif text-2xl md:text-3xl tracking-[0.2em] font-light"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AMORA
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {collections.slice(0, 4).map((collection) => (
              <Link
                key={collection.slug}
                to={`/collection/${collection.slug}`}
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {collection.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Cart Button */}
          <motion.button
            onClick={openCart}
            className="relative p-2 -mr-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open cart"
          >
            <ShoppingBag size={20} className="transition-colors group-hover:text-accent" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className={cn(
            'md:hidden overflow-hidden',
            !mobileMenuOpen && 'pointer-events-none'
          )}
        >
          <div className="py-4 space-y-4 border-t border-border">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                to={`/collection/${collection.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-serif tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                {collection.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>
    </header>
  )
}
