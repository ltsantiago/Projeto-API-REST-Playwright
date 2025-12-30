import { expect, test } from "../../support/fixtures/index.js";
import { createProduct } from "../../support/factories/products.js";
import { createUser } from "../../support/factories/user.js";

test.describe("DELETE / Excluir produtos", () => {
  test(" Deve excluir produto cadastrado com sucesso", async ({
    auth,
    products,
  }) => {
    //preparação dos dados
    const user = createUser();
    const product = createProduct();

    //cadaastro do usuário
    const respCreate = await auth.createRegisterUser(user);
    expect(respCreate.status()).toBe(201);

    // Realiza o login
    const loginResponse = await auth.login(user);
    const token = await loginResponse.json();

    // Realiza o cadastro do produto
    const respProduct = await products.registerProduct(
      product,
      token.authorization
    );

    // Exclui o produto cadastrado
    const productBody = await respProduct.json();
    const productId = productBody._id;
    console.log("ID do produto a ser excluído:", productId);

    const respDelete = await products.deleteProduct(
      productId,
      token.authorization
    );
    expect(respDelete.status()).toBe(200);
    const responseBody = await respDelete.json();
    expect(responseBody.message).toBe("Registro excluído com sucesso");
  });
});
