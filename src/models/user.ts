export interface RegisterQuery {
  phone: string;
  password: string;
  code: string;
}

export interface LoginQuery {
  phone: string;
  password: string;
}

export interface Address {
  consignee: string;
  fullAddress: string;
  id: number;
  isDefault: string;
  phoneNum: string;
  provinceId: number;
  regionId: number;
  userAddress: string;
  userId: number;
}