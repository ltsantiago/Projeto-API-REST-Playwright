import { expect, test } from "../../support/fixtures/index.js";
import { createProduct } from "../../support/factories/products.js";

test.describe("POST / Produtos", () => {
  let productData;

  test.beforeEach(async () => {
    productData = createProduct();
  });

  test(" Deve cadastrar produto com sucesso", async ({
    products,
    authToken,
  }) => {
    const respProduct = await products.registerProduct(productData, authToken);
    expect(respProduct.status()).toBe(201);
    
    const productBody = await respProduct.json();
    expect(productBody).toHaveProperty(
      "message",
      "Cadastro realizado com sucesso"
    );
  });

  test(" Não deve cadastrar produto com nome já existente", async ({
    products,
    authToken,
  }) => {
    const respFirst = await products.registerProduct(productData, authToken);
    expect(respFirst.status()).toBe(201);

    
    const respSecond = await products.registerProduct(productData, authToken);
    expect(respSecond.status()).toBe(400);

    const bodySecond = await respSecond.json();
    expect(bodySecond).toHaveProperty("message");
    expect(bodySecond.message.toLowerCase()).toMatch(/já|exist|already/);
  });
});
