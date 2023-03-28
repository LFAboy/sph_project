<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show='$route.meta.isShowFooter'></Footer>
  </div>
</template>

<script>
import Header from './components/header/HeaderIndex'
import Footer from './components/footer/FooterIndex'

export default {
  name: 'App',
  data(){
    return {}
  },
  components: {
    Header,Footer
  },
  mounted(){
    // 通知 Vuex 发送请求，把请求的数据存放在对应的仓库中，并在上面的结构中使用仓库中的数据。
    this.$store.dispatch("categoryList");
    
  }
}
</script>

<style>
</style>
