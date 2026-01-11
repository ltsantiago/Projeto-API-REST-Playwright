import { expect, test } from "../../support/fixtures/index.js";
import { createUser } from "../../support/factories/user.js";

test.describe("POST/ Register", () => {
  let validUser;

  // prepara um usuário válido antes de cada teste
  test.beforeEach(() => {
    validUser = createUser();
  });

  test(" Deve realizar cadastro de um novo usuário com sucesso!!", async ({
    auth,
  }) => {
    

    const response = await auth.createRegisterUser(validUser);

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "message",
      "Cadastro realizado com sucesso"
    );
    expect(responseBody).toHaveProperty("_id");
  });

  test(" Não Deve realizar cadastro com email já em uso", async ({ auth }) => {
    

    const preCondition = await auth.createRegisterUser(validUser);

    expect(preCondition.status()).toBe(201);

    const response = await auth.createRegisterUser(validUser);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "message",
      "Este email já está sendo usado"
    );
  });

  test(" Não Deve realizar cadastro com email inválido", async ({ auth }) => {
    const invalidUser = { ...validUser, email: "messironaldo$.com" };

    const response = await auth.createRegisterUser(invalidUser);

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "email",
      "email deve ser um email válido"
    );
  });

  test(" Não Deve cadastrar quando o campo nome não é informado", async ({
    auth,
  }) => {
    const user = { ...validUser };
    delete user.nome; // remove diretamente (mutação)

    const response = await auth.createRegisterUser(user);

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("nome", "nome é obrigatório");
  });

  test(" Não Deve cadastrar quando o campo email não é informado", async ({
    auth,
  }) => {
    const user = { ...validUser };
    delete user.email; // remove diretamente (mutação)

    const response = await auth.createRegisterUser(user);

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("email", "email é obrigatório");
  });

  test(" Não Deve cadastrar quando o campo password não é informado", async ({
    auth,
  }) => {
    const user = { ...validUser };
    delete user.password; // remove diretamente (mutação)

    const response = await auth.createRegisterUser(user);

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("password", "password é obrigatório");
  });

  test(" Não Deve cadastrar quando o campo administrador não é informado", async ({
    auth,
  }) => {
    const user = { ...validUser };
    delete user.administrador; // remove diretamente (mutação)

    const response = await auth.createRegisterUser(user);

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "administrador",
      "administrador é obrigatório"
    );
  });
});
