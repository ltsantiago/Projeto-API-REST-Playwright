import { expect, test } from "../../support/fixtures/index.js";
import { createUser } from "../../support/factories/user.js";
import { generateULID } from "../../support/utils.js";

test.describe("DELETE / Excluir lista de usuários", () => {
  test(" Deve excluir usuário cadastrado com sucesso", async ({
    auth,
    users,
  }) => {
    // Preparação dos dados
    const user = createUser();

    // Realiza o cadastro
    const respCreate = await auth.createRegisterUser(user);
    expect(respCreate.status()).toBe(201);

    // Lista os usuários para obter o ID do usuário criado
    const userId = await users.returnUserId();
    console.log("ID do usuário a ser excluído:", userId);

    // Realiza a exclusão do usuário
    const respDelete = await users.deleteUserList(userId);
    expect(respDelete.status()).toBe(200);
    const responseBody = await respDelete.json();
    expect(responseBody.message).toBe("Registro excluído com sucesso");
  });

  test(" Não deve excluir usuário com id inexistente", async ({
    auth,
    users,
  }) => {
    // Preparação dos dados
    const user = createUser();

    // Realiza o cadastro
    const respCreate = await auth.createRegisterUser(user);
    expect(respCreate.status()).toBe(201);

    // Lista os usuários para obter o ID do usuário criado
    const userId = generateULID();
    console.log("ID gerado pela função:", userId);

    const respDelete = await users.deleteUserList(userId);
    expect(respDelete.status()).toBe(200);
    const responseBody = await respDelete.json();
    expect(responseBody.message).toBe("Nenhum registro excluído");
  });
});
