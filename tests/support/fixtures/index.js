import { test as baseTest, expect } from "@playwright/test";

import { authServiceUser } from "../../support/services/auth.js";
import { userService } from "../../support/services/user.js";
import { productService } from "../../support/services/products.js";

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
  }
});

export { test, expect };
