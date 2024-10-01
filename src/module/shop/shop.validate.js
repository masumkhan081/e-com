const { getHashedPassword } = require("../../utils/tokenisation");

function isPostBodyValid({ files, bodyData }) {
  const {
    seller_fullname,
    seller_phone,
    seller_gender,
    account_email,
    account_password,
    account_confirm_password,
    shop_name,
    shop_address,
    description, 
    is_active,
  } = bodyData;

  const hashedPassword = "123456"; // getHashedPassword(account_password);

  if (seller_fullname === undefined || seller_fullname === "") {
    return { success: false, message: "Provide seller full name" };
  } else if (seller_phone === undefined || seller_phone === "") {
    return { success: false, message: "Seller phone number required" };
  } else if (seller_gender === undefined || seller_gender === "") {
    return { success: false, message: "Select seller gender" };
  } else if (account_email === undefined || account_email === "") {
    return { success: false, message: "Seller account email is missing" };
  } else if (account_password === undefined || account_password === "") {
    return { success: false, message: "Provide seller password" };
  } else if (
    account_confirm_password === undefined ||
    account_confirm_password === ""
  ) {
    return { success: false, message: "Seller confirm password is missing" };
  } else if (account_password !== account_confirm_password) {
    return { success: false, message: "Seller account password doesn't match" };
  } else if (shop_name === undefined || shop_name === "") {
    return { success: false, message: "Shop name is missing" };
  } else if (shop_address === undefined || shop_address === "") {
    return { success: false, message: "shop address is missing" };
  } else {
    return {
      success: true,
      seller_fullname,
      seller_phone,
      seller_gender,
      account_email,
      // to be hashed
      account_password: hashedPassword,
      account_confirm_password,
      shop_name,
      shop_address,
      description,
      account_role: "SELLER",
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
