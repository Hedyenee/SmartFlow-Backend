const express = require("express");
const router = express.Router();
const app = express();

const cookieParser = require("cookie-parser");
const passport = require("passport");

// Routes
const { register, login } = require("./authRoute");
const {
  getAllUsers,
  getUser,
  delUser,
  updatepassword,
  getAlldevs,
  getAllClients,
  updateuser,
  getAllMangers,
} = require("./userRoute");
const {
  updateClaim,
  getClaim,
  getAllClaim,
  addClaim,
  updateStatusClaim,
  delClaim,
  archivedClaim,
} = require("./claimRoute");
const {
  getTask,
  getAllTasks,
  createTask,
  delTask,
  delAllTasks,
  updateStatusTask,
  updateTask,
  assignedTo,
  unassignedFrom,
} = require("./taskRoute");
const { isRole, ROLES } = require("../middleware/RoleMiddleware.js");

// middleware
app.use(express.json());
app.use(cookieParser());

// passport
app.use(passport.initialize());
require("../middleware/passport")(passport);
const Authentication = passport.authenticate("jwt", { session: false });
const Authorization = {
  Project_manajer: isRole(ROLES.PROJECT_MANAGER),
  Employee: isRole(ROLES.EMPLOYEE),
  Client: isRole(ROLES.CLIENT),
};

app.use("/auth", router);
app.use("/", router);

router.get("/", (req, res) => res.send("index"));

/*--------------- Authentication ---------------*/
router.post(
  "/register",
  Authentication,
  Authorization.Project_manajer,
  register
);
router.post("/login", login);

/*--------------- User ---------------*/
router.get(
  "/users",
  Authentication,
  Authorization.Project_manajer,
  getAllUsers
);
router.get(
  "/users/:id",
  Authentication,
  Authorization.Project_manajer,
  getUser
);
router.get("/devs", Authentication, Authorization.Project_manajer, getAlldevs);

router.get(
  "/clients",
  Authentication,
  Authorization.Project_manajer,
  getAllClients
);
router.get(
  "/getmangers",
  Authentication,
  Authorization.Project_manajer,
  getAllMangers
);
router.delete(
  "/users/:id",
  Authentication,
  Authorization.Project_manajer,
  delUser
);
router.put("/users/updatepassword/:id", Authentication, updatepassword);
router.put(
  "/updateuser/:id",
  Authentication,
  Authorization.Project_manajer,
  updateuser
);

/*--------------- Claim ---------------*/
router.post("/claims", Authentication, Authorization.Client, addClaim);
router.get(
  "/claims/:id",
  Authentication,
  isRole(ROLES.PROJECT_MANAGER, ROLES.CLIENT),
  getClaim
);
router.get(
  "/claims",
  Authentication,
  isRole(ROLES.PROJECT_MANAGER, ROLES.CLIENT),
  getAllClaim
);
router.put(
  "/claims/:id",
  Authentication,
  Authorization.Project_manajer,
  updateStatusClaim
);
router.put("/claim/:id", Authentication, Authorization.Client, updateClaim);
router.delete("/claims/:id", Authentication, Authorization.Client, delClaim);
router.put(
  "/claim/archived/:id",
  Authentication,
  Authorization.Project_manajer,
  archivedClaim
);

/*--------------- Task ---------------*/
router.post(
  "/tasks",
  Authentication,
  Authorization.Project_manajer,
  createTask
);
router.get(
  "/tasks",
  Authentication,
  isRole(ROLES.PROJECT_MANAGER, ROLES.EMPLOYEE),
  getAllTasks
);
router.get(
  "/tasks/:id",
  Authentication,
  isRole(ROLES.PROJECT_MANAGER, ROLES.EMPLOYEE),
  getTask
);
router.put(
  "/tasks/status/:id",
  Authentication,
  isRole(ROLES.PROJECT_MANAGER, ROLES.EMPLOYEE),
  updateStatusTask
);
router.put(
  "/updatetask/:id",
  Authentication,
  isRole(ROLES.PROJECT_MANAGER, ROLES.EMPLOYEE),
  updateTask
);
router.delete(
  "/tasks/:id",
  Authentication,
  isRole(ROLES.PROJECT_MANAGER, ROLES.EMPLOYEE),
  delTask
);
router.delete(
  "/tasks",
  Authentication,
  isRole(ROLES.PROJECT_MANAGER, ROLES.EMPLOYEE),
  delAllTasks
);
router.put(
  "/tasks/assigned/:id",
  Authentication,
  isRole(ROLES.PROJECT_MANAGER, ROLES.EMPLOYEE),
  assignedTo
);
router.put(
  "/tasks/unassigned/:id",
  Authentication,
  isRole(ROLES.PROJECT_MANAGER, ROLES.EMPLOYEE),
  unassignedFrom
);

module.exports = router;
