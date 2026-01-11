
import { expect, test } from "../../support/fixtures/index.js";
import { createUser } from "../../support/factories/user.js";
import { generateUUID16 } from "../../support/utils.js";

test.describe("PUT / Editar usuário", () => {
  let baseUser;
  let baseUserBody;

  test.beforeEach(async ({ auth }) => {
    // cria e registra um usuário base para cada teste (isolamento)
    baseUser = createUser();
    const resp = await auth.createRegisterUser(baseUser);
    expect(resp.status()).toBe(201);
    baseUserBody = await resp.json();
  });

  const registerUserAndReturnBody = async (auth, user) => {
    const resp = await auth.createRegisterUser(user);
    expect(resp.status()).toBe(201);
    return await resp.json();
  };

  test("Deve editar usuário cadastrado com sucesso", async ({ users }) => {
    const userId = baseUserBody._id;
    const updateData = createUser();

    const putResponse = await users.putUserList(userId, updateData);
    expect(putResponse.status()).toBe(200);

    const body = await putResponse.json();
    expect(body).toHaveProperty("message");
    expect(body.message.toLowerCase()).toMatch(/alterad|sucesso|atualiz/i);
  });

  test("Não deve editar usuário com email já cadastrado", async ({ auth, users }) => {
    // cria um segundo usuário para obter um email já existente
    const otherUser = createUser();
    const otherBody = await registerUserAndReturnBody(auth, otherUser);
    const existingEmail = otherBody.email || otherUser.email;

    const updateData = createUser();
    updateData.email = existingEmail; // força conflito de email

    const putResponse = await users.putUserList(baseUserBody._id, updateData);
    expect(putResponse.status()).toBe(400);

    const body = await putResponse.json();
    expect(body).toHaveProperty("message");
    expect(body.message.toLowerCase()).toMatch(/email.*(já|em uso|already|in use)/i);
  });

  test("Deve cadastrar usuário ao invés de editar quando id desconhecido ou usuário não encontrado", async ({ users }) => {
    const invalidUserId = generateUUID16();
    const updateData = createUser();

    const putResponse = await users.putUserList(invalidUserId, updateData);
    expect(putResponse.status()).toBe(201);

    const body = await putResponse.json();
    expect(body).toHaveProperty("message", "Cadastro realizado com sucesso");
  });
});