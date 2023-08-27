<script setup lang="ts">
import { onMounted } from 'vue';
import { useHomeStore } from '@/store/home';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const homeStore = useHomeStore();

onMounted(() => {
  //当我们的根组件挂载后发送请求，请求三级联动选项卡的数据。
  try {
    homeStore.getCategoryList();
  } catch (error) {
    console.log((error as Error).message);
  }
})
</script>

<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>