const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    object: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: [true, "Define the task status"],
      uppercase: true,
      enum: {
        values: [
          "UNASSIGNED",
          "WAITING",
          "INPROGRESS",
          "COMPLETED",
          "ARCHIVED",
        ],
        message: "Define a correct status",
      },
      default: "UNASSIGNED",
    },
    assigned_to: {
      type: Array,
      uniqueItems:true,
    },
    //[{ type: mongoose.Types.ObjectId, ref: User }],
  },
  { timestamps: true }
);

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
