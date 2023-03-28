<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImage, index) in skuImageList" :key="index">
        <img :src="skuImage.imgUrl" :class="{active:index == RedIndex}" @click="changeIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    data(){
      return{
        RedIndex:0
      }
    },
    props:['skuImageList'],
    watch:{
      // 监听数据, watch 的功能就是监听数据，此处当有数据后，再调用方法$nextTick()更新一下DOM，就可以创建swiper实例了
      skuImageList(){
        // 当执行时，只可以保证一定有数据了，但是不能保证有解构了
        this.$nextTick(()=> {
          new Swiper(this.$refs.cur,{
          // 如果需要前进后退按钮
          navigation:{
            nextEl:'.swiper-button-next',
            prevEl:'.swiper-button-prev',
          },
          // 轮播图中一次显示几个图片的数量, 默认为 1
          slidesPerView: 3,

          // 每次切换图片的数量，默认为 1
          slidesPerGroup:1
        });
        })
      }
    },
    methods:{
      changeIndex(index){
        this.RedIndex = index;
        this.$bus.$emit('getIndex', this.RedIndex)
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>