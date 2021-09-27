const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      unique: true,
    },
    done: {
      type: Boolean,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const DaysSchema = new mongoose.Schema(
  {
    tasks: [TaskSchema],
    date: {
      type: Date,
      required: true,
    }
  },
  {
    timestamps: true
  }

)

module.exports = mongoose.model("Days", DaysSchema);
