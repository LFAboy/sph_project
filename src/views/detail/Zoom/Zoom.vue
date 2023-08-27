<script setup>
import emitter from '@/utils/mitt';
import { ref, toRefs, onUnmounted, computed} from 'vue';

const props = defineProps({
  skuImageList: {
    type: Array,
    default: []
  }
});
const { skuImageList } = toRefs(props);
const mask = ref(null);
const bigImg = ref(null);
const showIndex = ref(0);
const currentImg = computed(() => {
  return skuImageList.value[showIndex.value] || {}
})

function preViewImg(event) {
  let left = event.offsetX - mask.value.offsetWidth / 2;
  let top = event.offsetY - mask.value.offsetHeight / 2;
  if (left < 0) left = 0;
  if (top < 0) top = 0;
  if (left > mask.value.offsetWidth) left = mask.value.offsetWidth;
  if (top > mask.value.offsetHeight) top = mask.value.offsetHeight;

  mask.value.style.left = left + 'px';
  mask.value.style.top = top + 'px';

  bigImg.value.style.left = -2 * left + 'px';
  bigImg.value.style.top = -2 * top + 'px';
}

emitter.on('changeBig', index => {
  showIndex.value = index;
});

onUnmounted(() => {
  emitter.off('changeBig');
})
</script>

<template>
  <div class="spec-preview">
    <img :src="currentImg.imgUrl" />
    <div class="event" @mousemove="preViewImg"></div>
    <div class="big">
      <img :src="currentImg.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>


<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>