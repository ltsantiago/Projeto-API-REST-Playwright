// ...existing code...
import { expect, test } from "../../support/fixtures/index.js";
import { createProduct } from "../../support/factories/products.js";

test.describe("PUT /Editar Produtos", () => {
  test(" Deve editar produto cadastrado com sucesso!!", async ({ products, productId, authToken }) => {
    const updatedProductData = createProduct();
    const putResponse = await products.putProduct(productId, updatedProductData, authToken);
    expect(putResponse.status()).toBe(200);
    const responseBody = await putResponse.json();
    expect(responseBody).toHaveProperty("message", "Registro alterado com sucesso");
  });

  test(" Não deve deixar editar o nome do produto com um nome já existente", async ({ products, productId, authToken }) => {
    const anotherProduct = createProduct();
    const respCreate2 = await products.registerProduct(anotherProduct, authToken);
    expect(respCreate2.status()).toBe(201);
    const body2 = await respCreate2.json();
    const existingName = body2.nome || anotherProduct.nome;

    const updatedProductData = createProduct();
    updatedProductData.nome = existingName;

    const putResponse = await products.putProduct(productId, updatedProductData, authToken);
    expect(putResponse.status()).toBe(400);
    const responseBody = await putResponse.json();
    expect(responseBody).toHaveProperty("message");
    expect(responseBody.message.toLowerCase()).toMatch(/já|exist|already/);
  });
  
});
