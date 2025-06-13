export const DataTest = {
    value: 'data-test'
  };
  
  export const buttonWithText = (text: string): string => `button:has-text("${text}")`;

  export const Selectors = {
    loginPage: {
        username: `[${DataTest.value}="username"]`,
        password: `[${DataTest.value}="password"]`,
        loginButton: `[${DataTest.value}="login"]`
      },
    landingPage: {
      title: `[${DataTest.value}="title"]`,
      sortContainer: `[${DataTest.value}="product-sort-container"]`,
      inventoryItem: `[${DataTest.value}="inventory-item"]`,
      inventoryItemName: `[${DataTest.value}="inventory-item-name"]`,
      inventoryItemPrice: `[${DataTest.value}="inventory-item-price"]`,
      cartBadge: `[${DataTest.value}="shopping-cart-badge"]`,
      cartLink: `[${DataTest.value}="shopping-cart-link"]`,
      menu: `[${DataTest.value}="open-menu"]`,
      logout: `[${DataTest.value}="logout-sidebar-link"]`

    },
    productDetails: {
      title: `[${DataTest.value}="title"]`,
      backToProducts: `[${DataTest.value}="back-to-products"]`,
      cartBadge: `[${DataTest.value}="shopping-cart-badge"]`,
      inventoryItem: `[${DataTest.value}="inventory-item"]`,
    },
    cartPage: {
      inventoryItem: `[${DataTest.value}="inventory-item"]`,
      inventoryItemName: `[${DataTest.value}="inventory-item-name"]`,
      cartList: `[${DataTest.value}="cart-list"]`,
      checkoutButton: `[${DataTest.value}="checkout"]`,
      continueShoppingButton: `[${DataTest.value}="continue-shopping"]`,
      cartBadge: `[${DataTest.value}="shopping-cart-badge"]`
    },
    checkoutCompletePage: {
        backToProducts: `[${DataTest.value}="back-to-products"]`,
        title: `[${DataTest.value}="title"]`
    },
    checkoutOverviewPage: {
        finishButton: `[${DataTest.value}="finish"]`,
        title: `[${DataTest.value}="title"]`,
        cartList: `[${DataTest.value}="cart-list"]`,
        totalLabel: `[${DataTest.value}="total-label"]`
    },
    checkoutListPage: {
      firstName: `[${DataTest.value}="firstName"]`,
      lastName: `[${DataTest.value}="lastName"]`,
      postalCode: `[${DataTest.value}="postalCode"]`,
      continueButton: `[${DataTest.value}="continue"]`,
      title: `[${DataTest.value}="title"]`
    },
    
  };
  
  export const Texts = {
    login: 'Login',
    yourCart: 'Your Cart',
    addToCart: 'Add to cart',
    backToProducts: 'Back to products',
    remove: 'Remove',
    sortLabels: {
      nameAtoZ: 'Name (A to Z)',
      nameZtoA: 'Name (Z to A)',
      priceLowToHigh: 'Price (low to high)',
      priceHighToLow: 'Price (high to low)'
    },
    productsTitle: 'Products',
    checkoutCompleteTitle: 'Checkout: Complete!',
    checkoutOverviewTitle: 'Checkout: Overview',
    checkoutListTitle: 'Checkout: Your Information'
  };
  