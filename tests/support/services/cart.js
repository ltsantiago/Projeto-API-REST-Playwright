import { he } from "@faker-js/faker";

export const cartService = (request) => {
  const listCart = async () => {
    return await request.get("https://serverest.dev/carrinhos", {});
  };

  const createCart = async ( cart ,token) => {
    return await request.post("https://serverest.dev/carrinhos", {
        headers: {Authorization: `${token}`},
        data: {cart},
    });
  };

    const registerProduct = async (product, token) => {
    return await request.post("https://serverest.dev/produtos", {
      headers: {
        Authorization: `${token}`,
      },
      data: product,
    });
  };

  return {
    listCart,
    createCart
  };
};
