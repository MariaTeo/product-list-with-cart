<script setup>
import { onMounted } from 'vue'
import ProductCard from './components/ProductCard.vue'
import Cart from './components/CartItems.vue'
import OrderModal from './components/OrderModal.vue'
import { useCartStore } from './store/cart'
import { useProductsStore } from './store/products'

const cart = useCartStore()
const productsStore = useProductsStore()

onMounted(() => {
  if (!productsStore.isProductsLoaded) {
    productsStore.fetchProducts()
  }
})
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <h1 class="page-title">Desserts</h1>
      <div class="product-grid">
        <ProductCard
          v-for="product in productsStore.getProducts"
          :key="product.name"
          :product="product"
        />
      </div>
    </main>

    <aside class="sidebar">
      <Cart @confirm-order="cart.confirmOrder()" />
    </aside>

    <OrderModal
      :is-visible="cart.isOrderModalVisible"
      @close="cart.isOrderModalVisible = false"
      @start-new-order="cart.resetCart()"
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
    padding: 4rem 5rem;
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
  font-size: 2rem;
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
