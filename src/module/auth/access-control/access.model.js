/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");

const permissionSchema = new Schema({
  name: String,
  permissions: [{ name: String, status: Boolean }],
});

const accessSchema = new Schema(
  {
    levels: {
      type: [permissionSchema],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Role = model("accesses", accessSchema);

module.exports = Role;
