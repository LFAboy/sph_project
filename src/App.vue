<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter"></Footer>
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  name: "rootCp",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 三级联动的数据请求，由于三级联动是一个全局组件，多个模块需要用到，而模块之间切换的时候，就会销毁和挂载，所以把请求放到这里更合适，请求数就降到了 1
    this.$store.dispatch("categoryList");
  },
  beforeDestroy() {
    removeToken();
  }
}; 
</script>

<style>
</style>