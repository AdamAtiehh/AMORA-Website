import type { Product, Collection } from '../types'

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Classic',
    slug: 'classic',
    description: 'Timeless pieces that transcend seasons. Elegant silhouettes crafted for the modern woman.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    productCount: 6,
  },
  {
    id: '2',
    name: 'Modern',
    slug: 'modern',
    description: 'Contemporary designs with clean lines and bold statements for the fashion-forward.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    productCount: 5,
  },
  {
    id: '3',
    name: 'Elegant',
    slug: 'elegant',
    description: 'Sophisticated evening wear and refined pieces for special occasions.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    productCount: 4,
  },
  {
    id: '4',
    name: 'Street',
    slug: 'street',
    description: 'Urban-inspired fashion blending comfort with contemporary edge.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    productCount: 5,
  },
  {
    id: '5',
    name: 'Limited Edition',
    slug: 'limited-edition',
    description: 'Exclusive capsule collections featuring rare designs and premium materials.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    productCount: 3,
  },
]

const colors = {
  black: { name: 'Black', hex: '#1a1a1a' },
  white: { name: 'White', hex: '#fafafa' },
  cream: { name: 'Cream', hex: '#f5f5dc' },
  navy: { name: 'Navy', hex: '#1e3a5f' },
  burgundy: { name: 'Burgundy', hex: '#722f37' },
  sage: { name: 'Sage', hex: '#9caf88' },
  camel: { name: 'Camel', hex: '#c19a6b' },
  blush: { name: 'Blush', hex: '#de98ab' },
}

export const products: Product[] = [
  // Classic Collection
  {
    id: 'c1',
    name: 'Tailored Wool Blazer',
    price: 485,
    description: 'A perfectly tailored blazer crafted from Italian wool with subtle peak lapels.',
    collection: 'Classic',
    collectionSlug: 'classic',
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [colors.black, colors.navy, colors.camel],
    inStock: true,
  },
  {
    id: 'c2',
    name: 'Silk Wrap Blouse',
    price: 265,
    description: 'Luxurious silk blouse with an elegant wrap design and flowing sleeves.',
    collection: 'Classic',
    collectionSlug: 'classic',
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&q=80',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [colors.cream, colors.white, colors.blush],
    inStock: true,
  },
  {
    id: 'c3',
    name: 'High-Waist Trousers',
    price: 295,
    description: 'Classic high-waisted trousers with a tailored fit and pressed creases.',
    collection: 'Classic',
    collectionSlug: 'classic',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [colors.black, colors.navy, colors.cream],
    inStock: true,
  },
  {
    id: 'c4',
    name: 'Cashmere Cardigan',
    price: 425,
    description: 'Pure cashmere cardigan with mother-of-pearl buttons and ribbed trim.',
    collection: 'Classic',
    collectionSlug: 'classic',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=600&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [colors.cream, colors.camel, colors.sage],
    inStock: true,
  },
  {
    id: 'c5',
    name: 'Pleated Midi Skirt',
    price: 245,
    description: 'Flowing pleated skirt in luxurious satin with a high waistband.',
    collection: 'Classic',
    collectionSlug: 'classic',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=600&q=80',
      'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [colors.black, colors.cream, colors.burgundy],
    inStock: false,
  },
  {
    id: 'c6',
    name: 'Structured Pencil Dress',
    price: 365,
    description: 'A sophisticated pencil dress with architectural seaming and back slit.',
    collection: 'Classic',
    collectionSlug: 'classic',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [colors.black, colors.navy],
    inStock: true,
  },
  // Modern Collection
  {
    id: 'm1',
    name: 'Oversized Linen Shirt',
    price: 185,
    description: 'Relaxed oversized shirt in premium European linen with dropped shoulders.',
    collection: 'Modern',
    collectionSlug: 'modern',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [colors.white, colors.cream, colors.sage],
    inStock: true,
  },
  {
    id: 'm2',
    name: 'Wide-Leg Culottes',
    price: 225,
    description: 'Modern culottes with dramatic wide legs and an elasticated waist.',
    collection: 'Modern',
    collectionSlug: 'modern',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
      'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [colors.black, colors.navy, colors.camel],
    inStock: true,
  },
  {
    id: 'm3',
    name: 'Asymmetric Tunic',
    price: 275,
    description: 'Statement tunic with asymmetric hemline and architectural draping.',
    collection: 'Modern',
    collectionSlug: 'modern',
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [colors.white, colors.black],
    inStock: true,
  },
  {
    id: 'm4',
    name: 'Deconstructed Coat',
    price: 695,
    description: 'Avant-garde coat with raw edges and innovative layered construction.',
    collection: 'Modern',
    collectionSlug: 'modern',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [colors.black, colors.camel],
    inStock: true,
  },
  {
    id: 'm5',
    name: 'Sculptural Knit Top',
    price: 195,
    description: 'Knitted top with sculptural sleeves and ribbed body.',
    collection: 'Modern',
    collectionSlug: 'modern',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [colors.cream, colors.sage, colors.blush],
    inStock: false,
  },
  // Elegant Collection
  {
    id: 'e1',
    name: 'Floor-Length Gown',
    price: 1250,
    description: 'Breathtaking floor-length gown in flowing silk georgette with subtle train.',
    collection: 'Elegant',
    collectionSlug: 'elegant',
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [colors.black, colors.burgundy, colors.navy],
    inStock: true,
  },
  {
    id: 'e2',
    name: 'Beaded Cocktail Dress',
    price: 785,
    description: 'Exquisite cocktail dress with hand-sewn beading and illusion neckline.',
    collection: 'Elegant',
    collectionSlug: 'elegant',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M'],
    colors: [colors.black, colors.blush],
    inStock: true,
  },
  {
    id: 'e3',
    name: 'Velvet Evening Jacket',
    price: 545,
    description: 'Sumptuous velvet jacket with satin lapels and jeweled buttons.',
    collection: 'Elegant',
    collectionSlug: 'elegant',
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [colors.burgundy, colors.navy, colors.black],
    inStock: true,
  },
  {
    id: 'e4',
    name: 'Satin Wrap Dress',
    price: 425,
    description: 'Elegant wrap dress in liquid satin with flutter sleeves.',
    collection: 'Elegant',
    collectionSlug: 'elegant',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [colors.cream, colors.blush, colors.burgundy],
    inStock: false,
  },
  // Street Collection
  {
    id: 's1',
    name: 'Cropped Bomber Jacket',
    price: 345,
    description: 'Urban-inspired cropped bomber in premium nylon with ribbed trim.',
    collection: 'Street',
    collectionSlug: 'street',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [colors.black, colors.sage, colors.navy],
    inStock: true,
  },
  {
    id: 's2',
    name: 'High-Rise Cargo Pants',
    price: 195,
    description: 'Relaxed cargo pants with utilitarian pockets and adjustable waist.',
    collection: 'Street',
    collectionSlug: 'street',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [colors.black, colors.camel, colors.sage],
    inStock: true,
  },
  {
    id: 's3',
    name: 'Oversized Hoodie',
    price: 165,
    description: 'Premium heavyweight hoodie with dropped shoulders and kangaroo pocket.',
    collection: 'Street',
    collectionSlug: 'street',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [colors.black, colors.cream, colors.sage],
    inStock: true,
  },
  {
    id: 's4',
    name: 'Utility Vest',
    price: 225,
    description: 'Functional utility vest with multiple pockets and adjustable fit.',
    collection: 'Street',
    collectionSlug: 'street',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [colors.black, colors.camel],
    inStock: true,
  },
  {
    id: 's5',
    name: 'Relaxed Joggers',
    price: 145,
    description: 'Elevated joggers in soft French terry with tapered legs.',
    collection: 'Street',
    collectionSlug: 'street',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [colors.black, colors.cream, colors.sage],
    inStock: false,
  },
  // Limited Edition
  {
    id: 'l1',
    name: 'Embroidered Kimono',
    price: 895,
    description: 'Hand-embroidered kimono robe with silk lining and intricate floral motifs.',
    collection: 'Limited Edition',
    collectionSlug: 'limited-edition',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    ],
    sizes: ['One Size'],
    colors: [colors.cream, colors.black],
    inStock: true,
  },
  {
    id: 'l2',
    name: 'Crystal-Embellished Top',
    price: 545,
    description: 'Statement top adorned with hand-placed crystals and sheer panels.',
    collection: 'Limited Edition',
    collectionSlug: 'limited-edition',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M'],
    colors: [colors.black, colors.white],
    inStock: true,
  },
  {
    id: 'l3',
    name: 'Artisan Leather Coat',
    price: 1495,
    description: 'Hand-crafted leather coat with unique patina finish and brass hardware.',
    collection: 'Limited Edition',
    collectionSlug: 'limited-edition',
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [colors.camel, colors.black],
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
