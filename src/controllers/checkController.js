const { firebase } = require("../config");

const checkHealth = () => async (req, res, next) => {
  if (!firebase.admin.apps) {
    throw Error("Firebase is not initialized");
  }

  try {
    res.status(200).json({
      success: true,
      message: "OK",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = () => {
  return {
    checkHealth: checkHealth(),
  };
};
