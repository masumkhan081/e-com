var http = require("http");
var util = require("util");
const multer = require("multer");
const upload = multer();

const validateRequest = (requestBodySchema) => async (req, res, next) => {
  try {
    const valid = requestBodySchema.safeParse(req.body);

    console.log(" valid::    " + JSON.stringify(valid) + "\n");

    if (valid.success) {
      next();
    } else {
      let messages = {};
      let issues = valid.error.issues;

      for (let i = 0; i < issues.length; i++) {
        messages[issues[i].path[0]] = issues[i].message;
      }

      res.status(400).send({
        status_code: 400,
        success: false,
        message: "Invalid data",
        messages,
        type: "ZodError",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "Invalid data",
      status: 400,
    });
  }
};

module.exports = validateRequest;
