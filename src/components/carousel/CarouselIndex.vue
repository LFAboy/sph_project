<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "CarouselIndex",
  props:['list'],
  watch:{
    // 监听 bannerList 数据的变化: 这个数据会发送变化
    bannerList:{
      immediate: true,
      handler(){
        // 如果执行这个 handler 方法，代表bannerList 数据已经从服务器返回了
        this.$nextTick(()=>{
          // 当执行这个回调的时候，DOM已经异步更新完毕，v-for执行完毕，轮播图结构一定有了
          // eslint-disable-next-line no-unused-vars
          let mySwiper = new Swiper(this.$refs.cur,{
            // 这里可以不使用变量 mySwiper 来接受创建的swiper 实例，因为这个变量没用到
          // 轮播图的图片是否循环，不循环那么到最后，就不能再往右了
          loop: true,
          // 如果需要分页器，也就是轮播图下面的小点点
          pagination:{
            el: '.swiper-pagination',
            // 点击小球的时候也切换图片
            clickable:true
          },
          // 如果需要前进后退按钮
          navigation:{
            nextEl:'.swiper-button-next',
            prevEl:'.swiper-button-prev',
          },
        });
        })
      }
    }
  }
};
</script>

<style>
</style>