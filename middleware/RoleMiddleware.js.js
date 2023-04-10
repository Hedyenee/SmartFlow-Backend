const ROLES = {
  PROJECT_MANAGER: "PROJECT_MANAGER",
  EMPLOYEE: "EMPLOYEE",
  CLIENT: "CLIENT",
};

const isRole =
  (...roles) =>
  (req, res, next) => {
    const role = roles.find((role) => req.user.role === role);
    if (!role) {
      return res.status(401).json({ message: "no access" });
    }
    next();
  };

module.exports = {
  isRole,
  ROLES,
};
