

export const userService = (request) => {
  const listUser = async () => {
    return await request.get("https://serverest.dev/usuarios");
  };

  const returnUserId = async () => {
    const response =  await listUser();
    const responseBody = await response.json();
    const userId = responseBody.usuarios[0]._id;
    return userId;
  }

  const deleteUserList = async (userId) => {
    return await request.delete(`https://serverest.dev/usuarios/${userId}`);
  };

  const putUserList = async (userId) => {
    return await request.put(`https://serverest.dev/usuarios/${userId}`, {
      data: userData,
    });
  }

  return {
    listUser, 
    deleteUserList,
    returnUserId,
    putUserList
  };
};
