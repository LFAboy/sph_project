export interface Category {
  categoryChild: [];
  categoryId: number;
  categoryName: string;
}

export interface Banner {
  id: string;
  imgUrl: string;
}

export interface Floor {
  id: string;
  name: string;
  keywords: string[];
  imgUrl: string;
  navList: object[];
  carouselList: object[];
  recommendList: string[];
  bigImg: string;
}