import http from "http";
import util from "util";
import multer from "multer";
const upload = multer();

function validateData({ schema, data }) {
  try {
    const valid = schema.safeParse(data);
    if (valid.success) {
      return { success: true };
    }
    const messages = {};
    const issues = valid.error.issues;

    // console.log("\n: issues: "+JSON.stringify(issues));

    for (let i = 0; i < issues.length; i++) {
      messages[issues[i].path[0]] = issues[i].message;
    }
    // console.log("messages :  " + JSON.stringify(messages));

    return {
      success: false,
      message: "Invalid data",
      messages,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}

export default validateData;
