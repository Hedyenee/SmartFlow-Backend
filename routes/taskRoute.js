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
    res.status(400).json( err.message );
  }
};

/* *************************************** */

/*  Update Content Task  */
exports.updateTask = async (req, res) => {
  try{
    const { object, content, status } = req.body
    const task = await Task.findOne({ id: req.params._id })
    if(!task){
      return res.status(404).json({ Message: "Task not exist !"})
    }
    await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { object: object, content: content, status: status }}
    )
    return res.status(200).json(task)
  }catch(err){
    res.status(400).json(err)
  }
};

/* *************************************** */

/*  Update Status Task  */
exports.updateStatusTask = async (req, res) => {
  try{
    const { status } = req.body
    const task = await Task.findOne({ id: req.params._id })
    if(!task){
      return res.status(404).json({ Message: "Task not exist !"})
    }
    await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { status: status }}
    )
    return res.status(200).json(task)
  }catch(err){
    res.status(400).json(err)
  }
};

/* *************************************** */

/*  Delete Task  */
exports.delTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.createdBy === req.body.id) {
    try {
      await task.delete();
      res.status(200).json("Task has been deleted !");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

/* *************************************** */

/*  Delete All Tasks  */
exports.delAllTasks = async (req, res) => {
  try {
    const task = await Task.deleteMany(Task.find())
    return res.status(200).json("All Tasks has been deleted !");
  } catch (err) {
    res.status(500).json(err);
  }
};

/* *************************************** */

/* Assigned To */
exports.assignedTo = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.val });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role.toUpperCase() === "CLIENT") {
      return res
        .status(400)
        .json(`${user.username} is not a Project manager/developer`);
    }

    const task = await Task.findOne({ _id: req.params.id });
    if (task.assigned_to.indexOf(req.body.val) !== -1 && task.status === "UNASSIGNED") {
      return res.json(`${user.username} already assigned`);
    }
    await Task.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { assigned_to: req.body.val }}
    );
    if (task.status === "UNASSIGNED") {
      await Task.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { status: "WAITING" } }
      );
    }
    return res
      .status(200)
      .json(
        `Task ${task.object} assigned to ${user.username},${task.assigned_to}`
      );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/* *************************************** */

/* Unassigned */
exports.unassignedFrom = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.val });
    // not a user
    if (!user) {
      return res.status(400).json({ message: `${req.body.val} is not a user` });
    }
    // not a developer
    if (user.role.toUpperCase() === "CLIENT") {
      return res
        .status(400)
        .json({ message: `${user.username} is not a developer` });
    }
    const task = await Task.findOne({ _id: req.params.id });
    if (task.assigned_to.length === 0) {
      return res.json(`No one assigned for ${task.object}`);
    }
    if (task.assigned_to.indexOf(req.body.val) === -1) {
      return res.json(`${user.username} is not assigned`);
    }
    const tab = task.assigned_to;
    await Task.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { assigned_to: req.body.val } }
    );
    if (task.assigned_to.length === 0) {
      await Task.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { status: "UNASSIGNED" } }
      );
    }
    return res.json({
      Resultat: `${user.username} unassigned from ${task.object}`,
      Updated_task: task,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

