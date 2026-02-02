export interface Product {
  id: string
  name: string
  price: number
  description: string
  collection: string
  collectionSlug: string
  images: string[]
  sizes: string[]
  colors: ProductColor[]
  inStock: boolean
}

export interface ProductColor {
  name: string
  hex: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: ProductColor
}

export interface FilterState {
  priceRange: [number, number]
  sizes: string[]
  colors: string[]
  inStock: boolean
  searchQuery: string
}
