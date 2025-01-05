import fs from "fs";
import path from "path";
import { entities } from "../config/constants";
import { promisify } from "util";
const unlinkAsync = promisify(fs.unlink);
//
export const storageMap = {
  brand_logo: {
    destination: "../../public/brand-logos",
    max_upload_size: 1024 * 1024 * 3,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/brand-logos/",
    unlink_directory: "../../../../public/brand-logos",
    file_name: "brand_logo",
  },
  //  promotion mgmt - admin
  ad_thumbnail: {
    destination: "../../public/ad-images",
    max_upload_size: 1024 * 1024 * 3,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/ad-images/",
    unlink_directory: "../../../../public/ad-images",
    file_name: "ad_thumbnail",
  },
  banner_thumbnail: {
    destination: "../../public/banner-images",
    max_upload_size: 1024 * 1024 * 3,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/banner-images/",
    unlink_directory: "../../../../public/banner-images",
  },
  shop_banner: {
    destination: "../../public/shop-banners",
    max_upload_size: 1024 * 1024 * 3,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/shop-banners/",
    unlink_directory: "../../../../public/shop-banners",
  },
  //   business setting  - admin
  shop_logo: {
    destination: "../../public/shop-logos",
    max_upload_size: 1024 * 1024 * 3,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/shop-logos/",
    unlink_directory: "../../../public/shop-logos",
  },
  seller_profile: {
    destination: "../../public/seller_profiles",
    max_upload_size: 1024 * 1024 * 3,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/seller_profiles/",
    unlink_directory: "../../../public/seller_profiles",
  },
  product_thumbnail: {
    destination: "../../public/product-images",
    max_upload_size: 1024 * 1024 * 3,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/product-images/",
    unlink_directory: "../../../public/product-images",
  },
  additional_product_thumbnail: {
    destination: "../../public/product-images",
    max_upload_size: 1024 * 1024 * 3,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/product-images/",
    unlink_directory: "../../../public/product-images",
  },
  cat_thumbnail: {
    destination: "../../public/product-categories",
    max_upload_size: 1024 * 1024 * 1,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/product-categories/",
    unlink_directory: "../../../../public/product-categories",
  },
  sub_cat_thumbnail: {
    destination: "../../public/sub-categories",
    max_upload_size: 1024 * 1024 * 1,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/sub-categories/",
    unlink_directory: "../../../../public/sub-categories",
  },
  social_icon: {
    destination: "../../public/social-icons",
    max_upload_size: 1024 * 1024 * 1,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/social-icons/",
    unlink_directory: "../../../public/social-icons",
  },
  website_logo: {
    destination: "../../public/site-logo",
    max_upload_size: 1024 * 1024 * 1,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/site-logo/",
    unlink_directory: "../../../../public/site-logo",
  },
  textual_logo: {
    destination: "../../public/site-logo",
    max_upload_size: 1024 * 1024 * 1,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/site-logo/",
    unlink_directory: "../../../../public/site-logo",
  },
  rider_profile: {
    destination: "../../public/riders",
    max_upload_size: 1024 * 1024 * 1,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/riders/",
    unlink_directory: "../../../../public/riders",
  },
  payment_gateway_logo: {
    destination: "../../public/payment-gateways",
    max_upload_size: 1024 * 1024 * 1,
    accepted_file_types: /jpeg|jpg|png|gif|webp|svg/,
    save_directory: "public/payment-gateways/",
    unlink_directory: "../../../../public/payment-gateways",
  },
};
// 
interface File {
  originalname: string;
  mimetype: string;
}
type FileTypes = RegExp;
type CallbackFunction = (error: string | null, isValid?: boolean) => void;
// 
export function checkFileType({ file, fileTypes, cb }: {
  file: File,
  fileTypes: FileTypes,
  cb: CallbackFunction
}) {
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only! (jpeg, jpg, png, gif, webp, svg)");
  }
}

export async function removeFile({ fileUrl }: { fileUrl: string }) {
  try {
    const deleteUrl = path.join(__dirname, `../../${fileUrl}`);
    if (fs.existsSync(deleteUrl)) {
      await unlinkAsync(deleteUrl);
    }
  } catch (error) {
    console.log(" ---- " + JSON.stringify(error));
  }
}


