/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    accesses: {
      type: Schema.Types.ObjectId,
      ref: "accesses",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Role = model("roles", roleSchema);

module.exports = Role;
