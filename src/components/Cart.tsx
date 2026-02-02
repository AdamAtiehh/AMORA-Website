'use client';

import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cart'
import { formatPrice } from '../lib/utils'

export default function Cart() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    generateWhatsAppMessage,
  } = useCartStore()

  const handleCheckout = () => {
    const message = generateWhatsAppMessage()
    const encodedMessage = encodeURIComponent(message)
    const phoneNumber = '96181985614'
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-xl tracking-wide">Your Bag</h2>
              <motion.button
                onClick={closeCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 -mr-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <ShoppingBag size={48} className="text-muted-foreground mb-4" />
                  <p className="text-lg font-serif mb-2">Your bag is empty</p>
                  <p className="text-sm text-muted-foreground">
                    Explore our collections and find something you love.
                  </p>
                </div>
              ) : (
                <motion.ul className="divide-y divide-border">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-6"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-24 bg-secondary rounded overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.images[0] || "/placeholder.svg"}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm mb-1 truncate">
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-2">
                              {item.selectedSize} / {item.selectedColor.name}
                            </p>
                            <p className="font-medium text-sm">
                              {formatPrice(item.product.price)}
                            </p>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <motion.button
                              onClick={() =>
                                removeItem(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor.name
                                )
                              }
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <X size={16} />
                            </motion.button>
                            <div className="flex items-center gap-2">
                              <motion.button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.selectedSize,
                                    item.selectedColor.name,
                                    item.quantity - 1
                                  )
                                }
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 border border-border rounded hover:bg-secondary transition-colors"
                              >
                                <Minus size={12} />
                              </motion.button>
                              <span className="w-6 text-center text-sm">
                                {item.quantity}
                              </span>
                              <motion.button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.selectedSize,
                                    item.selectedColor.name,
                                    item.quantity + 1
                                  )
                                }
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 border border-border rounded hover:bg-secondary transition-colors"
                              >
                                <Plus size={12} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-serif text-lg">{formatPrice(getTotalPrice())}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Shipping and taxes calculated at checkout via WhatsApp.
                </p>
                <motion.button
                  onClick={handleCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-primary text-primary-foreground font-medium tracking-wide hover:bg-primary/90 transition-colors"
                >
                  Checkout via WhatsApp
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
