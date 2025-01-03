const multer = require("multer");
const upload = multer({ dest: "../../public/" });
const { storageMap } = require("./fileHandle");
const { entities } = require("../config/constants");
const fs = require("fs");
const path = require("path");

const fieldsMap = {
  [entities.brand]: [{ name: "brand_logo", maxCount: 1, required: true }],
  // promotion mgmt - admin
  [entities.banner]: [
    { name: "banner_thumbnail", maxCount: 1, required: true },
  ],
  [entities.ad]: [{ name: "ad_thumbnail", maxCount: 1, required: true }],
  //  category sub-category  -admin
  [entities.category]: [{ name: "cat_thumbnail", maxCount: 1, required: true }],
  [entities.sub_category]: [
    { name: "sub_cat_thumbnail", maxCount: 1, required: true },
  ],
  // promotion mgmt - seller
  [entities.shop_banner]: [
    { name: "shop_banner", maxCount: 1, required: true },
  ],
  // business-setting    - admin
  [entities.general_setting]: [
    { name: "website_logo", maxCount: 1, required: true },
    { name: "textual_logo", maxCount: 1, required: true },
  ],
  [entities.social_link]: [
    { name: "social_icon", maxCount: 1, required: true },
  ],
  // shop
  [entities.shop]: [
    { name: "shop_logo", maxCount: 1, required: true },
    { name: "shop_banner", maxCount: 1, required: true },
    { name: "seller_profile", maxCount: 1, required: true },
  ],
  [entities.rider]: [{ name: "rider_profile", maxCount: 1, required: true }],
  //  product and related  -seller
  [entities.product]: [
    { name: "product_thumbnail", maxCount: 1, required: true },
    { name: "additional_product_thumbnail", maxCount: 5, required: true },
  ],
  [entities.payment_gateway]: [{ name: "payment_gateway_logo", maxCount: 1, required: true }],

  //  legal pages   -admin

  // third party config  -admin
};
// --------------------------------------------------------------------------------------------------------------------------------------

const uploadBrandLogo = upload.fields(fieldsMap[entities.brand]);
// shop
const uploadShopCreationFiles = upload.fields(fieldsMap[entities.shop]);
// business setting   - admin
const uploadGeneralSettingFiles = upload.fields(
  fieldsMap[entities.general_setting]
);
const uploadSocialLink = upload.fields(fieldsMap[entities.social_link]);
//   promotion mgtmt  - admin
const uploadAdThumbnail = upload.fields(fieldsMap[entities.ad]);
const uploadBannerThumbnail = upload.fields(fieldsMap[entities.banner]);
const uploadRiderProfile = upload.fields(fieldsMap[entities.rider]);
//   category   subcategory  - admin
const uploadSubCatThumbnail = upload.fields(fieldsMap[entities.sub_category]);
const uploadCatThumbnail = upload.fields(fieldsMap[entities.category]);
//   promotion mgtmt  - seller
const uploadShopBanner = upload.fields(fieldsMap[entities.shop_banner]);
//
const uploadProductImages = upload.fields(fieldsMap[entities.product]);
const uploadPaymentGatewayLogo = upload.fields(
  fieldsMap[entities.payment_gateway]
);

//
//
async function uploadHandler({ entity, file }) {
  try {
    const uploadDir = path.join(__dirname, storageMap[entity].destination);
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
    } catch (err) {
      console.log("inner catch");
      console.error(err);
    }
    const readData = fs.readFileSync(file.path);
    // unique name generation
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const newFilePath = `${storageMap[entity].save_directory}${basename}-${timestamp}${ext}`;
    //
    const writeData = fs.writeFileSync(newFilePath, readData);
    return newFilePath;
  } catch (error) {
    console.log("err: " + error.message);
    res.status(400).send({ message: "error processing file" });
  }
}

module.exports = {
  uploadHandler,
  fieldsMap,
  uploadBrandLogo,
  uploadRiderProfile,
  uploadGeneralSettingFiles,
  uploadAdThumbnail,
  uploadBannerThumbnail,
  uploadSocialLink,
  uploadShopCreationFiles,
  uploadShopBanner,
  uploadCatThumbnail,
  uploadSubCatThumbnail,
  uploadProductImages,
  uploadPaymentGatewayLogo,
};
