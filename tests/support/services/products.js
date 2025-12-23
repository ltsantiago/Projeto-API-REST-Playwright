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

  
  const returnProductId = async () => {
    const response = await listProduct();
    const responseBody = await response.json();
    
    const productId = responseBody.produtos;
    
    if (!productId || productId.length === 0) {
      return "Nenhum produto encontrado na API.";
    }
    
    const randomIndex = Math.floor(Math.random() * productId.length);
    return productId[randomIndex]._id;
  };
  
  const listProductById = async (productId) => {
    return await request.get(`https://serverest.dev/produtos/${productId}`);
  };


  

  return {
    registerProduct,
    listProduct,
    returnProductId,
    listProductById
  };
};
