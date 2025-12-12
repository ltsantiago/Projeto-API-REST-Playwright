import { expect, test } from "../../support/fixtures/index.js";

test.describe("GET /Listar Carrinhos Cadastrados", () => {

    test(" Deve retornar lista de carrinhos com sucesso!!", async ({ cart }) => {
      const response = await cart.listCart();
  
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty("carrinhos");
      expect(Array.isArray(responseBody.carrinhos)).toBeTruthy();
      expect(responseBody.carrinhos.length).toBeGreaterThan(0);
    })
});