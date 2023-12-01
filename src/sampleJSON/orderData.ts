import { ORDER_DETAILS_LABELS } from "../constants/appConstants";

export const orderDataJSON = {
  orderId: "60577546279",
  submittedDate: "2023-05-05 T 08:03:58 AM",
  orderTotal: "34.77",
  status: "160",
  sephOrderStatus: ORDER_DETAILS_LABELS.SHIPPED,
  locale: "US",
  originOfOrder: "Web",
  profileId: null,
  customerInfo: {
    firstName: "SASIDHARAN",
    lastName: "SANAL KUMAR",
    email: "ssk.june8@gmail.com",
    crmId: "2300000092155574",
    profileId: "32785550518",
    biTier: "ROUGE",
  },
  paymentInfo: [
    {
      paymentId: "pg70692890015",
      paymentType: "Credit Card",
      amount: 34.77,
      status: "SETTLE_INIT_RECEIVED",
      paymentCardType: "masterCard",
      thirdPartyType: null,
    },
  ],
  commerceItem: [
    {
      commerceItemId: "ci981634314410",
      catalogRefId: "2031391",
      itemClassType: "SephoraNormalCommerceItem",
      quantity: 2,
      priceInfo: {
        listPrice: "USD 6.00",
        rawTotalPrice: "USD 12.00",
        amount: "USD 8.40",
      },
    },
    {
      commerceItemId: "ci981634314411",
      catalogRefId: "2031409",
      itemClassType: "SephoraNormalCommerceItem",
      quantity: 1,
      priceInfo: {
        listPrice: "USD 8.90",
        rawTotalPrice: "USD 8.90",
        amount: "USD 6.23",
      },
    },
    {
      commerceItemId: "ci981634315043",
      catalogRefId: "2566594",
      itemClassType: "SephoraNormalCommerceItem",
      quantity: 1,
      priceInfo: {
        listPrice: "USD 25.00",
        rawTotalPrice: "USD 25.00",
        amount: "USD 17.50",
      },
    },
    {
      commerceItemId: "ci981634315567",
      catalogRefId: "2437812",
      itemClassType: "SephoraSampleCommerceItem",
      quantity: 1,
      priceInfo: {
        listPrice: "USD 0.00",
        rawTotalPrice: "USD 0.00",
        amount: "USD 0.00",
      },
    },
    {
      commerceItemId: "ci981634315568",
      catalogRefId: "2420651",
      itemClassType: "SephoraSampleCommerceItem",
      quantity: 1,
      priceInfo: {
        listPrice: "USD 0.00",
        rawTotalPrice: "USD 0.00",
        amount: "USD 0.00",
      },
    },
    {
      commerceItemId: "ci981634316187",
      catalogRefId: "2611481",
      itemClassType: "SephoraBiRewardCommerceItem",
      quantity: 1,
      priceInfo: {
        listPrice: "USD 0.00",
        rawTotalPrice: "USD 0.00",
        amount: "USD 0.00",
      },
    },
  ],
};
