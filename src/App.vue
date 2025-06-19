<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from './components/ProductCard.vue'
import Cart from './components/CartItems.vue'
import OrderModal from './components/OrderModal.vue'
import { useCartStore } from './store/cart'

const products = ref([])
const cart = useCartStore()
const isOrderModalVisible = ref(false)

onMounted(async () => {
  try {
    const response = await fetch('/data.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    products.value = await response.json()
  } catch (error) {
    console.error('Failed to load products:', error)
  }
})

const showOrderConfirmation = () => {
  if (cart.cartItems.length > 0) {
    isOrderModalVisible.value = true
  }
}

const handleStartNewOrder = () => {
  isOrderModalVisible.value = false
  cart.resetCart()
}
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <h1 class="page-title">Desserts</h1>
      <div class="product-grid">
        <ProductCard
          v-for="product in products"
          :key="product.name"
          :product="product"
          :cart-items="cart.cartItems"
          @add-to-cart="cart.addToCart"
          @increment-quantity="cart.incrementQuantity"
          @decrement-quantity="cart.decrementQuantity"
        />
      </div>
    </main>

    <aside class="sidebar">
      <Cart
        :cart-items="cart.cartItems"
        :total-items="cart.totalCartItems"
        :total-price="cart.totalCartPrice"
        @remove-item="cart.removeItem"
        @confirm-order="showOrderConfirmation"
      />
    </aside>

    <OrderModal
      :is-visible="isOrderModalVisible"
      :cart-items="cart.cartItems"
      :order-total="cart.totalCartPrice"
      @close="isOrderModalVisible = false"
      @start-new-order="handleStartNewOrder"
    />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (min-width: 1440px) {
    padding: 3rem;
  }
}

.main-content {
  flex: 1;
  width: 100%;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
}

.page-title {
  font-size: 1.8rem;
  color: var(--rose-900);
  margin-bottom: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}

.sidebar {
  width: 100%;
  max-width: 400px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 350px;
  }

  @media (min-width: 1440px) {
    width: 380px;
  }
}
</style>
