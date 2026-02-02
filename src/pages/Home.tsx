'use client';

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { collections } from '../data/products'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
            alt="Fashion hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30" />
        </motion.div>

        <div className="relative z-10 text-center text-primary-foreground px-6">
          <motion.p
            variants={itemVariants}
            className="text-sm tracking-[0.3em] uppercase mb-4"
          >
            New Season
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-light mb-6 text-balance"
          >
            Ramadan Elegance
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl max-w-xl mx-auto mb-8 text-primary-foreground/90"
          >
            Discover our curated collections of refined pieces designed for the modern woman.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/collection/classic"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-foreground font-medium tracking-wide hover:bg-primary-foreground/90 transition-colors group"
            >
              Explore Collections
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 md:py-28 px-6">
        <div className="container mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Browse By
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Collections</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {collections.map((collection, index) => (
              <CollectionCard key={collection.id} collection={collection} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Limited Edition
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                Artisan Crafted Pieces
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our limited edition collection features hand-crafted pieces using traditional
                techniques and the finest materials. Each piece is numbered and comes with a
                certificate of authenticity.
              </p>
              <Link
                to="/collection/limited-edition"
                className="inline-flex items-center gap-2 text-sm tracking-wide font-medium group"
              >
                View Collection
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-[4/5] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
                alt="Limited edition collection"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            {[
              {
                title: 'Sustainable Fashion',
                description: 'Ethically sourced materials and responsible manufacturing practices.',
              },
              {
                title: 'Timeless Design',
                description: 'Classic silhouettes that transcend seasonal trends.',
              },
              {
                title: 'Personal Service',
                description: 'Direct consultation via WhatsApp for a personalized experience.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

interface CollectionCardProps {
  collection: typeof collections[0]
  index: number
}

function CollectionCard({ collection, index }: CollectionCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
    >
      <Link
        to={`/collection/${collection.slug}`}
        className="group block relative aspect-[3/4] overflow-hidden bg-secondary"
      >
        <motion.img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
          <motion.div
            initial={{ y: 10, opacity: 0.8 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs tracking-[0.2em] uppercase mb-2 opacity-80">
              {collection.productCount} pieces
            </p>
            <h3 className="font-serif text-2xl md:text-3xl mb-2">{collection.name}</h3>
            <p className="text-sm opacity-0 group-hover:opacity-90 transition-opacity duration-300 line-clamp-2">
              {collection.description}
            </p>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}
