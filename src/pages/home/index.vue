<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- 注意v-for 遍历一个空数组的时候，v-for 所在的节点并不会被渲染，就相当于页面中没有这个元素。这里相当于没有子组件 -->
    <Floor v-for="floorData in floorList" :key="floorData.id" :floorData="floorData"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ListContainer from '@/pages/home/list-container';
import Recommend from '@/pages/home/recommend';
import Rank from '@/pages/home/rank';
import Like from '@/pages/home/like';
import Floor from '@/pages/home/floor';
import Brand from '@/pages/home/brand';



export default {
  name: 'HomeIndex',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  mounted() {
    //发送请求，请求 floorList 的数据
    this.$store.dispatch('getFloorList')
  },
}
</script>

<style>

</style>