import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("POST/login", () => {
  test(" Deve realizar login com sucesso!!", async ({ request }) => {
    const user = {
      email: "fulano@qa.com",
      password: "teste",
    };
    const response = await request.post("https://serverest.dev/login", {
      data: user,
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "message",
      "Login realizado com sucesso"
    );
    expect(responseBody).toHaveProperty("authorization");
  });
});
