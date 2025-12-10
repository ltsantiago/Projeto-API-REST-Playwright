export const productService = (request) => {
  const registerProduct = async (product, token) => {
    return await request.post("https://serverest.dev/produtos", {
      headers: {
        Authorization: `${token}`,
      },
      data: product,
    });
  };

  const listProduct = async () => {
    return await request.get("https://serverest.dev/produtos", {});
  };

  

  return {
    registerProduct,
    listProduct,
  };
};
