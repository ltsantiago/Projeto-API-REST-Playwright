import { expect, test } from "../../support/fixtures/index.js";

test.describe("DELETE / Excluir produtos", () => {
  test(" Deve excluir produto cadastrado com sucesso", async ({ products, productId, authToken }) => {
    const respDelete = await products.deleteProduct(productId, authToken);
    expect(respDelete.status()).toBe(200);
    const responseBody = await respDelete.json();
    expect(responseBody.message).toBe("Registro excluído com sucesso");
  });

  test(" Não Deve excluir produto sem registro", async ({ products, authToken }) => {
    const idProduct = "qbMqntef4iTOwWfg"; // id inexistente
    const respDelete = await products.deleteProduct(idProduct, authToken);
    expect(respDelete.status()).toBe(200);
    const responseBody = await respDelete.json();
    expect(responseBody.message).toBe("Nenhum registro excluído");
  });

  test(" Não Deve excluir produto que faz parte do carrinho sem token de acesso", async ({
    products,  productId,
  }) => {
    const respDelete = await products.deleteProduct(productId, ""); // sem token
    expect(respDelete.status()).toBe(401);
    const responseBody = await respDelete.json();
    expect(responseBody.message).toBe(
      "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
    );
  });
});
