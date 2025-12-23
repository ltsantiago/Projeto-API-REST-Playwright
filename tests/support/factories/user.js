import { faker } from "@faker-js/faker";

export const createUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    nome: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    password: "teste",
    administrador: "true",
  };
};

export const updatedUserData = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    nome: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    password: faker.internet.password({ length: 10 }),
    administrador: "true",
  };
};



