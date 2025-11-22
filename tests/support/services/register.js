 export const registerServiceUser = (request) => {
  const createRegisterUser = async (user) => {
    return await request.post("https://serverest.dev/usuarios", {
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });
  };

  return {
    createRegisterUser,
  };
};
