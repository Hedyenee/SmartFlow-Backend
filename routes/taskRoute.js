const Task = require("../models/taskModel");
const User = require("../models/userModel");

/* *************************************** */

/*  Get task by ID  */
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      const error = new Error("Task does not exist");
      return next(error);
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ err });
  }
};

/* *************************************** */

/*  Get All Tasks  */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(201).json({ results: tasks.length, data: { tasks } });
  } catch (err) {
    res.status(400).json({ err });
  }
};

/* *************************************** */

/*  Create task  */
exports.createTask = async (req, res) => {
  const { object, content, status, assigned_to } = req.body;
  try {
    const task = await Task.create({ object, content, status, assigned_to });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ err });
  }
};