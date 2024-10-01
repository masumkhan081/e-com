function isPostBodyValid({ name, hex, is_active }) {
  if (name === undefined || name === "") {
    return { success: false, message: "Color name is missing" };
  }
  if (hex === undefined || hex === "") {
    return { success: false, message: "Color hex value is required" };
  } else {
    return {
      success: true,
      name,
      is_active: is_active ? is_active : false,
    };
  }
}
function isPatchBodyValid({ name, is_active, description, category }) {
  // var form = new multiparty.Form();
  // form.parse(req, function (err, fields, files) {

  if (name && category) {
    return { success: true, name, is_active, description, category };
  } else {
    return { success: false, name, is_active, description, category };
  }
}

module.exports = { isPostBodyValid, isPatchBodyValid };
