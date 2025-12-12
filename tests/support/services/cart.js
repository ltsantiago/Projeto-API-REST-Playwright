export const cartService = (request) => {
  const listCart = async () => {
    return await request.get("https://serverest.dev/carrinhos", {});
  };

  const createCart = async () => {
    return await request.post("https://serverest.dev/carrinhos", {});
  };

  return {
    listCart,
    createCart
  };
};
