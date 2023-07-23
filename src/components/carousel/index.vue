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
// import Swiper from "swiper";
import Swiper from 'swiper';
export default {
  name: "Carousel",
  props: ["list"],
  mounted() {
    // 当我们组件挂载的时候就 生成 swiper 实例，形成轮播图.
    // 此处可以在 mounted 中直接写当挂载的时候就创建swiper 实例，因为我们这个组件的数据是由父通过 props给的，
    // 在 props 没有解析前是不会执行 beforeCreate 的。

    // const mySwiper = new Swiper(this.$refs.cur, {
    //   loop: true,
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    //   },
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    // });
  },
  watch: {
    // 监听 list 数据的变化: 这个数据会发送变化
    list: {
      // 这里为什么需要立即监听一下？在list-container组件中不需要立即监听，而floor组件中使用时需要立即监听。
      // 原因：在home(floor父组件)组件中，如果floorData 为空数组，就不会有floor组件，所以当floor组件渲染的时候就已经有了数据，有数据后floor组件传递给子组件 carousel 这个组件拿到的数据就一直未发送改变，所以监听无效，我们需要立即监听一下。注意v-for 遍历一个空数组的时候，v-for 所在的节点并不会被渲染，就相当于页面中没有这个元素。而在list-container 组件中，数组第一次传递给carousel 传递的是空数组，当list-container组件中请求的数据返回后，就会更新传递给 carousel 组件的数据，所以不需要立即监听。
      immediate: true,
      handler() {
        // 如果执行这个 handler 方法，代表 list 数据已经从服务器返回了
        this.$nextTick(() => {
          // 当执行这个回调的时候，DOM已经异步更新完毕，v-for执行完毕，轮播图结构一定有了
          // eslint-disable-next-line no-unused-vars
          let mySwiper = new Swiper(this.$refs.cur, {
            // 这里可以不使用变量 mySwiper 来接受创建的swiper 实例，因为这个变量没用到
            // 轮播图的图片是否循环，不循环那么到最后，就不能再往右了
            loop: true,
            // 如果需要分页器，也就是轮播图下面的小点点
            pagination: {
              el: ".swiper-pagination",
              // 点击小球的时候也切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>