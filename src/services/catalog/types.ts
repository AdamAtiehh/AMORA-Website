import type { Product as BaseProduct, Collection as BaseCollection } from '../../types'

export type Product = BaseProduct
export type Collection = BaseCollection

export interface AvailableFilters {
    price: { min: number; max: number }
    sizes: string[]
    colors: { label: string; value: string }[]
    hasStock: boolean
}

export interface ActiveFilters {
    priceMin?: number
    priceMax?: number
    sizes?: string[]
    colors?: string[] // hex values
    inStockOnly?: boolean
}

export interface Category {
    name: string
    slug: string
}
