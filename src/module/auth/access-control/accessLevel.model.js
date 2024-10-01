/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");

const acessLevelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const accessLevel = model("accessLevel", acessLevelSchema);

module.exports = accessLevel;
