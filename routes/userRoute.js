const User = require("../models/userModel");
const bcrypt = require("bcrypt");

/*  Get User by ID  */
exports.getUser = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) {
      const error = new Error("User does not exist");
      return next(error);
    }
    res.status(201).json(users);
  } catch (err) {
    res.status(400).json({ err });
  }
};

/* ********************************************************* */

/*  Get All Users  */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({ results: users.length, data: { users } });
  } catch (err) {
    res.status(400).json({ err });
  }
};

/* ********************************************************* */

/*  Delete User by ID  */
exports.delUser = async (req, res) => {
  const users = await User.findById(req.params.id);
  if (users.createdBy === req.body.id) {
    try {
      await users.delete();
      res.status(201).json("User has been deleted !");
    } catch (err) {
      res.status(400).json({ err });
    }
  }
};

exports.updatepassword = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const user = await User.findById(req.params.id);
    const password = await bcrypt.hash(req.body.password, salt);
    if (!user) {
      return res.status(404).json({ Message: "user not exist !" });
    }
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { password: password } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

//getall employees
exports.getAlldevs = async (req, res) => {
  try {
    const users = await User.find({ role: "EMPLOYEE" });
    res.status(201).json({ results: users.length, data: { users } });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const users = await User.find({ role: "CLIENT" });
    res.status(201).json({ results: users.length, data: { users } });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getAllMangers = async (req, res) => {
  try {
    const users = await User.find({ role: "PROJECT_MANAGER" });
    res.status(201).json({ results: users.length, data: { users } });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.updateuser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const user = await User.findById(req.params.id);
    const password = await bcrypt.hash(req.body.password, salt);
    const email = req.body.email;
    const username = req.body.username;
    const role = req.body.role;
    if (!user) {
      return res.status(404).json({ Message: "user not exist !" });
    }
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          password: password,
          username: username,
          role: role,
          email: email,
        },
      },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
