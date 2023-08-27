<script setup>
// 在Vue3中自己封装轮播图组件尝试2
import { ref, watch, toRefs, nextTick, onUnmounted } from 'vue';

const props = defineProps(['list']);
const { list } = toRefs(props);
let index = ref(0);  // 记录当前展示图片的索引从0开始
let slideLength = ref(0);  // 初始化slide 的长度

const circleParent = ref(null);
const slideParent = ref(null);
let timer = null; // 初始化一个变量用来保存计时器。

const unitLength = ref(0);// 定义一个单位长度，指定图片每次移动的单位长度。
// unitLength = slideParent.value.

watch(list, () => {
  unitLength.value = slideParent.value.offsetWidth / 8;
  nextTick(() => {
    slideLength.value = slideParent.value.children.length;
    circleParent.value.children[0].classList.add('active');

    const newDom = slideParent.value.children[0].cloneNode(true);
    slideParent.value.appendChild(newDom);

    timer = setInterval(() => {
      next();
    }, 2000);
  })
})

onUnmounted(() => {
  clearInterval(timer);
})

function next() {
  try {
    if (index.value >= slideLength.value) {
    index.value = 0;
    slideParent.value.style.transitionDuration = '0s';
    slideParent.value.style.left = -index.value * 730 + 'px';
    setTimeout(() => {
      next();
    }, 0);
  } else {
    index.value++;
    slideParent.value.style.transitionDuration = '.4s';
    slideParent.value.style.left = -index.value * 730 + 'px';
    changeCircle(index.value);
  }
  } catch (error) {
   console.error(error); 
  }
}

function toPrevious() {
}

function changeCircle(activeIndex) {
  for (let i = 0; i < slideLength.value; i++) {
    circleParent.value.children[i].classList.remove('active')
  }
  if (activeIndex == slideLength.value) {
    activeIndex = 0;
  }
  circleParent.value.children[activeIndex].classList.add('active')
}

function mouseEnter() {
  clearInterval(timer);
}
function mouseLeave() {
  timer = setInterval(() => {
    next();
  }, 2000);
}
</script>

<template>
  <div class="container" @mouseleave="mouseLeave">
    <span @click="toPrevious" class="iconfont icon-xiangzuo1"></span>
    <span @click="next" class="iconfont icon-xiangyou1"></span>

    <ul @mouseenter="mouseEnter" class="slideParent" ref="slideParent">
      <li class="slide" v-for="slide in list" :key="slide.id">
        <img :src="slide.imgUrl">
      </li>
    </ul>
    <div class="circleParent" ref="circleParent">
      <span v-for="circle in list" :key="circle.id"></span>
    </div>
  </div>
</template>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .iconfont {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }

  .icon-xiangzuo1 {
    left: 0;
  }

  .icon-xiangyou1 {
    right: 0;
  }

  .slideParent {
    position: absolute;
    display: flex;
    width: 800%;
    height: 100%;
    left: 0px;
    // transition: left .4s ease-out;

    .slide {
      display: block;
      width: 12.5%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .circleParent {
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);

    span {
      width: 10px;
      height: 10px;
      background-color: rgba(246, 244, 244, .3);
      margin: 0 5px;
      border-radius: 50%;
    }

    .active {
      background-color: rgb(250, 247, 247);
    }
  }
}
</style>