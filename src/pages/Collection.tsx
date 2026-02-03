

import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowLeft } from 'lucide-react'
import {
  getProductsByCategorySlug,
  getCollectionBySlug,
  computeAvailableFilters,
  applyFilters,
  type Product,
  type AvailableFilters,
  type ActiveFilters
} from '../services/catalog'
import ProductCard from '../components/ProductCard'
import FilterPanel from '../components/FilterPanel'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export default function Collection() {
  const { slug } = useParams<{ slug: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [collectionInfo, setCollectionInfo] = useState<{ id: string, name: string, description: string, image: string } | null>(null)

  // Filter state
  const [availableFilters, setAvailableFilters] = useState<AvailableFilters>({
    price: { min: 0, max: 1000 },
    sizes: [],
    colors: [],
    hasStock: false
  })

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({})
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch initial data
  useEffect(() => {
    if (!slug) return

    // Reset filters and search on slug change
    setActiveFilters({})
    setSearchQuery('')

    const loadData = async () => {
      try {
        // Load collection info and products in parallel
        const [collection, loadedProducts] = await Promise.all([
          getCollectionBySlug(slug),
          getProductsByCategorySlug(slug)
        ])

        if (collection) {
          setCollectionInfo(collection)
        } else {
          setCollectionInfo(null)
        }

        setProducts(loadedProducts)
        setAvailableFilters(computeAvailableFilters(loadedProducts))
      } catch (error) {
        console.error('Failed to load collection data:', error)
        setCollectionInfo(null)
        setProducts([])
      }
    }

    loadData()
  }, [slug])

  // Derive filtered products
  const filteredProducts = useMemo(() => {
    let result = applyFilters(products, activeFilters)

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(lowerQuery))
    }

    return result
  }, [products, activeFilters, searchQuery])

  if (!collectionInfo) {
    if (slug && products.length === 0 && !collectionInfo) {
      // Simple loading state if we have a slug but no data yet
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-2">
            <div className="h-8 w-48 bg-secondary rounded"></div>
            <div className="h-4 w-32 bg-secondary rounded"></div>
          </div>
        </div>
      )
    }

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-h-[60vh] flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Collection not found</h1>
          <Link to="/" className="text-accent hover:underline">
            Return to home
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <img
            src={collectionInfo.image || "/placeholder.svg"}
            alt={collectionInfo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </motion.div>

        <div className="relative z-10 text-center text-primary-foreground px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm tracking-[0.3em] uppercase mb-3"
          >
            Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-4"
          >
            {collectionInfo.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto text-primary-foreground/90"
          >
            {collectionInfo.description}
          </motion.p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Collections
        </Link>
      </div>

      {/* Content */}
      <section className="container mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <FilterPanel
              availableFilters={availableFilters}
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
              onClose={() => { }}
              productCount={filteredProducts.length}
            />
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <p className="hidden lg:block text-sm text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 && 's'}
              </p>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-lg font-serif mb-2">No products found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search query.
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
