import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, ProductColor } from '../types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, size: string, color: ProductColor) => void
  removeItem: (productId: string, size: string, colorName: string) => void
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  generateWhatsAppMessage: () => string
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, color) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor.name === color.name
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                  item.selectedSize === size &&
                  item.selectedColor.name === color.name
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }

          return {
            items: [
              ...state.items,
              { product, quantity: 1, selectedSize: size, selectedColor: color },
            ],
          }
        })
      },

      removeItem: (productId, size, colorName) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor.name === colorName
              )
          ),
        }))
      },

      updateQuantity: (productId, size, colorName, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, size, colorName)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor.name === colorName
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      generateWhatsAppMessage: () => {
        const items = get().items
        const total = get().getTotalPrice()

        let message = "Hello! I'd like to place an order:\n\n"

        items.forEach((item, index) => {
          message += `${index + 1}. ${item.product.name}\n`
          message += `   Collection: ${item.product.collection}\n`
          message += `   Size: ${item.selectedSize}\n`
          message += `   Color: ${item.selectedColor.name}\n`
          message += `   Quantity: ${item.quantity}\n`
          message += `   Price: $${(item.product.price * item.quantity).toFixed(2)}\n\n`
        })

        message += `---\nTotal: $${total.toFixed(2)}`

        return message
      },
    }),
    {
      name: 'AMORA-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
