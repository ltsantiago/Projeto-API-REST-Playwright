import { faker } from "@faker-js/faker";

export const createProduct = () => {
  const name = faker.commerce.productName();
  const price = faker.commerce.price({ min: 100, max: 200, dec: 0 }) 
  const description = faker.commerce.product()
  const quantity = faker.number.int({ min: 1, max: 1000 });

  return {
    nome: name,
    preco: price,
    descricao: description,
    quantidade: quantity
  };
};