import type { Product, Collection } from '../types'
import blackAbaya from '../assets/abayas/black_abaya.webp'
import maroonAbaya from '../assets/abayas/maroon_abaya.webp'
import pinkAbaya from '../assets/abayas/pink_abaya.webp'
import whiteAbaya from '../assets/abayas/white_abaya.webp'
import whiteAbaya2 from '../assets/abayas/white_abaya_2.webp'

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Abayas',
    slug: 'abayas',
    description: 'Elegant and modest abayas crafted for the modern woman.',
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
    productCount: 4,
  },
]

const colors = {
  black: { name: 'Black', hex: '#1a1a1a' },
  white: { name: 'White', hex: '#fafafa' },
  maroon: { name: 'Maroon', hex: '#800000' },
  pink: { name: 'Pink', hex: '#FFC0CB' },
}

export const products: Product[] = [
  {
    id: 'a1',
    name: 'Black Abaya',
    price: 485,
    description: 'A timeless black abaya featuring elegant draping and premium fabric.',
    collection: 'Abayas',
    collectionSlug: 'abayas',
    images: [blackAbaya],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [colors.black],
    inStock: true,
  },
  {
    id: 'a2',
    name: 'Pink Abaya',
    price: 525,
    description: 'Soft pink abaya with delicate details, perfect for special occasions.',
    collection: 'Abayas',
    collectionSlug: 'abayas',
    images: [pinkAbaya],
    sizes: ['S', 'M', 'L'],
    colors: [colors.pink],
    inStock: true,
  },
  {
    id: 'a3',
    name: 'Maroon Abaya',
    price: 495,
    description: 'Deep maroon abaya adding a touch of bold elegance to your wardrobe.',
    collection: 'Abayas',
    collectionSlug: 'abayas',
    images: [maroonAbaya],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [colors.maroon],
    inStock: true,
  },
  {
    id: 'a4',
    name: 'White Abaya',
    price: 545,
    description: 'Pristine white abaya, a limited edition piece radiating purity and grace.',
    collection: 'Abayas',
    collectionSlug: 'abayas',
    images: [whiteAbaya, whiteAbaya2],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [colors.white],
    inStock: true,
  },
]

export function getProductsByCollection(slug: string): Product[] {
  return products.filter(p => p.collectionSlug === slug)
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug)
}

export function getAllSizes(): string[] {
  const sizes = new Set<string>()
  products.forEach(p => p.sizes.forEach(s => sizes.add(s)))
  return Array.from(sizes)
}

export function getAllColors(): { name: string; hex: string }[] {
  const colorMap = new Map<string, { name: string; hex: string }>()
  products.forEach(p => p.colors.forEach(c => colorMap.set(c.name, c)))
  return Array.from(colorMap.values())
}

export function getPriceRange(): [number, number] {
  const prices = products.map(p => p.price)
  return [Math.min(...prices), Math.max(...prices)]
}
