import { expect, test } from "../../support/fixtures/index.js";

test.describe("GET /Listar Produtos Cadastrados", () => {
  test(" Deve retornar lista de produtos com sucesso!!", async ({
    products,
  }) => {
    const response = await products.listProduct();

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("quantidade");
    expect(responseBody).toHaveProperty("produtos");
    expect(Array.isArray(responseBody.produtos)).toBeTruthy();
    expect(responseBody.produtos.length).toBeGreaterThan(0);
    expect(responseBody.produtos[0]).toHaveProperty("nome");
    expect(responseBody.produtos[0]).toHaveProperty("preco");
    expect(responseBody.produtos[0]).toHaveProperty("descricao");
    expect(responseBody.produtos[0]).toHaveProperty("_id");
  });
});
