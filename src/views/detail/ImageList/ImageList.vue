<script setup>
import Swiper from 'swiper'
import { ref, toRefs, watch, nextTick } from 'vue';
import emitter from '@/utils/mitt';

const props = defineProps(['skuImageList']);
const { skuImageList } = toRefs(props);
const swiperContainer = ref(null);

watch(skuImageList, () => {
  nextTick(() => {
    new Swiper(swiperContainer.value, {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      slidesPerView: 3
    })
  })
})

function changeBig(index) {
  emitter.emit('changeBig', index);
}

</script>

<template>
  <div class="swiper-container" ref="swiperContainer">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" @click="changeBig(index)" >
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>


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

      &:hover {
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