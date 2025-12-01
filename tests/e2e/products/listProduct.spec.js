import { expect, test } from "../../support/fixtures/index.js";

test.describe("GET /Listar Produtos Cadastrados", () => {
  test(" Deve retornar lista de produtos com sucesso!!", async ({
    products,
  }) => {
    const response = await products.listProduct();

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("quantidade");
  });
});
