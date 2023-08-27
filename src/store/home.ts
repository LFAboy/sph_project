import { defineStore } from "pinia";
import { reqCategoryList, reqBnnerList, reqFloorList} from '@/api'
import { ref } from 'vue';
import { Category, Banner, Floor } from '@/models/home'

export const useHomeStore = defineStore('home', () => {
  // 获取categoryList数据
  const categoryList = ref<Category[]>([]);
  async function getCategoryList() {
    let result = await reqCategoryList();
    if (result.code === 200) {
      categoryList.value = result.data;
    }
  };


  // 获取 bannerList 数据
  const bannerList = ref<Banner[]>([]);
  async function getBannerList() {  
    let result = await reqBnnerList();
    if (result.code === 200) {
      bannerList.value = result.data;
    }
  }

  // 获取 floorList数据
  const floorList = ref<Floor[]>([]);
  async function getFloorList() {
    let result = await reqFloorList();
    if (result.code === 200) {
      floorList.value = result.data;
    }
  }

  return {
    categoryList, getCategoryList,
    bannerList, getBannerList,
    floorList,  getFloorList,
  }
})