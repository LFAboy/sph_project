<template>
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ floorData.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li v-for="nav in floorData.navList" :key="nav.text">
              <a :href="nav.url" data-toggle="tab">{{ nav.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in floorData.keywords" :key="index">
                  {{ keyword }}
                </li>
              </ul>
              <img :src="floorData.imgUrl" />
            </div>
            <div class="floorBanner">
              <Carousel :list="floorData.carouselList"></Carousel>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floorData.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floorData.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="floorData.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floorData.recommendList[3]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floorData.recommendList[2]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引包， swiper 的包，swiper 的样式我们在入口文件已经引入过了所以这里不再引用。
// import Swiper from "swiper";
export default {
    name: "Floor",
    props: ["floorData"],
    mounted() {
        // 注意我们的 floor 组件的数据请求为什么不放在 floor 组件？ 因为我们的 floor 组件进行了复用，有两个floor 组件，接口提供的数据是一个数组，里面有两个对象，分别是这两个floor 组件的数据，所以我们应该 把数据请求放 到两个 floor 组件的父组件，然后把请求到的数据发送给子组件。
        // this.$store.dispatch('getFloorList');
        // 为什么 list-container 组件中 创建 swiper 实例，不能直接在Mounted 中写，而floor 组件中创建swiper实例可以呢？
        // 正解：因为在floor 组件中，数据是通过 props 传递过来的，且组件的 beforeCreate钩子会在实例初始化完成、props 解析之后、data() 和 computed 等选项处理之前立即调用。也就是如果 props 没有收到数据，那么并不会开始创建该组件，收到数据后，当mounted 的时候，结构已经有了
        // 所以可以 直接 创建 swiper 实例，而 list-container 组件中，swiper的结构是动态生成的，而数据是在 mounted才请求，所以，这个时候没有数据没有办法生成swiper 的结构，也就不能在 mounted 中直接发送请求了。
        // const mySwiper = new Swiper(this.$refs.floor1Swiper, {
        //     loop: true,
        //     // 如果需要分页器
        //     pagination: {
        //         el: ".swiper-pagination",
        //         clickable: true,
        //     },
        //     // 如果需要前进后退按钮
        //     navigation: {
        //         prevEl: ".swiper-button-prev",
        //         nextEl: ".swiper-button-next",
        //     },
        // });
    },
};
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>