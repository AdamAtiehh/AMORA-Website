

import { X, Check, ChevronDown } from 'lucide-react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, formatPrice } from '../lib/utils'
import type { AvailableFilters, ActiveFilters } from '../services/catalog'

interface FilterPanelProps {
  availableFilters: AvailableFilters
  activeFilters: ActiveFilters
  onFilterChange: (filters: ActiveFilters) => void
  onClose: () => void
  productCount: number
}

export default function FilterPanel({
  availableFilters,
  activeFilters,
  onFilterChange,
  onClose,
  productCount,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = React.useState<string[]>(['price', 'size', 'color', 'availability'])
  // Ensure we have a valid price range to display, defaulting to available
  const currentPriceRange: [number, number] = [
    activeFilters.priceMin ?? availableFilters.price.min,
    activeFilters.priceMax ?? availableFilters.price.max,
  ]

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  }

  const updatePrice = (min: number, max: number) => {
    onFilterChange({
      ...activeFilters,
      priceMin: min,
      priceMax: max,
    })
  }

  const toggleSize = (size: string) => {
    const current = activeFilters.sizes || []
    const updated = current.includes(size)
      ? current.filter(s => s !== size)
      : [...current, size]
    onFilterChange({ ...activeFilters, sizes: updated })
  }

  const toggleColor = (hex: string) => {
    const current = activeFilters.colors || []
    const updated = current.includes(hex)
      ? current.filter(c => c !== hex)
      : [...current, hex]
    onFilterChange({ ...activeFilters, colors: updated })
  }

  const toggleStock = (checked: boolean) => {
    onFilterChange({ ...activeFilters, inStockOnly: checked })
  }

  const clearFilters = () => {
    onFilterChange({})
  }



  // Re-implementing simplified FilterSection inside file to avoid missing exports
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="font-serif text-2xl">Filters</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {productCount} products found
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary rounded-full transition-colors"
          aria-label="Close filters"
        >
          <X size={20} />
        </button>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Price Range */}
        <FilterSection
          title="Price Range"
          isExpanded={expandedSections.includes('price')}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-4 pt-2">
            <div className="flex justify-between text-sm">
              <span>{formatPrice(currentPriceRange[0])}</span>
              <span>{formatPrice(currentPriceRange[1])}</span>
            </div>
            {/* Simple range inputs for demonstration */}
            <div className="flex gap-4">
              <input
                type="number"
                min={availableFilters.price.min}
                max={availableFilters.price.max}
                value={currentPriceRange[0]}
                onChange={(e) => updatePrice(Number(e.target.value), currentPriceRange[1])}
                className="w-full p-2 border border-border rounded"
                placeholder="Min"
              />
              <input
                type="number"
                min={availableFilters.price.min}
                max={availableFilters.price.max}
                value={currentPriceRange[1]}
                onChange={(e) => updatePrice(currentPriceRange[0], Number(e.target.value))}
                className="w-full p-2 border border-border rounded"
                placeholder="Max"
              />
            </div>
          </div>
        </FilterSection>

        {/* Size */}
        <FilterSection
          title="Size"
          isExpanded={expandedSections.includes('size')}
          onToggle={() => toggleSection('size')}
        >
          <div className="grid grid-cols-3 gap-3 pt-2">
            {availableFilters.sizes.map(size => {
              const isActive = activeFilters.sizes?.includes(size)
              return (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={cn(
                    'px-3 py-2 text-sm border transition-all duration-200',
                    isActive
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-input hover:border-foreground/50'
                  )}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </FilterSection>

        {/* Color */}
        <FilterSection
          title="Color"
          isExpanded={expandedSections.includes('color')}
          onToggle={() => toggleSection('color')}
        >
          <div className="flex flex-wrap gap-3 pt-2">
            {availableFilters.colors.map(color => {
              const isActive = activeFilters.colors?.includes(color.value)
              return (
                <button
                  key={color.value}
                  onClick={() => toggleColor(color.value)}
                  className={cn(
                    'w-8 h-8 rounded-full border flex items-center justify-center transition-all',
                    isActive ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-110'
                  )}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                  aria-label={`Select ${color.label}`}
                >
                  {isActive && (
                    <Check
                      size={12}
                      className={cn(
                        color.value.toLowerCase() === '#ffffff' || color.value.toLowerCase() === '#fafafa'
                          ? 'text-black'
                          : 'text-white'
                      )}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection
          title="Availability"
          isExpanded={expandedSections.includes('availability')}
          onToggle={() => toggleSection('availability')}
        >
          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              id="in-stock"
              checked={!!activeFilters.inStockOnly}
              onChange={(e) => toggleStock(e.target.checked)}
              className="w-4 h-4 accent-foreground"
            />
            <label
              htmlFor="in-stock"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              In stock only
            </label>
          </div>
        </FilterSection>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border bg-background">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={clearFilters}
            className="px-4 py-3 text-sm font-medium border border-input opacity-70 hover:opacity-100 transition-opacity"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  )
}



interface FilterSectionProps {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b border-border pb-6 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full mb-4"
      >
        <span className="text-sm font-medium">{title}</span>
        <ChevronDown
          size={16}
          className={cn('transition-transform', isExpanded && 'rotate-180')}
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
