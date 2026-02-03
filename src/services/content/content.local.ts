import { HomeContent } from './types'
import whiteAbaya from '@/assets/abayas/white_abaya.webp'

export const homeContent: HomeContent = {
    hero: {
        seasonLabel: 'New Season',
        headline: 'Ramadan Elegance',
        subheadline: 'Discover our curated collections of refined pieces designed for the modern woman.',
        ctaText: 'Explore Collections',
        ctaHref: '/collection/abayas',
        image: {
            src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
            alt: 'Fashion hero',
        },
    },
    featuredBanner: {
        eyebrow: 'Limited Edition',
        title: 'Artisan Crafted Pieces',
        body: 'Our limited edition collection features hand-crafted pieces using traditional techniques and the finest materials. Each piece is numbered and comes with a certificate of authenticity.',
        ctaText: 'View Collection',
        ctaHref: '/collection/abayas',
        image: {
            src: whiteAbaya,
            alt: 'Limited edition collection',
        },
    },
}
