import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])
  const isOrderModalVisible = ref(false)

  const totalCartItems = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const totalCartPrice = computed(() => {
    const total = cartItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    return total.toFixed(2)
  })

  function addToCart(product) {
    const existingItem = cartItems.value.find((i) => i.product.name === product.name)
    if (existingItem) existingItem.quantity++
    else cartItems.value.push({ product, quantity: 1 })
  }

  function removeItem(productName) {
    cartItems.value = cartItems.value.filter((item) => item.product.name !== productName)
  }

  function incrementQuantity(productName) {
    const item = cartItems.value.find((i) => i.product.name === productName)
    if (item) item.quantity++
  }

  function decrementQuantity(productName) {
    const item = cartItems.value.find((i) => i.product.name === productName)
    if (item) {
      if (item.quantity > 1) item.quantity--
      else removeItem(productName)
    }
  }

  function confirmOrder() {
    if (cartItems.value.length > 0) {
      isOrderModalVisible.value = true
    }
  }

  function resetCart() {
    isOrderModalVisible.value = false
    cartItems.value = []
  }

  return {
    cartItems,
    isOrderModalVisible,
    totalCartItems,
    totalCartPrice,
    addToCart,
    removeItem,
    incrementQuantity,
    decrementQuantity,
    confirmOrder,
    resetCart,
  }
})
