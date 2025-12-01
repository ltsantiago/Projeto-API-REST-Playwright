import { expect, test } from "../../support/fixtures/index.js";
import { createUser } from "../../support/factories/user.js";

test.describe("POST / Login", () => {
  test(" Deve realizar login com sucesso!!", async ({ auth }) => {
    // Preparação dos dados
    const user = createUser();

    // Realiza o cadastro
    const respCreate = await auth.createRegisterUser(user);
    expect(respCreate.status()).toBe(201);

    // Realiza o login
    const response = await auth.login(user);
    // Asserções do login
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "message",
      "Login realizado com sucesso"
    );
    expect(responseBody).toHaveProperty("authorization");
  });

  test(" Não deve logar com a senha incorreta", async ({ auth }) => {
    // Preparação dos dados
    const user = createUser();

    const respCreate = await auth.createRegisterUser(user);
    expect(respCreate.status()).toBe(201);

    //
    const response = await auth.login({ ...user, password: "senhaerrada" });

    expect(response.status()).toBe(401);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "message",
      "Email e/ou senha inválidos"
    );
  });

  test(" Não deve logar com email que não foi cadastrado", async ({ auth }) => {
    // Preparação dos dados
    const user = {
      email: "404@lucas.dev.com",
      password: "teste",
    };

    //
    const response = await auth.login(user);

    expect(response.status()).toBe(401);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "message",
      "Email e/ou senha inválidos"
    );
  });

  test(" Não deve logar com  campo email não informado", async ({ auth }) => {
    // Preparação dos dados
    const user = {
      password: "teste",
    };

    //
    const response = await auth.login(user);

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("email", "email é obrigatório");
  });

  test(" Não deve logar com  campo senha não informado", async ({ auth }) => {
    // Preparação dos dados
    const user = {
      email: "alba_sipes@hotmail.com",
    };

    //
    const response = await auth.login(user);

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("password", "password é obrigatório");
  });
});
