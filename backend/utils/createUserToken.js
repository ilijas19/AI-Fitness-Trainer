const createUserToken = (user) => {
  return {
    username: user.username,
    email: user.email,
    userId: user._id,
    role: user.role,
  };
};

export default createUserToken;
