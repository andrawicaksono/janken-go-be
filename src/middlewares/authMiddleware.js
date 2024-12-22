const verifyToken = (userService, tokenService) => async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new Error("Invalid token");

    const token = authHeader.split(" ")[1];

    if (!token) throw Error("Invalid token");

    const decoded = tokenService.verify(token);

    const [user, err] = await userService.getUserById(decoded.id);
    if (err) throw err;

    req.user = user;

    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = (userService, tokenService) => {
  return {
    verifyToken: verifyToken(userService, tokenService),
  };
};
