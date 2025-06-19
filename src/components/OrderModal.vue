<script setup>
import { useCartStore } from '../store/cart'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'startNewOrder'])

const cart = useCartStore()
</script>

<template>
  <div v-if="isVisible" class="order-modal-overlay" @click.self="emit('close')">
    <div class="order-modal">
      <img
        src="/images/icon-order-confirmed.svg"
        alt="Order confirmed icon"
        class="order-modal__icon"
      />
      <div class="order-modal__header">
        <h2 class="order-modal__title">Order Confirmed</h2>
        <p class="order-modal__subtitle">We hope you enjoy your food!</p>
      </div>

      <div class="order-modal__summary">
        <ul class="order-modal__items-list">
          <li v-for="item in cart.cartItems" :key="item.product.name" class="order-summary-item">
            <picture>
              <source :srcset="item.product.image.desktop" media="(min-width: 1440px)" />
              <source :srcset="item.product.image.tablet" media="(min-width: 768px)" />
              <img :src="item.product.image.mobile" :alt="item.product.name" />
            </picture>
            <div class="order-summary-item__details">
              <h5 class="order-summary-item__name">{{ item.product.name }}</h5>
              <div class="order-summary-item__price-info">
                <span class="order-summary-item__quantity">{{ item.quantity }}x</span>
                <span class="order-summary-item__at-price"
                  >@ ${{ item.product.price.toFixed(2) }}</span
                >
              </div>
            </div>
            <span class="order-summary-item__subtotal"
              >${{ (item.product.price * item.quantity).toFixed(2) }}</span
            >
          </li>
        </ul>
        <div class="order-modal__total">
          <span>Order Total</span>
          <span class="order-modal__total-price">${{ cart.totalCartPrice }}</span>
        </div>
      </div>

      <button class="order-modal__new-order-btn" @click="emit('startNewOrder')">
        Start New Order
      </button>
    </div>
  </div>
</template>

<style scoped>
.order-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.order-modal {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.order-modal__icon {
  width: 48px;
  margin-bottom: 1.5rem;
}
.order-modal__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.order-modal__title {
  font-size: 2.5rem;
  color: var(--rose-900);
  margin-bottom: 0.5rem;
}

.order-modal__subtitle {
  color: var(--rose-400);
  font-size: 1rem;
  margin-bottom: 2rem;
}

.order-modal__summary {
  background-color: var(--rose-50);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.order-modal__items-list {
  list-style: none;
  padding-bottom: 1rem;
}

.order-summary-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--rose-100);
  gap: 1rem;

  img {
    width: 45px;
    height: 45px;

    @media screen and (min-width: 768px) {
      width: 50px;
      height: 50px;
    }
    border-radius: 10%;
  }
}

.order-summary-item:last-child {
  margin-bottom: 0;
}

.order-summary-item__thumbnail {
  width: 48px;
  border-radius: 4px;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.order-summary-item__details {
  flex-grow: 1;
  text-align: left;
}

.order-summary-item__name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.order-summary-item__price-info {
  display: flex;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--red);
}

.order-summary-item__quantity {
  font-weight: 600;
  margin-right: 0.25rem;
}

.order-summary-item__at-price {
  color: var(--rose-400);
}

.order-summary-item__subtotal {
  font-weight: 600;
  flex-shrink: 0;
  margin-left: 1rem;
}

.order-modal__total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.order-modal__total-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--rose-900);
}

.order-modal__new-order-btn {
  width: 100%;
  padding: 1rem;
  background-color: var(--red);
  color: white;
  border-radius: 25px;
  font-weight: 600;
  transition: background-color 0.7s;
}

.order-modal__new-order-btn:hover,
.order-modal__new-order-btn:focus {
  background-color: var(--rose-900);
}
</style>
