import { expect, test } from "../../support/fixtures/index.js";
import { createUser } from "../../support/factories/user.js";
import { generateULID, generateUUID16 } from "../../support/utils.js";

test.describe("GET /Listar Usuários", () => {
  test(" Deve retornar lista de usuários com sucesso!!", async ({ users }) => {
    const response = await users.listUser();

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("usuarios");
    expect(Array.isArray(responseBody.usuarios)).toBeTruthy();
    expect(responseBody.usuarios.length).toBeGreaterThan(0);
    expect(responseBody.usuarios[0]).toHaveProperty("nome");
    expect(responseBody.usuarios[0]).toHaveProperty("email");
    expect(responseBody.usuarios[0]).toHaveProperty("_id");
  });

  test(" Deve retornar lista de usuários por ID!!", async ({ users, auth }) => {
    // Preparação dos dados
    const user = createUser();

    // Realiza o cadastro
    const respCreate = await auth.createRegisterUser(user);
    expect(respCreate.status()).toBe(201);

    // Lista os usuários para obter o ID do usuário criado
    const userId = await users.returnUserId();
    console.log("ID do usuário a ser Listado:", userId);
    const response = await users.listUserID(userId);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("nome");
    expect(responseBody).toHaveProperty("email");
    expect(responseBody).toHaveProperty("_id");
    expect(responseBody._id).toBe(userId);
  });

  test(" Não deve retornar lista de usuários quando ID for maior que 16 caracteres", async ({
    users,
    auth,
  }) => {
    // Preparação dos dados
    const user = createUser();

    // Realiza o cadastro
    const respCreate = await auth.createRegisterUser(user);
    expect(respCreate.status()).toBe(201);

    // Lista os usuários para obter o ID do usuário criado
    const userId = generateULID();
    console.log("ID gerado pela função:", userId);
    const response = await users.listUserID(userId);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(
      "id deve ter exatamente 16 caracteres alfanuméricos"
    );
  });

  test(" Não deve retornar lista de usuários quando ID inválido ou inexistente", async ({
    users,
    auth,
  }) => {
    // Preparação dos dados
    const user = createUser();

    // Realiza o cadastro
    const respCreate = await auth.createRegisterUser(user);
    expect(respCreate.status()).toBe(201);

    // Lista os usuários para obter o ID do usuário criado
    const userId = generateUUID16();
    console.log("ID gerado pela função:", userId);
    const response = await users.listUserID(userId);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.message).toBe("Usuário não encontrado");
  });
});
