'use client';

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'
import type { Product } from '../types'
import { useCartStore } from '../store/cart'
import { formatPrice, cn } from '../lib/utils'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [imageIndex, setImageIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem, openCart } = useCartStore()

  const handleAddToCart = () => {
    if (!product.inStock) return
    addItem(product, selectedSize, selectedColor)
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
      openCart()
    }, 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      {/* Image */}
      <div
        className="relative aspect-[3/4] mb-4 overflow-hidden bg-secondary cursor-pointer"
        onMouseEnter={() => setImageIndex(1)}
        onMouseLeave={() => setImageIndex(0)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={imageIndex}
            src={product.images[imageIndex] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-sm tracking-wide text-muted-foreground">Out of Stock</span>
          </div>
        )}

        {/* Quick Add Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {/* Size Selection */}
          <div className="mb-3">
            <p className="text-xs text-primary-foreground/70 mb-2">Size</p>
            <div className="flex gap-1 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedSize(size)
                  }}
                  className={cn(
                    'px-2 py-1 text-xs border transition-colors',
                    selectedSize === size
                      ? 'bg-primary-foreground text-foreground border-primary-foreground'
                      : 'border-primary-foreground/50 text-primary-foreground hover:border-primary-foreground'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-3">
            <p className="text-xs text-primary-foreground/70 mb-2">Color</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedColor(color)
                  }}
                  className={cn(
                    'w-5 h-5 rounded-full border-2 transition-transform',
                    selectedColor.name === color.name
                      ? 'border-primary-foreground scale-110'
                      : 'border-transparent hover:scale-110'
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              handleAddToCart()
            }}
            disabled={!product.inStock || isAdded}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'w-full py-2 flex items-center justify-center gap-2 text-sm font-medium transition-colors',
              product.inStock
                ? 'bg-primary-foreground text-foreground hover:bg-primary-foreground/90'
                : 'bg-primary-foreground/50 text-foreground/50 cursor-not-allowed'
            )}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Check size={16} />
                  Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
                  Add to Bag
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3 className="font-medium text-sm group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
        <div className="flex gap-1 pt-1">
          {product.colors.map((color) => (
            <span
              key={color.name}
              className="w-3 h-3 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
