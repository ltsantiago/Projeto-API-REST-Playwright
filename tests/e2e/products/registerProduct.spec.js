import { expect, test } from "@playwright/test";
import { authServiceUser } from "../../support/services/auth.js";
import { productService } from "../../support/services/products.js";
import { createProduct } from "../../support/factories/products.js";
import { createUser } from "../../support/factories/user.js";

test.describe("POST / Produtos", () => {
  let auth;
  let product;
  test.beforeEach(({ request }) => {
    auth = authServiceUser(request);
    product = productService(request);
  });

  test(" Deve cadastrar produto com sucesso", async () => {
    // Preparação dos dados
    const user = createUser();

    // Realiza o cadastro
    const respCreate = await auth.createRegisterUser(user);
    expect(respCreate.status()).toBe(201);

    // Realiza o login
    const response = await auth.login(user);
    // Asserções do login
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "message",
      "Login realizado com sucesso"
    );
    expect(responseBody).toHaveProperty("authorization");

    const productData = createProduct();

    // Realiza o cadastro do produto
    const respProduct = await product.registerProduct(
      productData,
      responseBody.authorization
    );
    expect(respProduct.status()).toBe(201);
  });
});
