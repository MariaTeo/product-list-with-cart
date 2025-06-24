
## Overview
<img width="617" alt="image" src="https://github.com/user-attachments/assets/2f8e5946-4015-4e92-a8b7-ddeea47d5e14" />


### The challenge

Users should be able to:

* Add items to the cart and remove them
* Increase/decrease the number of items in the cart
* See an order confirmation modal when they click "Confirm Order"
* Reset their selections when they click "Start New Order"
* View the optimal layout for the interface depending on their device's screen size
* See hover and focus states for most interactive elements on the page


### Links

* Solution URL: [Frontend Mentor Challenge submission](https://www.frontendmentor.io/solutions/responsive-product-list-with-cart-UvYA--yvLy)
* Live Site URL: [Netlify deployed app](https://productlistwithcartvue.netlify.app/)

## My process

### Built with

* ![Vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
* ![Pinia](https://img.shields.io/badge/Pinia-25AE88?style=for-the-badge&logo=pinia&logoColor=white)
* ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
* ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
* ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
* ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
* ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
* Semantic HTML5 markup
* CSS custom properties
* Flexbox
* CSS Grid
* Mobile-first workflow

### What I learned

* **Centralizing state with Pinia:** How using Pinia for both cart and product data simplified state management and made data accessible across components without prop drilling.
* **Asynchronous data fetching:** Implementing `fetch` within Pinia actions for cleaner data loading.
* **Component refactoring:** The process of converting prop-based component communication to direct store interaction.

```javascript
// Example: Product fetching in Pinia store
async fetchProducts() {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    this.allProducts = await response.json();
    this.productsLoaded = true;
  } catch (error) {
    console.error('Failed to load products into store:', error);
  }
}

```




This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
