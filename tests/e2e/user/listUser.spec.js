import { expect, test } from "@playwright/test";
import { userService } from "../../support/services/user.js";

test.describe("GET /Listar Usuários", () => {
  test(" Deve retornar lista de usuários com sucesso!!", async () => {
    const user = userService();
    const response = await user.listUser();

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("usuarios");
  });
});
