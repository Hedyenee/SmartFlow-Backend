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
} = require("./claimRoute");
const { getAllTasks, createTask } = require("./taskRoute");

// middleware
app.use(express.json());
app.use(cookieParser());

// passport
app.use(passport.initialize());
require("../middleware/passport")(passport);
const Authentication = passport.authenticate("jwt", { session: false });
const Authorization = {
  Project_manajer: isRole(ROLES.PROJECT_MANAGER),
  EMployee: isRole(ROLES.EMPLOYEE),
  Client: isRole(ROLES.CLIENT),
};

app.use("/auth", router);
app.use("/", router);

router.get("/", (req, res) => res.send("index"));

/* Authentication */
router.post(
  "/register",
  Authentication,
  Authorization.Project_manajer,
  register
);
router.post("/login", login);

/* User */
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
router.put(
  "/users/updatepassword/:id",
  Authentication,
  Authorization.Project_manajer,
  updatepassword
);
router.put(
  "/updateuser/:id",
  Authentication,
  Authorization.Project_manajer,
  updateuser
);

/* Claim */
router.post("/claims", Authentication, addClaim);
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
router.put("/claim/:id", Authentication, updateClaim);
router.delete(
  "/claims/:id",
  Authentication,
  isRole(ROLES.PROJECT_MANAGER, ROLES.CLIENT),
  delClaim
);

/* Task */
router.post("/tasks", Authentication, createTask);
router.get("/tasks", Authentication, getAllTasks);

module.exports = router;
