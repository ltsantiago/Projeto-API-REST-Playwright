

export const userService = (request) => {
  const listUser = async () => {
    return await request.get("https://serverest.dev/usuarios");
  };

  

  const returnUserId = async () => {
    const response = await listUser();
    const responseBody = await response.json();

    const userId = responseBody.usuarios;

    if (!userId || userId.length === 0) {
      return("Nenhum usuário encontrado na API.");
    }

    const randomIndex = Math.floor(Math.random() * userId.length);
    return userId[randomIndex]._id;
  };

  const deleteUserList = async (userId) => {
    return await request.delete(`https://serverest.dev/usuarios/${userId}`);
  };



  return {
    listUser, 
    deleteUserList,
    returnUserId,
  };
};
