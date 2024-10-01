function isPostBodyValid({ files, bodyData }) {
  const {
    name,
    description,
    short_description,
    category,
    sub_category,
    color,
    brand,
    size,
    unit,
    sku,
    shop,
    buying_price,
    selling_price,
    discount_price,
    minimum_order_quantity,
    current_stock_quantity,
  } = bodyData;

  let arr_sub_categories = [];
  let arr_colors = [];
  let arr_sizes = [];

  if (sub_category) {
    arr_sub_categories = sub_category.slice(1, -1).split(",");
    // console.log(
    //   typeof sub_categories + "   :arr_sub_categories:   " + sub_categories
    // );
    // for (let i = 0; i < sub_categories.length; i++) {
    //   arr_sub_categories[i] = sub_categories[i];
    // }
    // console.log(
    //   typeof arr_sub_categories +
    //     "   :arr_sub_categories:   " +
    //     arr_sub_categories
    // );
  }
  if (color) {
    arr_colors = color.slice(1, -1).split(",");
  }
  if (size) {
    arr_sizes = size.slice(1, -1).split(",");
  }

  if (name === undefined || name === "") {
    return { success: false, message: "Product name is missing" };
  } else if (description === undefined || description === "") {
    return { success: false, message: "Need a product description" };
  } else if (short_description === undefined || short_description === "") {
    return { success: false, message: "SHort description is missing " };
  } else if (category === undefined || category === "") {
    return { success: false, message: "Must select product category" };
  } else if (sku === undefined || sku === "") {
    return { success: false, message: "Stock keeping unit is required" };
  } else if (buying_price === undefined || buying_price < 1) {
    return { success: false, message: "Provide valid buying price" };
  } else if (selling_price === undefined || selling_price < 0) {
    return { success: false, message: "Selling price is required" };
  } else if (
    current_stock_quantity === undefined ||
    current_stock_quantity === ""
  ) {
    return { success: false, message: "Current stock amount is required" };
  } else {
    return {
      success: true,
      name,
      description,
      short_description,
      category,
      sub_category: arr_sub_categories,
      color: arr_colors,
      brand,
      size: arr_sizes,
      unit,
      sku,
      shop,
      buying_price,
      selling_price,
      discount_price,
      product_approval: "PENDING",
      is_active: false,
      minimum_order_quantity,
      current_stock_quantity,
    };
  }
}
function isPatchBodyValid({ updatable, role, bodyData }) {
  const {
    name,
    description,
    short_description,
    category,
    sub_category,
    color,
    brand,
    size,
    unit,
    sku,
    shop,
    buying_price,
    selling_price,
    discount_price,
    product_status,
    minimum_order_quantity,
    current_stock_quantity,
  } = bodyData;

  return {
    name: name ? name : updatableProduct.name,
    description: description ? description : updatableProduct.description,
    short_description: short_description
      ? short_description
      : updatableProduct.short_description,

    category: category ? category : updatableProduct.category,
    sub_category: sub_category ? sub_category : updatableProduct.sub_category,
    color: color ? color : updatableProduct.color,
    brand: brand ? brand : updatableProduct.brand,
    size: size ? size : updatableProduct.size,
    unit: unit ? unit : updatableProduct.unit,
    sku: sku ? sku : updatableProduct.sku,
    shop: shop ? shop : updatableProduct.shop,
    buying_price: buying_price ? buying_price : updatableProduct.buying_price,
    selling_price: selling_price
      ? selling_price
      : updatableProduct.selling_price,
    discount_price: discount_price
      ? discount_price
      : updatableProduct.discount_price,
    product_status: product_status
      ? product_status
      : updatableProduct.product_status,
    minimum_order_quantity: minimum_order_quantity
      ? minimum_order_quantity
      : updatableProduct.minimum_order_quantity,
    current_stock_quantity: current_stock_quantity
      ? current_stock_quantity
      : updatableProduct.current_stock_quantity,
  };
}

module.exports = { isPostBodyValid, isPatchBodyValid };
