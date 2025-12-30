import { expect, test } from "../../support/fixtures/index.js";
import { generateUUID16 } from "../../support/utils.js";

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

  test(" Deve retornar lista de produtos por ID", async ({
    products
  }) => {
     
    
    // Lista os produtos para obter o ID do produto criado
    const productId = await products.returnProductId();
    console.log("ID do produto a ser Listado:", productId);
    const response = await products.listProductById(productId);

    // Asserções
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("nome");
    expect(responseBody).toHaveProperty("preco");
    expect(responseBody).toHaveProperty("descricao");
    expect(responseBody).toHaveProperty("_id");
    expect(responseBody._id).toBe(productId);
  });

    test(" Não Deve retornar lista de produtos quando ID Inválido ou Inexistente", async ({
    products
  }) => {
     
    const invalidProductId = generateUUID16();
    console.log("ID do produto inválido a ser testado:", invalidProductId);
    const response = await products.listProductById(invalidProductId);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.message).toBe(
      "Produto não encontrado"
    );
  });
});
