import { expect, test } from "../../support/fixtures/index.js";
import { createUser, updatedUserData } from "../../support/factories/user.js";
import {generateUUID16} from "../../support/utils.js";

test.describe("PUT /Editar usuário", () => {
  test(" Deve editar usuário cadastrado com sucesso!!", async ({
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
    console.log("ID do usuário a ser editado:", userId);
    // Dados para atualização
    const updatePutUserData = updatedUserData();
    const putResponse = await users.putUserList(userId, updatePutUserData);
    expect(putResponse.status()).toBe(200);
  });

  test(" Não Deve editar usuário  com email já cadastrado", async ({
    auth,
    users,
  }) => {
    // Preparação dos dados: cria dois usuários distintos
    const user = createUser();
    const user2 = createUser();

    // Cadastra o primeiro usuário
    const respCreate1 = await auth.createRegisterUser(user);
    expect(respCreate1.status()).toBe(201);
    const body1 = await respCreate1.json(); // deve conter _id do usuário criado
    const userId1 = body1._id;

    // Cadastra o segundo usuário (email que será reutilizado)
    const respCreate2 = await auth.createRegisterUser(user2);
    expect(respCreate2.status()).toBe(201);
    const body2 = await respCreate2.json();
    const userEmailAlreadyUsed = body2.email || user2.email;

    console.log("ID do usuário 1:", userId1);
    console.log("Email já cadastrado (usuário 2):", userEmailAlreadyUsed);

    // Dados para atualização do primeiro usuário, usando o email do segundo
    const updatePutUserData = updatedUserData();
    updatePutUserData.email = userEmailAlreadyUsed; // força email duplicado

    const putResponse = await users.putUserList(userId1, updatePutUserData);
    expect(putResponse.status()).toBe(400);

    const responseBody = await putResponse.json();
    expect(responseBody).toHaveProperty(
      "message",
      "Este email já está sendo usado"
    );
  });

  test("Deve cadastrar usuário ao invés de editar quando id desconhecido ou usuário", async ({
    auth,
    users,
  }) => {
    
   // Preparação dos dados
    const user = createUser();

    // Realiza o cadastro
    const respCreate = await auth.createRegisterUser(user);
    expect(respCreate.status()).toBe(201);

    // Gera um ID inválido para teste
    const invalidUserId = generateUUID16();
    console.log("ID inválido para edição:", invalidUserId);
   
    // Dados para atualização
    const updatePutUserData = updatedUserData();

    const putResponse = await users.putUserList(invalidUserId,updatePutUserData);
    expect(putResponse.status()).toBe(201);
    const responseBody = await putResponse.json();
    expect(responseBody).toHaveProperty("message", "Cadastro realizado com sucesso");
  });
});
