const verifyToken = (admin) => async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new Error("Invalid token");

    const token = authHeader.split(" ")[1];

    if (!token) throw Error("Invalid token");

    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = (admin) => {
  return {
    verifyToken: verifyToken(admin),
  };
};
