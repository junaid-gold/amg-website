

const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_API_END_POINT

export const FORGET_PASSWORD = `${baseUrl}/rest/default/V1/customers/password`
export const RESET_PASSWORD = `${baseUrl}/rest/default/V1/customers/resetPassword`
export const COUNTRIES = `${baseUrl}/rest/default/V1/directory/countries`
export const CREATE_CUSTOMER = `${baseUrl}/rest/default/V1/customers`
export const GET_SHIPPING_ADDRESS = `${baseUrl}/rest/default/V1/customers/me/shippingAddress`
export const GET_BILLING_ADDRESS = `${baseUrl}/rest/default/V1/customers/me/billingAddress`
export const CHANGE_USER_PASSWORD = `${baseUrl}/rest/default/V1/customers/me/password`
export const UPDATE_USER_ADDRESS = `${baseUrl}/rest/default/V1/addresses`
export const CURRENT_CUSTOMER = `${baseUrl}/rest/default/V1/customers/me`
export const GET_CUSTOMER_ORDER = `${baseUrl}/rest/V1/orders`
export const GET_ATTRIBUTE_DETAILS = `${baseUrl}/rest/default/V1/attributeMetadata/customer/attribute`
export const CUSTOMER_CART = `${baseUrl}/rest/default/V1/carts/mine`
export const CUSTOMER_CART_ITEMS = `${baseUrl}/rest/default/V1/carts/mine/items`
export const GET_PRODUCT = `${baseUrl}/rest/default/V1/products`
export const DELETE_PRODUCT_FROM_CART = `${baseUrl}/rest/default/V1/carts/mine/items`
export const CREATE_ITEM_IN_CART = `${baseUrl}/rest/default/V1/carts/mine/items`
export const GET_CART_PAYMENT_METHODS = `${baseUrl}/rest/default/V1/carts/mine/payment-methods`
export const SET_SHIPPING_ADDRESS = `${baseUrl}/rest/default/V1/carts/mine/shipping-information`
export const SET_PAYMENT_METHOD = `${baseUrl}/rest/default/V1/carts/mine/payment-information`
export const UPDATE_CART_ITEM = `${baseUrl}/rest/default/V1/carts/mine/items`
// export const SET_PAYMENT_METHOD = `${baseUrl}/rest/default/V1/carts/mine/order`
export const DELETE_ADDRESS = `${baseUrl}/rest/default/V1/addresses`
export const MINE_COUPONS = `${baseUrl}/rest/default/V2/carts/mine/coupons`
export const CART_MINE_TOTAL = `${baseUrl}/rest/default/V1/carts/mine/totals`
export const APPLY_COUPON = `${baseUrl}/rest/default/V1/carts/mine/multicoupons/apply`
export const CREATE_PAYPAL_EXPRESS_TOKEN = `${baseUrl}/rest/default/V1/paypalapi/createpaypalexpresstoken`
export const CREATE_SUBMISSION = `${baseUrl}/webservices/orders/`
export const CUSTOMER_PROFILE_ID = `${baseUrl}/webservices/acid/`
export const CREATE_INSURANCE_AND_SHIPPING = `${baseUrl}/webservices/cart`
export const CLEAR_DISCOUNTS_FROM_CART = `${baseUrl}/rest/default/V1/carts/mine/coupons`