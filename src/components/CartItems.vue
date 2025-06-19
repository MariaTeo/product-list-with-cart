<script setup>
import { useCartStore } from '../store/cart'

const emit = defineEmits(['confirmOrder'])

const cart = useCartStore()
</script>

<template>
  <div class="cart">
    <h2 class="cart__title">Your Cart ({{ cart.totalCartItems }})</h2>

    <div v-if="cart.cartItems.length === 0" class="cart__empty-state">
      <img
        src="/images/illustration-empty-cart.svg"
        alt="Empty cart illustration"
        class="cart__empty-image"
      />
      <p class="cart__empty-text">Your added items will appear here</p>
    </div>

    <div v-else>
      <ul class="cart__items-list">
        <li v-for="item in cart.cartItems" :key="item.product.name" class="cart-item">
          <div class="cart-item__details">
            <h4 class="cart-item__name">{{ item.product.name }}</h4>
            <div class="cart-item__price-info">
              <span class="cart-item__quantity">{{ item.quantity }}x</span>
              <span class="cart-item__at-price">@ ${{ item.product.price.toFixed(2) }}</span>
              <span class="cart-item__subtotal"
                >${{ (item.product.price * item.quantity).toFixed(2) }}</span
              >
            </div>
          </div>
          <button
            class="cart-item__remove-btn"
            @click="cart.removeItem(item.product.name)"
            aria-label="Remove item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="10"
              height="10"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </li>
      </ul>

      <div class="cart__order-total">
        <span>Order Total</span>
        <span class="cart__total-price">${{ cart.totalCartPrice }}</span>
      </div>

      <div class="cart__carbon-neutral">
        <img src="/images/icon-carbon-neutral.svg" alt="" aria-hidden="true" />
        <span>This is a <span class="cart__carbon">carbon-neutral </span>delivery</span>
      </div>

      <button class="cart__confirm-btn" @click="emit('confirmOrder')">Confirm Order</button>
    </div>
  </div>
</template>

<style scoped>
.cart {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cart__title {
  color: var(--red);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.cart__empty-state {
  text-align: center;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.cart__empty-image {
  max-width: 100px;
  height: auto;
}

.cart__empty-text {
  color: var(--rose-500);
  font-weight: 600;
}

.cart__items-list {
  list-style: none;
  margin-bottom: 1.5rem;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--rose-100);
}

.cart-item__details {
  flex-grow: 1;
}

.cart-item__name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.cart-item__price-info {
  display: flex;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--rose-500);
}

.cart-item__quantity {
  font-weight: 700;
  margin-right: 0.25rem;
}

.cart-item__at-price {
  color: var(--rose-400);
  margin-right: 0.5rem;
}

.cart-item__remove-btn {
  width: 12px;
  height: 12px;
  border: 1px solid var(--rose-300);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.2s;
}

.cart-item__remove-btn:hover,
.cart-item__remove-btn:focus {
  border-color: var(--rose-900);
}

.cart-item__remove-btn svg {
  stroke: var(--rose-300);
  transition: stroke 0.2s ease;
}

.cart-item__remove-btn:hover svg,
.cart-item__remove-btn:focus svg {
  stroke: var(--rose-900);
}

.cart__order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.cart__total-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--rose-900);
}

.cart__carbon-neutral {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--rose-50);
  color: var(--rose-900);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.75rem;
  margin-bottom: 1.5rem;
}

.cart__carbon-neutral img {
  width: 20px;
  height: 20px;
}
.cart__carbon {
  font-weight: 600;
}

.cart__confirm-btn {
  width: 100%;
  padding: 1rem;
  background-color: var(--red);
  color: white;
  border-radius: 25px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.cart__confirm-btn:hover,
.cart__confirm-btn:focus {
  background-color: var(--rose-100);
}
</style>
