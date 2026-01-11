import { test as baseTest, expect } from "@playwright/test";

import { authServiceUser } from "../../support/services/auth.js";
import { userService } from "../../support/services/user.js";
import { productService } from "../../support/services/products.js";
import { cartService } from "../../support/services/cart.js";
import { createUser } from "../factories/user.js";
import { createProduct } from "../factories/products.js";

const test = baseTest.extend({
  auth: async ({ request }, use) => {
    const auth = authServiceUser(request);
    await use(auth);
  },

  users: async ({ request }, use) => {
    const users = userService(request);
    await use(users);
  },

  products: async ({ request }, use) => {
    const products = productService(request);
    await use(products);
  },

  cart: async ({ request }, use) => {
    const cart = cartService(request);
    await use(cart);
  },

  authToken: async ({ auth }, use) => {
    const user = createUser();
    const respCreate = await auth.createRegisterUser(user);
    expect(respCreate.status()).toBe(201);
    const loginResponse = await auth.login(user);
    const token = await loginResponse.json();
    await use(token.authorization);
  },
  productId: async ({ products, authToken }, use) => {
    const product = createProduct();
    const respProduct = await products.registerProduct(product, authToken);
    expect(respProduct.status()).toBe(201);
    const productBody = await respProduct.json();
    await use(productBody._id);
  },
});

export { test, expect };
