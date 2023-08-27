export interface SearchParam {
  category1Id: string;
  category2Id: string;
  category3Id: string;
  categoryName: string;
  keyword: string;
  order: string;
  pageNo: number;
  pageSize: number;
  props: string[];
  trademark: string;
}

export interface SearchInfo {
  trademarkList: object[];
  attrsList: object[];
  goodsList: object[];
  total: number;
  pageSize: number;
  pageNo: number;
  totalPages: number;
}