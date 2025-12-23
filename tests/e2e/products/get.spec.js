import { expect, test } from "../../support/fixtures/index.js";
import { createProduct } from "../../support/factories/products.js";

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

  test(" Deve retornar lista de produtos por ID!!", async ({ products }) => {
    // Preparação dos dados
    const productData = createProduct();

    // Realiza o cadastro do produto
    const respProduct = await products.registerProduct(
      productData,
      responseBody.authorization
    );
    
    expect(respProduct.status()).toBe(201);

    // Lista os produtos para obter o ID do produto criado
    const productId = await products.returnProductId();
    console.log("ID do produto a ser Listado:", productId);
    const response = await products.listProductById(productId);

    // Asserções
    expect(response.status()).toBe(200);
    const productBody = await respProduct.json();
    expect(productBody).toHaveProperty("nome");
    expect(productBody).toHaveProperty("preco");
    expect(productBody).toHaveProperty("descricao");
    expect(productBody).toHaveProperty("_id");
    expect(productBody._id).toBe(productId);
  });
});
