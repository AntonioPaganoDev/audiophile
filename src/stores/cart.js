import { defineStore } from 'pinia'

const STORAGE_KEY = 'cart'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    addItem(product, quantity = 1, slug) {
      const existing = this.items.find((i) => i.slug === slug)

      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({
          slug, // <-- chiave del catalogo
          product_id: product.id,
          name: product.name,
          price: product.price,
          short_name: product.short_name,
          quantity,
        })
      }
      this._persist()
    },

    removeItem(slug) {
      this.items = this.items.filter((i) => i.slug !== slug)
      this._persist()
    },

    updateQuantity(slug, quantity) {
      if (quantity <= 0) return this.removeItem(slug)
      const item = this.items.find((i) => i.slug === slug)
      if (item) item.quantity = quantity
      this._persist()
    },

    clearCart() {
      this.items = []
      localStorage.removeItem(STORAGE_KEY)
    },

    decreaseQuantity(slug) {
      const item = this.items.find((i) => i.slug === slug)
      if (item) {
        item.quantity--
        if (item.quantity <= 0) {
          this.removeItem(slug)
        } else {
          this._persist()
        }
      }
    },

    increaseQuantity(slug) {
      const item = this.items.find((i) => i.slug === slug)
      if (item) {
        item.quantity++
        this._persist()
      }
    },

    _persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },
  },
})
