import type { Product, AvailableFilters, ActiveFilters } from './types'

export function computeAvailableFilters(products: Product[]): AvailableFilters {
    const prices = products.map(p => p.price)
    const minPrice = prices.length ? Math.min(...prices) : 0
    const maxPrice = prices.length ? Math.max(...prices) : 1000

    const sizeSet = new Set<string>()
    products.forEach(p => {
        const sizes = p.sizes ?? []
        sizes.forEach(s => sizeSet.add(s))
    })

    // Custom sort for standard sizes if present
    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'ONE SIZE']
    const sortedSizes = Array.from(sizeSet).sort((a, b) => {
        const idxA = sizeOrder.indexOf(a.toUpperCase())
        const idxB = sizeOrder.indexOf(b.toUpperCase())
        if (idxA !== -1 && idxB !== -1) return idxA - idxB
        return a.localeCompare(b)
    })

    const colorMap = new Map<string, { label: string; value: string }>()
    products.forEach(p => {
        const colors = p.colors ?? []
        colors.forEach(c => {
            // Use hex as value
            if (!colorMap.has(c.hex)) {
                colorMap.set(c.hex, { label: c.name, value: c.hex })
            }
        })
    })

    // Check if any product is in stock
    const hasStock = products.some(p => p.inStock)

    return {
        price: { min: minPrice, max: maxPrice },
        sizes: sortedSizes,
        colors: Array.from(colorMap.values()),
        hasStock,
    }
}

export function applyFilters(products: Product[], active: ActiveFilters): Product[] {
    return products.filter(product => {
        // Price filter
        if (active.priceMin !== undefined && product.price < active.priceMin) return false
        if (active.priceMax !== undefined && product.price > active.priceMax) return false

        // Size filter (match any)
        if (active.sizes && active.sizes.length > 0) {
            const hasSize = product.sizes.some(size => active.sizes!.includes(size))
            if (!hasSize) return false
        }

        // Color filter (match any)
        if (active.colors && active.colors.length > 0) {
            const hasColor = product.colors.some(color => active.colors!.includes(color.hex))
            if (!hasColor) return false
        }

        // Stock filter
        if (active.inStockOnly && !product.inStock) return false

        return true
    })
}
