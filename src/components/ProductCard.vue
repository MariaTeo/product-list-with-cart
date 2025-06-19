<script setup>
import { computed } from 'vue'
import { useCartStore } from '../store/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cart = useCartStore()

const quantityInCart = computed(() => {
  const item = cart.cartItems.find((item) => item.product.name === props.product.name)
  return item ? item.quantity : 0
})
</script>

<template>
  <div class="product-card">
    <div class="product-card__image-wrapper" :class="{ selected: quantityInCart > 0 }">
      <picture>
        <source :srcset="product.image.desktop" media="(min-width: 1440px)" />
        <source :srcset="product.image.tablet" media="(min-width: 768px)" />
        <img :src="product.image.mobile" :alt="product.name" />
      </picture>

      <div v-if="quantityInCart === 0" class="add-to-cart-btn-wrapper">
        <button class="add-to-cart-btn" @click="cart.addToCart(product)">
          <img src="/images/icon-add-to-cart.svg" :alt="product.name" aria-hidden="true" />
          <span>Add to Cart</span>
        </button>
      </div>
      <div v-else class="quantity-control">
        <button
          class="quantity-control__button"
          @click="cart.decrementQuantity(product.name)"
          aria-label="Decrement quantity"
        >
          <img src="/images/icon-decrement-quantity.svg" alt="" aria-hidden="true" />
        </button>
        <span class="quantity-control__count">{{ quantityInCart }}</span>
        <button
          class="quantity-control__button"
          @click="cart.incrementQuantity(product.name)"
          aria-label="Increment quantity"
        >
          <img src="/images/icon-increment-quantity.svg" alt="" aria-hidden="true" />
        </button>
      </div>
    </div>
    <p class="product-card__category">{{ product.category }}</p>
    <p class="product-card__name">{{ product.name }}</p>
    <p class="product-card__price">${{ product.price.toFixed(2) }}</p>
  </div>
</template>

<style scoped>
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.product-card__image-wrapper {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.25rem;
  border: 3px solid transparent;
  transition: border 0.5s ease-in-out;

  &&:hover {
    border: 1px solid var(--red);
  }
}

.product-card__image-wrapper.selected {
  border-color: var(--red);
}

.product-card__image-wrapper img {
  object-fit: cover;
}

.add-to-cart-btn-wrapper {
  position: absolute;
  bottom: 5.9rem;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 45px;

  @media screen and (min-width: 768px) {
    height: 40px;
  }

  border-width: 1px;
}

.product-card__image-wrapper:hover .add-to-cart-btn-wrapper,
.product-card__image-wrapper:focus-within .add-to-cart-btn-wrapper {
  opacity: 1;
}

.add-to-cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 45px;

  @media screen and (min-width: 768px) {
    height: 40px;
  }

  padding: 0.75rem 1rem;
  background-color: var(--rose-50);
  color: var(--rose-900);
  border-radius: 25px;
  border: 1px solid var(--red);
  font-weight: 600;
  font-size: 0.875rem;
}

.add-to-cart-btn:hover,
.add-to-cart-btn:focus {
  background-color: var(--red);
  color: white;
}

.add-to-cart-btn:hover img,
.add-to-cart-btn:focus img {
  filter: brightness(0) invert(1);
}

.quantity-control {
  position: absolute;
  bottom: 5.9rem;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--red);
  color: white;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.quantity-control__button {
  background: none;
  border: 1px solid white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.quantity-control__button:hover {
  background-color: white;
}

.quantity-control__button:hover img {
  filter: brightness(0) saturate(100%) invert(14%) sepia(87%) saturate(6011%) hue-rotate(357deg)
    brightness(89%) contrast(90%);
}

.product-card__category {
  margin-top: 20px;
  font-size: 0.875rem;
  color: var(--rose-400);
}

.product-card__name {
  font-weight: 600;
}

.product-card__price {
  font-weight: 600;
  color: var(--red);
}
</style>
