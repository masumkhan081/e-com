/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");

const actionSchema = new Schema(
  {
    actions: {
      type: [String],
      default: ["CREATE", "READ", "UPDATE", "DELETE"],
      enum: ["CREATE", "READ", "UPDATE", "DELETE"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Action = model("actions", actionSchema);

module.exports = Action;
