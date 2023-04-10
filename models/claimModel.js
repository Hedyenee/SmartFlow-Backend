const { status } = require("express/lib/response");
const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
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
      required: [true, "Define a claim status"],
      uppercase: true,
      enum: {
        values: ["SOLVED", "INPROGRESS", "UNSOLVED"],
        message: "Define a correct status",
      },
      default: "unsolved",
    },
    author: {
      type: String,
      required: true,
      uppercase: true,
      default: "client",
    },
  },
  { timestamps: true }
);

const Claim = mongoose.model("claim", claimSchema);
module.exports = Claim;
