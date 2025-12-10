import { expect, test } from "../../support/fixtures/index.js";

test.describe("GET /Listar Usuários", () => {
  test(" Deve retornar lista de usuários com sucesso!!", async ({users}) => {
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
});