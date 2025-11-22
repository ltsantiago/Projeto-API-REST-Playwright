import { expect, test } from "@playwright/test";
import { createUser } from "../../support/factories/user.js";
import{ registerServiceUser } from "../../support/services/register.js";

test.describe("POST/ Register", () => {

    let register;
    test.beforeEach(({request}) => {
        register = registerServiceUser(request);
    })

  test(" Deve realizar cadastro de um novo usuário com sucesso!!", async ({request}) => {


    // Preparação dos dados
    const user = createUser();
   
    //Ação
    const response = await register.createRegisterUser(user);

    // Resultado esperado / Asserções
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "message",
      "Cadastro realizado com sucesso"
    );
    expect(responseBody).toHaveProperty("_id");
  });

  test(" Não Deve realizar cadastro com email já em uso", async ({
    request,
  }) => {
    const user = createUser();

    const preCondition = await request.post("https://serverest.dev/usuarios", {
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });

    expect(preCondition.status()).toBe(201);

    const response = await request.post("https://serverest.dev/usuarios", {
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "message",
      "Este email já está sendo usado"
    );
  });


   test(" Não Deve realizar cadastro com email inválido", async ({
    request,
  }) => {


    const user = {
      nome: 'Messi Ronaldo',
      email: 'messironaldo$.com',
      password: "teste",
      administrador: "true",
    };

    const response = await request.post("https://serverest.dev/usuarios", {
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "email",
      "email deve ser um email válido"
    );
  });

  test(" Não Deve cadastrar quando o campo nome não é informado", async ({
    request,
  }) => {


    const user = {
      email: 'messironaldo$.com',
      password: "teste",
      administrador: "true",
    };

    const response = await request.post("https://serverest.dev/usuarios", {
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "nome",
      "nome é obrigatório"
    );
  });


  test(" Não Deve cadastrar quando o campo email não é informado", async ({
    request,
  }) => {


    const user = {
      nome: 'Messi Ronaldo',
      password: "teste",
      administrador: "true",
    };

    const response = await request.post("https://serverest.dev/usuarios", {
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "email",
      "email é obrigatório"
    );
  });


  test(" Não Deve cadastrar quando o campo password não é informado", async ({
    request,
  }) => {


    const user = {
      nome: 'Messi Ronaldo',
      email: 'messironaldo$.com',
      administrador: "true",
    };

    const response = await request.post("https://serverest.dev/usuarios", {
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "password",
      "password é obrigatório"
    );
  });

   test(" Não Deve cadastrar quando o campo administrador não é informado", async ({
    request,
  }) => {


    const user = {
      nome: 'Messi Ronaldo',
      email: 'messironaldo$.com',
      password: "teste",
    };

    const response = await request.post("https://serverest.dev/usuarios", {
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "administrador",
      "administrador é obrigatório"
    );
  });
});
