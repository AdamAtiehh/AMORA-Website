import { useState, type TouchEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '../services/catalog'
import { useCartStore } from '../store/cart'
import { formatPrice, cn } from '../lib/utils'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  // Safe access to arrays
  const sizes = product.sizes || []
  const colors = product.colors || []
  const images = product.images || []
  const hasMultipleImages = images.length > 1

  // If your products are "single-color by nature", just use the first color internally.
  // This avoids any UI for color selection while keeping cart logic compatible.
  const fixedColor = colors[0] ?? null

  const [selectedSize, setSelectedSize] = useState(sizes[0] || '')
  const [imageIndex, setImageIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const { addItem, openCart } = useCartStore()

  const sizeRequired = sizes.length > 0
  const canAdd =
    product.inStock &&
    !isAdded &&
    (!sizeRequired || Boolean(selectedSize)) &&
    Boolean(fixedColor) // keep this if your cart truly requires a color object

  const handleAddToCart = () => {
    if (!canAdd) return
    addItem(product, selectedSize, fixedColor)
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
      openCart()
    }, 800)
  }

  const nextImage = () => {
    if (!hasMultipleImages) return
    setImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    if (!hasMultipleImages) return
    setImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const distance = touchStart - touchEnd
    const threshold = 50

    if (Math.abs(distance) > threshold) {
      distance > 0 ? nextImage() : prevImage()
    }
    setTouchStart(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      {/* Image Container */}
      <div
        className="relative aspect-[3/4] mb-4 overflow-hidden bg-secondary w-full"
        onMouseEnter={() => hasMultipleImages && setImageIndex(1 % images.length)}
        onMouseLeave={() => setImageIndex(0)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={imageIndex}
            src={images[imageIndex] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center z-10">
            <span className="text-sm tracking-wide text-muted-foreground font-medium">
              Out of Stock
            </span>
          </div>
        )}

        {/* Image Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-10 hover:bg-background"
              aria-label="Previous image"
              type="button"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-10 hover:bg-background"
              aria-label="Next image"
              type="button"
            >
              <ChevronRight size={16} />
            </button>

            {/* Mobile Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 lg:hidden z-10">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-colors',
                    idx === imageIndex ? 'bg-primary' : 'bg-primary/30'
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick Add Overlay */}
        {/* Mobile: keep button visible, but DON'T show size selection inside overlay */}
        {/* Desktop: show overlay on hover; include size selection inside overlay */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/95 via-background/80 to-transparent transition-opacity duration-300 z-20',
            'opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
          )}
        >
          {/* Desktop-only size selection (kept in overlay) */}
          {sizes.length > 0 && (
            <div className="mb-3 hidden sm:block">
              <p className="text-xs text-muted-foreground mb-2">Size</p>
              <div className="flex gap-1 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedSize(size)
                    }}
                    className={cn(
                      'px-2 py-1 text-xs border transition-colors',
                      selectedSize === size
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border text-muted-foreground hover:border-foreground'
                    )}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button (always accessible) */}
          <motion.button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleAddToCart()
            }}
            disabled={!canAdd}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'w-full py-2 flex items-center justify-center gap-2 text-sm font-medium transition-colors border',
              canAdd
                ? 'bg-foreground text-background hover:bg-foreground/90 border-foreground'
                : 'bg-muted text-muted-foreground cursor-not-allowed border-border'
            )}
            type="button"
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2"
                >
                  <Check size={16} />
                  Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
                  Add to Bag
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-medium text-sm group-hover:text-accent transition-colors truncate">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
          </div>

          {/* Mobile-only size selector next to name/price */}
          {sizes.length > 0 && (
            <div className="sm:hidden flex flex-wrap gap-1 justify-end">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedSize(size)
                  }}
                  className={cn(
                    'px-2 py-1 text-[11px] border transition-colors',
                    selectedSize === size
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border text-muted-foreground'
                  )}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
