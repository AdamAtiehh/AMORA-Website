'use client';

import React from "react"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { cn, formatPrice } from '../lib/utils'
import type { FilterState } from '../types'
import { getAllSizes, getAllColors, getPriceRange } from '../data/products'

interface FilterPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  productCount: number
}

export default function FilterPanel({ filters, onFiltersChange, productCount }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(['price', 'size', 'color'])

  const allSizes = getAllSizes()
  const allColors = getAllColors()
  const [minPrice, maxPrice] = getPriceRange()

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  }

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size]
    updateFilter('sizes', newSizes)
  }

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color]
    updateFilter('colors', newColors)
  }

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [minPrice, maxPrice],
      sizes: [],
      colors: [],
      inStock: false,
      searchQuery: '',
    })
  }

  const hasActiveFilters =
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.inStock ||
    filters.priceRange[0] > minPrice ||
    filters.priceRange[1] < maxPrice

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{productCount} products</p>
        <motion.button
          onClick={() => setIsOpen(true)}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 border border-border text-sm hover:bg-secondary transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
              {filters.sizes.length + filters.colors.length + (filters.inStock ? 1 : 0)}
            </span>
          )}
        </motion.button>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-full max-w-sm bg-background shadow-2xl z-50 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-serif text-xl tracking-wide">Filters</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 -mr-2">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <FilterContent
                  filters={filters}
                  allSizes={allSizes}
                  allColors={allColors}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  toggleSize={toggleSize}
                  toggleColor={toggleColor}
                  updateFilter={updateFilter}
                />
              </div>
              <div className="p-6 border-t border-border space-y-3">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-3 border border-border text-sm hover:bg-secondary transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-primary text-primary-foreground text-sm font-medium"
                >
                  Show {productCount} Products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <FilterContent
            filters={filters}
            allSizes={allSizes}
            allColors={allColors}
            minPrice={minPrice}
            maxPrice={maxPrice}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            toggleSize={toggleSize}
            toggleColor={toggleColor}
            updateFilter={updateFilter}
          />
        </div>
      </div>
    </>
  )
}

interface FilterContentProps {
  filters: FilterState
  allSizes: string[]
  allColors: { name: string; hex: string }[]
  minPrice: number
  maxPrice: number
  expandedSections: string[]
  toggleSection: (section: string) => void
  toggleSize: (size: string) => void
  toggleColor: (color: string) => void
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
}

function FilterContent({
  filters,
  allSizes,
  allColors,
  minPrice,
  maxPrice,
  expandedSections,
  toggleSection,
  toggleSize,
  toggleColor,
  updateFilter,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      {/* Price Range */}
      <FilterSection
        title="Price"
        isExpanded={expandedSections.includes('price')}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
          <div className="relative pt-2">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={filters.priceRange[0]}
              onChange={(e) =>
                updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])
              }
              className="absolute w-full h-1 appearance-none bg-border rounded cursor-pointer accent-accent"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={filters.priceRange[1]}
              onChange={(e) =>
                updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])
              }
              className="absolute w-full h-1 appearance-none bg-transparent rounded cursor-pointer accent-accent"
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
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={cn(
                'px-3 py-1.5 text-sm border transition-colors',
                filters.sizes.includes(size)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-foreground'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection
        title="Color"
        isExpanded={expandedSections.includes('color')}
        onToggle={() => toggleSection('color')}
      >
        <div className="flex flex-wrap gap-3">
          {allColors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={cn(
                'w-7 h-7 rounded-full border-2 transition-transform hover:scale-110',
                filters.colors.includes(color.name)
                  ? 'border-accent ring-2 ring-accent ring-offset-2'
                  : 'border-border'
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection
        title="Availability"
        isExpanded={expandedSections.includes('availability')}
        onToggle={() => toggleSection('availability')}
      >
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => updateFilter('inStock', e.target.checked)}
            className="w-4 h-4 accent-accent"
          />
          <span className="text-sm">In stock only</span>
        </label>
      </FilterSection>
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
    <div className="border-b border-border pb-6">
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
