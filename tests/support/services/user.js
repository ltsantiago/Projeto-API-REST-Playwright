export const userService = (request) => {
  const listUser = async () => {
    return await request.get("https://serverest.dev/usuarios");
  };

  return {
    listUser,
  };
};
