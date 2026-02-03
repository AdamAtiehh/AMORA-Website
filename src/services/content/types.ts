export interface HeroContent {
    seasonLabel: string
    headline: string
    subheadline: string
    ctaText: string
    ctaHref: string
    image: {
        src: string
        alt: string
    }
}

export interface FeaturedBannerContent {
    eyebrow: string
    title: string
    body: string
    ctaText: string
    ctaHref: string
    image: {
        src: string
        alt: string
    }
}

export interface HomeContent {
    hero: HeroContent
    featuredBanner: FeaturedBannerContent
}
