import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    allProducts: [],
    productsLoaded: false,
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await fetch('/data.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        this.allProducts = await response.json()
        this.productsLoaded = true
      } catch (error) {
        console.error('Failed to load products into store:', error)
        this.productsLoaded = false
      }
    },
  },
  getters: {
    getProducts: (state) => state.allProducts,
    isProductsLoaded: (state) => state.productsLoaded,
  },
})
