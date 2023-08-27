export interface ShopCart {
  id: number;
  used: string;
  skuId: number;
  cartPrice: number;
  skuNum: number;
  imgUrl: string;
  skuName: string;
  isChecked: number;
  skuPrice: number;
}

export interface SubmitOrderQuery {
  consignee: string;
  consigneeTel: string;
  deliveryAddress: string;
  paymentWay: string;
  orderComment: string;
  orderDetailList: [];
}