export const authServiceUser = (request) => {
  const login = async (user) => {
    return await request.post("https://serverest.dev/login", {
      data: {
        email: user.email,
        password: user.password,
      },
    });
  };

  const createRegisterUser = async (user) => {
    return await request.post("https://serverest.dev/usuarios", {
      data: user,
    });
  };

  const getToken = async (user) => {
    // Retorna o token de autenticação
    const response = await login(user);
    const body = await response.json();
    return body.data.token;
  };

  return {
    login,
    createRegisterUser,
    getToken,
  };
};
