<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <RankIndex></RankIndex>
    <LikeIndex></LikeIndex>
    <FloorIndex v-for="(floor) in floorList" :key="floor.id" :list="floor"></FloorIndex>
    <BrandIndex></BrandIndex>
  </div>
</template>

<script>
import ListContainer from '@/pages/home/list-container/ListContainer'
import TodayRecommend from '@/pages/home/today-recommend/TodayRecommend'
import RankIndex from '@/pages/home/rank/RankIndex'
import LikeIndex from '@/pages/home/like/LikeIndex'
import FloorIndex from '@/pages/home/floor/FloorIndex'
import BrandIndex from '@/pages/home/brand/BrandIndex'

// 导入仓库中的数据
import {mapState} from 'vuex';
export default {
  name:"SphHome",
  components:{
    ListContainer,
    TodayRecommend,
    RankIndex,
    LikeIndex,
    FloorIndex,
    BrandIndex
  },
  mounted(){
    this.$store.dispatch('getFloorList');
  },
  computed:{
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>