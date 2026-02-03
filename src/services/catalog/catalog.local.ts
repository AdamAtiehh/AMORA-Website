import { products, collections } from '../../data/products'
import type { Product, Category, Collection } from './types'

export async function getAllProducts(): Promise<Product[]> {
    return Promise.resolve(products)
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
    return Promise.resolve(products.filter(p => p.collectionSlug === slug))
}

export async function getCategories(): Promise<Category[]> {
    return Promise.resolve(
        collections.map(c => ({
            name: c.name,
            slug: c.slug,
        }))
    )
}

export async function getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    return Promise.resolve(collections.find(c => c.slug === slug))
}

export async function getCollections(): Promise<Collection[]> {
    return Promise.resolve(collections)
}
