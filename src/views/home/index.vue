<script setup>
import ListContainer from '@/views/home/list-container/index.vue'
import Recommend from '@/views/home/recommend/index.vue'
import Rank from '@/views/home/rank/index.vue'
import Like from '@/views/home/like/index.vue'
import Floor from '@/views/home/floor/index.vue'
import Brand from '@/views/home/brand/index.vue';
import { onBeforeMount } from 'vue'
import { useHomeStore } from '@/store/home'

const homeStore = useHomeStore();

onBeforeMount(() => {
  try {
    homeStore.getFloorList();
  } catch (error) {
    console.log(error.message);
  }
})

defineOptions({
  name: 'Home'
})
</script>

<template>
  <TypeNav></TypeNav>
  <ListContainer></ListContainer>
  <Recommend></Recommend>
  <Rank></Rank>
  <Like></Like>
  <Floor v-for="floorData in homeStore.floorList" :key="floorData.id" :floorData="floorData"></Floor>
  <Brand></Brand>
</template>


<style>

</style>