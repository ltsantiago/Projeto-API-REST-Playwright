
import { expect, test } from "../../support/fixtures/index.js";
import { createUser } from "../../support/factories/user.js";

test.describe("POST / Login", () => {

 
  const registerUser = async (auth, user) => {
    const resp = await auth.createRegisterUser(user);
    expect(resp.status()).toBe(201);
    return resp;
  };

  const doLogin = async (auth, credentials) => {
    return await auth.login(credentials);
  };

  test("Deve realizar login com sucesso", async ({ auth }) => {
    const user = createUser();
    await registerUser(auth, user);

    const resp = await doLogin(auth, user);
    expect(resp.status()).toBe(200);

    const body = await resp.json();
    expect(body).toHaveProperty("message", "Login realizado com sucesso");
    expect(body).toHaveProperty("authorization");
  });

  test("Não deve logar com a senha incorreta", async ({ auth }) => {
    const user = createUser();
    await registerUser(auth, user);

    const resp = await doLogin(auth, { ...user, password: "senhaerrada" });
    expect(resp.status()).toBe(401);

    const body = await resp.json();
    expect(body).toHaveProperty("message", "Email e/ou senha inválidos");
  });

  test("Não deve logar com email não cadastrado", async ({ auth }) => {
    const credentials = { email: "404@lucas.dev.com", password: "teste" };
    const resp = await doLogin(auth, credentials);
    expect(resp.status()).toBe(401);

    const body = await resp.json();
    expect(body).toHaveProperty("message", "Email e/ou senha inválidos");
  });

  test("Não deve logar sem informar o email", async ({ auth }) => {
    const resp = await doLogin(auth, { password: "teste" });
    expect(resp.status()).toBe(400);

    const body = await resp.json();
    expect(body).toHaveProperty("email", "email é obrigatório");
  });

  test("Não deve logar sem informar a senha", async ({ auth }) => {
    const resp = await doLogin(auth, { email: "testessimples@hotmail.com" });
    expect(resp.status()).toBe(400);

    const body = await resp.json();
    expect(body).toHaveProperty("password", "password é obrigatório");
  });
});