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

<script>
  export default {
    name: "Zoom",
    props: ['skuImageList'],
    data() {
      return {
        currentIndex: 0
      }
    },
    computed: {
      currentImg() {
        return this.skuImageList[this.currentIndex] || {};
      }
    },
    beforeMount() {
      this.$bus.$on('changeBig', this.changeBig);
    },
    methods: {
      changeBig(index) {
        // 这个事件，是当我们点击大图下面的小图时，更新上面的大图，与我们选中的图片保持一致。
        this.currentIndex = index
      },
      preViewImg(event) {
        // 这个方法是 当鼠标在 图片上移动，预览大图的时候触发。
        const mask = this.$refs.mask;
        const bigImg = this.$refs.bigImg;

        let left = event.offsetX - mask.offsetWidth / 2;
        let top = event.offsetY - mask.offsetHeight / 2;

        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (left > mask.offsetWidth) left = mask.offsetWidth;
        if (top > mask.offsetHeight) top = mask.offsetHeight
        // 把鼠标距离图片边框的距离赋值给 遮罩层
        mask.style.left = left + 'px';
        mask.style.top = top + 'px';

        bigImg.style.left = -2 * left + 'px';
        bigImg.style.top = -2 * top + 'px';
        // up: 注意上面是 -2 倍的；
      }
    }
  }
</script>

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