import { Key } from "react"

export type LayoutType = {
  email: string
  tiktokURL: string
  instagramURL: string
  xURL: string
}

export type HomeType = {
  hero:
  | "heroSectionOne"
  | "heroSectionTwo"
  | "heroSectionThree"
  | "heroSectionFour"
}

export type HeroType = {
  heading: any
  text: string
  backgroundImage: string
}

export type WhyGradeType = {
  heading: string
  text: string
  image: string
}
export type HowItWorkType = {
  heading: string
  text: string
}

export type FollowAmGImage = {
  followAMGImageOne: string
  followAMGImageTwo: string
  followAMGImageThree: string
  followAMGImageFour: string
  followAMGImageOneInstaUrl: string
  followAMGImageTwoInstaUrl: string
  followAMGImageThreeInstaUrl: string
  followAMGImageFourInstaUrl: string
  followAmgInstaUrl: string
}

export type CassetteType = {
  text: string
  buttonText: string
  backgroundColor: string
  image: string
  heading: string
}

export type SignUpType = {
  heading: string
  text: string
  inputPlaceholderOne: string
  inputPlaceholderTwo: string
  inputPlaceholderThree: string
}

export type QuestionOneType = {
  heading: string
  text: string
  submissionItems: {
    heading: string
    text: string
    image: string
    sku: string
  }[]
}

export type QuestionTwoType = {
  heading: string
  text: string
  inputPlaceholderOne: string
  inputPlaceholderTwo: string
  inputPlaceholderThree: string
  inputPlaceholderFour: string
  inputPlaceholderFive: string
  inputPlaceholderSix: string
}

export type QuestionThreeType = {
  heading: string
  text: string
  sizeItems: {
    label: string
    text: string
    image: string
  }[]
}

export type QuestionFourType = {
  heading: string
  text: string
  displayModes: {
    label?: string
    heading: string
    text?: string
    image: string
  }[]
}

export type QuestionFiveType = {
  heading: string
  text: string
  minValue: number
  maxValue: number
  label: string
}

export type InsuranceDisclaimerType = {
  heading: string
  text: string
  inputPlaceholder: string
  radioButtonPlaceholder: string
}

export type AddOnsType = {
  heading: string
  text: string
  addOns: {
    heading: string
    label: string
  }[]
}
export type ShippingOptionsType = {
  heading: string
  text: string
  shippingOptions: {
    heading: string
    label?: string
  }[]
}

export type AboutType = {
  heading: string
  aboutHero: {
    backgroundImage: string
    backgroundImageSm: string
  }
}

export type AboutHighlightsType = {
  heading: string
  text: any
  image: string
}

export type WhyUseAmgType = {
  heading: string
  text: string
  image: string
}

export type CareerType = {
  heading: string
  text: string
}

export type JobType = {
  heading: string
  text: string
  color: string
  tags: {
    label: string
  }[]
}

export type ArchiveType = {
  heading: string
  text: any
  inputPlaceholder: string
  description: string
  types: {
    heading: string
    image: string
  }[]
  variations: {
    heading: string
    image: string
    color: any
  }[]
  descriptionOne: any
  descriptionTwo: any
}

export type WhatWeArchiveType = {
  heading: string
  text: string
  description: string
  backgroundColor: string
}

export type ContactType = {
  text: any
  inputPlaceHolderOne: string
  inputPlaceHolderTwo: string
  inputPlaceHolderThree: string
  phone: string
  email: string
  address: string
  iframeUrl: string
  description: string
  inputPlaceHolderFour: string
}

export type MerchType = {
  title: string
  price: number
  image: string
}

export type HelpType = {
  heading: string
  text: string
  backgroundImage: string
  backgroundImageSm: string
}

export type FaqType = {
  heading: string
  text: string
  questions: {
    question: string
    answer: string
  }[]
}

export interface Country {
  id: string
  two_letter_abbreviation: string
  three_letter_abbreviation: string
  full_name_locale: string
  full_name_english: string
  available_regions?: {
    id: string
    code: string
    name: string
  }[]
}

export interface Address {
  id: number
  customer_id: number
  region: Region
  region_id: number
  country_id: string
  street: string[]
  company?: string
  telephone: string
  postcode: string
  city: string
  firstname: string
  lastname: string
  default_shipping?: boolean
  default_billing?: boolean
}

export interface Region {
  region_code: string
  region: string
  region_id: number
}

export interface ErrorResponse {
  message?: string
}

export interface OrderItem {
  base_currency_code: string
  base_discount_amount: number
  base_discount_invoiced: number
  base_grand_total: number
  base_discount_tax_compensation_amount: number
  base_discount_tax_compensation_invoiced: number
  base_shipping_amount: number
  base_shipping_discount_amount: number
  base_shipping_discount_tax_compensation_amnt: number
  base_shipping_incl_tax: number
  base_shipping_invoiced: number
  base_shipping_tax_amount: number
  base_subtotal: number
  base_subtotal_incl_tax: number
  base_subtotal_invoiced: number
  base_tax_amount: number
  base_tax_invoiced: number
  base_total_due: number
  base_total_invoiced: number
  base_total_invoiced_cost: number
  base_total_paid: number
  base_to_global_rate: number
  base_to_order_rate: number
  billing_address_id: number
  created_at: string
  customer_email: string
  customer_firstname: string
  customer_gender: number
  customer_group_id: number
  customer_id: number
  customer_is_guest: number
  customer_lastname: string
  customer_note_notify: number
  discount_amount: number
  discount_invoiced: number
  email_sent: number
  entity_id: number
  global_currency_code: string
  grand_total: number
  discount_tax_compensation_amount: number
  discount_tax_compensation_invoiced: number
  increment_id: string
  is_virtual: number
  order_currency_code: string
  protect_code: string
  quote_id: number
  remote_ip: string
  shipping_amount: number
  shipping_description: string
  shipping_discount_amount: number
  shipping_discount_tax_compensation_amount: number
  shipping_incl_tax: number
  shipping_invoiced: number
  shipping_tax_amount: number
  state: string
  status: string
  store_currency_code: string
  store_id: number
  store_name: string
  store_to_base_rate: number
  store_to_order_rate: number
  subtotal: number
  subtotal_incl_tax: number
  subtotal_invoiced: number
  tax_amount: number
  tax_invoiced: number
  total_due: number
  total_invoiced: number
  total_item_count: number
  total_paid: number
  total_qty_ordered: number
  updated_at: string
  weight: number
  items: Item[]
  billing_address: BillingAddress
  payment: Payment
  status_histories: any[]
  extension_attributes: ExtensionAttributes2
}

export interface Item {
  id: Key | null | undefined
  amount_refunded: number
  base_amount_refunded: number
  base_discount_amount: number
  base_discount_invoiced: number
  base_discount_tax_compensation_amount: number
  base_discount_tax_compensation_invoiced: number
  base_original_price: number
  base_price: number
  base_price_incl_tax: number
  base_row_invoiced: number
  base_row_total: number
  base_row_total_incl_tax: number
  base_tax_amount: number
  base_tax_invoiced: number
  created_at: string
  discount_amount: number
  discount_invoiced: number
  discount_percent: number
  free_shipping: number
  discount_tax_compensation_amount: number
  discount_tax_compensation_invoiced: number
  is_qty_decimal: number
  is_virtual: number
  item_id: number
  name: string
  no_discount: number
  order_id: number
  original_price: number
  price: number
  price_incl_tax: number
  product_id: number
  product_type: string
  qty_canceled: number
  qty_invoiced: number
  qty_ordered: number
  qty_refunded: number
  qty_shipped: number
  quote_item_id: number
  row_invoiced: number
  row_total: number
  row_total_incl_tax: number
  row_weight: number
  sku: string
  store_id: number
  tax_amount: number
  tax_invoiced: number
  tax_percent: number
  updated_at: string
  weee_tax_applied: string
  weight?: number
  product_option?: ProductOption
}

export interface ProductOption {
  extension_attributes: ExtensionAttributes
}

export interface ExtensionAttributes {
  custom_options: CustomOption[]
}

export interface CustomOption {
  option_id: string
  option_value: string
}

export interface BillingAddress {
  address_type: string
  city: string
  country_id: string
  customer_address_id: number
  email: string
  entity_id: number
  firstname: string
  lastname: string
  parent_id: number
  postcode: string
  region: string
  region_code: string
  region_id: number
  street: string[]
  telephone: string
}

export interface Payment {
  account_status: any
  additional_information: string[]
  amount_ordered: number
  amount_paid: number
  base_amount_ordered: number
  base_amount_paid: number
  base_shipping_amount: number
  base_shipping_captured: number
  cc_exp_year: string
  cc_last4: any
  cc_ss_start_month: string
  cc_ss_start_year: string
  entity_id: number
  method: string
  parent_id: number
  shipping_amount: number
  shipping_captured: number
}

export interface ExtensionAttributes2 {
  shipping_assignments: ShippingAssignment[]
  payment_additional_info: PaymentAdditionalInfo[]
  applied_taxes: AppliedTax[]
  item_applied_taxes: ItemAppliedTax[]
  converting_from_quote: boolean
}

export interface ShippingAssignment {
  shipping: Shipping
  items: Item2[]
}

export interface Shipping {
  address: OrderAddress
  method: string
  total: Total
}

export interface OrderAddress {
  address_type: string
  city: string
  country_id: string
  customer_address_id: number
  email: string
  entity_id: number
  firstname: string
  lastname: string
  parent_id: number
  postcode: string
  region: string
  region_code: string
  region_id: number
  street: string[]
  telephone: string
}

export interface Total {
  base_shipping_amount: number
  base_shipping_discount_amount: number
  base_shipping_discount_tax_compensation_amnt: number
  base_shipping_incl_tax: number
  base_shipping_invoiced: number
  base_shipping_tax_amount: number
  shipping_amount: number
  shipping_discount_amount: number
  shipping_discount_tax_compensation_amount: number
  shipping_incl_tax: number
  shipping_invoiced: number
  shipping_tax_amount: number
}

export interface Item2 {
  amount_refunded: number
  base_amount_refunded: number
  base_discount_amount: number
  base_discount_invoiced: number
  base_discount_tax_compensation_amount: number
  base_discount_tax_compensation_invoiced: number
  base_original_price: number
  base_price: number
  base_price_incl_tax: number
  base_row_invoiced: number
  base_row_total: number
  base_row_total_incl_tax: number
  base_tax_amount: number
  base_tax_invoiced: number
  created_at: string
  discount_amount: number
  discount_invoiced: number
  discount_percent: number
  free_shipping: number
  discount_tax_compensation_amount: number
  discount_tax_compensation_invoiced: number
  is_qty_decimal: number
  is_virtual: number
  item_id: number
  name: string
  no_discount: number
  order_id: number
  original_price: number
  price: number
  price_incl_tax: number
  product_id: number
  product_type: string
  qty_canceled: number
  qty_invoiced: number
  qty_ordered: number
  qty_refunded: number
  qty_shipped: number
  quote_item_id: number
  row_invoiced: number
  row_total: number
  row_total_incl_tax: number
  row_weight: number
  sku: string
  store_id: number
  tax_amount: number
  tax_invoiced: number
  tax_percent: number
  updated_at: string
  weee_tax_applied: string
  weight?: number
  product_option?: ProductOption2
}

export interface ProductOption2 {
  extension_attributes: ExtensionAttributes3
}

export interface ExtensionAttributes3 {
  custom_options: CustomOption2[]
}

export interface CustomOption2 {
  option_id: string
  option_value: string
}

export interface PaymentAdditionalInfo {
  key: string
  value: string
}

export interface AppliedTax {
  code: string
  title: string
  percent: number
  amount: number
  base_amount: number
}

export interface ItemAppliedTax {
  type: string
  applied_taxes: AppliedTax2[]
  item_id?: number
}

export interface AppliedTax2 {
  code: string
  title: string
  percent: number
  amount: number
  base_amount: number
}

export interface OrdersSearchCriteria {
  filter_groups: { filters: OrderSearchFilter[] }[]
}

export interface OrderSearchFilter {
  field: string
  value: string
  condition_type: string
}

export interface Attribute {
  frontend_input: string
  input_filter: string
  store_label: string
  validation_rules: any[]
  multiline_count: number
  visible: boolean
  required: boolean
  data_model: string
  options: Option[]
  frontend_class: string
  user_defined: boolean
  sort_order: number
  frontend_label: string
  note: string
  system: boolean
  backend_type: string
  is_used_in_grid: boolean
  is_visible_in_grid: boolean
  is_filterable_in_grid: boolean
  is_searchable_in_grid: boolean
  attribute_code: string
}

export interface Option {
  label: string
  value: string
}

export interface CustomerCart {
  id: number
  created_at: string
  updated_at: string
  is_active: boolean
  is_virtual: boolean
  items: Item[]
  items_count: number
  items_qty: number
  customer: Customer
  billing_address: BillingAddress
  orig_order_id: number
  currency: Currency
  customer_is_guest: boolean
  customer_note_notify: boolean
  customer_tax_class_id: number
  store_id: number
  extension_attributes: ExtensionAttributes2
}

export interface Item {
  item_id: number
  sku: string
  qty: number
  name: string
  price: number
  product_type: string
  quote_id: string
}

export interface Customer {
  id: number
  group_id: number
  default_billing: string
  default_shipping: string
  created_at: string
  updated_at: string
  created_in: string
  email: string
  firstname: string
  lastname: string
  gender: number
  store_id: number
  website_id: number
  addresses: Address[]
  disable_auto_group_change: number
  extension_attributes: ExtensionAttributes
  custom_attributes: CustomAttribute[]
}

export interface Region {
  region_code: string
  region: string
  region_id: number
}

export interface ExtensionAttributes {
  is_subscribed: boolean
}

export interface CustomAttribute {
  attribute_code: string
  value: string
}

export interface BillingAddress {
  id: number
  region: string
  region_id: number
  region_code: string
  country_id: string
  street: string[]
  telephone: string
  postcode: string
  city: string
  firstname: string
  lastname: string
  customer_id: number
  email: string
  same_as_billing: number
  customer_address_id: number
  save_in_address_book: number
}

export interface Currency {
  global_currency_code: string
  base_currency_code: string
  store_currency_code: string
  quote_currency_code: string
  store_to_base_rate: number
  store_to_quote_rate: number
  base_to_global_rate: number
  base_to_quote_rate: number
}

export interface ExtensionAttributes2 {
  shipping_assignments: ShippingAssignment[]
}

export interface ShippingAssignment {
  shipping: Shipping
  items: Item2[]
}

export interface Shipping {
  // @ts-ignore
  address: ShippingAddress
  method: string
}

export interface ShippingAddress {
  id: number
  region: string
  region_id: number
  region_code: string
  country_id: string
  street: string[]
  telephone: string
  postcode: string
  city: string
  firstname: string
  lastname: string
  customer_id: number
  email: string
  same_as_billing: number
  customer_address_id: number
  save_in_address_book: number
}

export interface Item2 {
  item_id: number
  sku: string
  qty: number
  name: string
  price: number
  product_type: string
  quote_id: string
}

export interface Product {
  items: ProductItem[]
  search_criteria: SearchCriteria
  total_count: number
}

export interface ProductItem {
  id: number
  sku: string
  name: string
  attribute_set_id: number
  price: number
  status: number
  visibility: number
  type_id: string
  created_at: string
  updated_at: string
  weight?: number
  extension_attributes: ExtensionAttributes
  product_links: any[]
  options: Option[]
  media_gallery_entries: MediaGalleryEntry[]
  tier_prices: any[]
  option_id?: number
  custom_attributes: CustomAttribute[]
  is_require: boolean
}

export interface ExtensionAttributes {
  website_ids: number[]
  category_links: CategoryLink[]
}

export interface CategoryLink {
  position: number
  category_id: string
}

export interface Option {
  product_sku: string
  option_id: number
  title: string
  type: string
  sort_order: number
  is_require: boolean
  max_characters: number
  image_size_x: number
  image_size_y: number
  values?: Value[]
  price?: number
  price_type?: string
}

export interface Value {
  title: string
  sort_order?: number
  price?: number
  price_type?: string
  option_type_id?: number
}

export interface MediaGalleryEntry {
  id: number
  media_type: string
  label: any
  position: number
  disabled: boolean
  types: string[]
  file: string
}

export interface CustomAttribute {
  attribute_code: string
  value: string
}

export interface SearchCriteria {
  filter_groups: FilterGroup[]
}

export interface FilterGroup {
  filters: Filter[]
}

export interface Filter {
  field: string
  value: string
  condition_type: string
}

export interface PaymentMethod {
  code: string
  title: string
}

export interface CartMineTotal {
  grand_total: number
  base_grand_total: number
  subtotal: number
  base_subtotal: number
  discount_amount: number
  base_discount_amount: number
  subtotal_with_discount: number
  base_subtotal_with_discount: number
  shipping_amount: number
  base_shipping_amount: number
  shipping_discount_amount: number
  base_shipping_discount_amount: number
  tax_amount: number
  base_tax_amount: number
  weee_tax_applied_amount: any
  shipping_tax_amount: number
  base_shipping_tax_amount: number
  subtotal_incl_tax: number
  shipping_incl_tax: number
  base_shipping_incl_tax: number
  base_currency_code: string
  quote_currency_code: string
  coupon_code: string
  items_qty: number
  items: Item[]
  total_segments: TotalSegment[]
}

export interface TotalSegment {
  code: string
  title: string
  value: number
  extension_attributes?: ExtensionAttributes
  area?: string
}

export interface ExtensionAttributes {
  tax_grandtotal_details: any[]
}

export interface TermsConditionPageType {
  authenticity: any,
  rejectionOfSubmittals: any,
  lossOrDamagToItems: any,
  inspectionOfItem: any,
  servicesTimeOfCompletion: any,
  forfeitureOfItems: any,
  indemnificationReleaseAndLimitationOfDamages: any,
  useOfPhotographs: any,
  actsOfGod: any,
  acknowledgement: any,
  warranty: any
}


export interface GradingScalePageType {
  amgGradingScale: any,
  vinyl: any,
  cassettesCdsAndTracks: any
}


export interface GradingScaleModuleType {
  overallGrade: string,
  numericGrade: number,
  description: any;
  examples: any
}

export interface PrivacyPolicyPageType {
  privacyAndMarketingPolicy: any,
  informationWeMayCollect: any,
  reviewingAndUpdatingYourInformation: any,
  thirdPartyWebsite: any,
  cookies: any,
  security: any,
  useOfSubmissionsForMarketingPurposes: any,
  updatesToOurPrivacyPolicy: any
}


export interface RefusalPolicyPageType {
  ourPolicy: any,
}


export interface ReturnPageType {
  repairPolicy: any,
  contactDescription: any
}