<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="sortHide">
        <h2 class="all" @mouseenter="sortShow">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div
              class="all-sort-list2"
              @click="goSearch"
              @mouseleave="restoreColor"
            >
              <!-- 注意那部分结构需要遍历，就把 v-for 放到这个结构的最外层 -->
              <div
                class="item"
                v-for="(item1, index) in categoryList"
                :key="item1.categoryId"
                :class="{ acc: categoryIndex === index }"
              >
                <h3 @mouseenter="changeColor(index)">
                  <a
                    :data-categoryName="item1.categoryName"
                    :data-category1id="item1.categoryId"
                    >{{ item1.categoryName }}</a
                  >
                </h3>

                <!-- 下面这部分是 我们的 二三级分类，控制二三级分类的显示与隐藏可以 通过 CSS(当鼠标悬浮在一级分类时，二三级分类display block)，我们也可以通过 JS 来完成这个需求，注意此处的用法。 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: index === categoryIndex ? 'block' : 'none',
                  }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="item2 in item1.categoryChild"
                      :key="item2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="item2.categoryName"
                          :data-category2id="item2.categoryId"
                          >{{ item2.categoryName }}</a
                        >>
                      </dt>
                      <dd>
                        <em
                          v-for="item3 in item2.categoryChild"
                          :key="item3.categoryId"
                        >
                          <a
                            :data-categoryName="item3.categoryName"
                            :data-category3id="item3.categoryId"
                            >{{ item3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 注意本组件是多个组件共用的组件，我们应该做为全局组件来看待，应该放到 components 文件夹下
import { mapState } from "vuex";

// 从 lodash 中引入 throttle 方法，这个方法是用来 节流的，接收两个参数，第一个参数的我们需要进行节流的函数，第二个参数是每个多长时间执行一次我们传入的这个函数，throttle 函数返回的是一个函数（封装好的函数）。
import throttle from "lodash/throttle.js"; // 此处我们采用按需引入，并没有把整个lodash 全部引入。
// lodash 库，我们已经有了（已有的依赖依赖这个库，所以在创建项目的时候已经下载了）

export default {
  name: "TypeNav",
  data() {
    return {
      categoryIndex: -1, // categoryIndex 我们保持的是 当前鼠标停留的三级联动一级分类的索引，初始值是-1, 这个数据的目的在于实现一个鼠标悬浮在 三级联动的一级分类的时候，这个一级分类的背景颜色变成蓝色，当然我们可以用 :hover实现，此处是为了联系用JS实现
      show: true, // 控制是否显示一级分类的变量
    };
  },
  mounted() {
    // 当三级联组件挂载完毕，我们就应该发送请求，请求三级联动的数据，并渲染。注意：这里请求的数据存储在仓库中。

    // 由于我们发送Ajax请求，是用axios 发送，且本项目中我们对 axios 进行了二次封装,把所有的请求都封装成了API，所以我们只需要调用API
    // 调用即可，当然我们调用API，也不是在此处调用，而是把操作此操作再封装成 actions,并把数据放在 state 中。
    // this.$store.dispatch("categoryList");
    // 注意：上面的三级联动数据请求，放在了 三级联动组件，由于我们每次切换模块，都会导致整个组件所在的父组件也被销毁，而切换后的新组件含有这个三级联动组件，所以三级联动组件又进行了挂载和数据请求，反复的数据请求不利于性能，所以我们只需要请求一次即可，放在 app组件的挂载函数中最合适。

    // 当我们的 三级联组件挂载，我们需要进行判断这个模块是不是home 模块，然后决定是否显示默认 一级分类。
    if (this.$route.path != "/home") {
      // 如果不是 home 模块， 我们就默认隐藏 一级分类
      this.show = false;
    }
  },
  computed: {
    // 注意 mapState 方法的使用，这个方法接收一个参数，参数可以是对象或者是数组。
    ...mapState({
      categoryList: (state) => {
        // 此处我们也可以采用 箭头函数的简写形式
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 注意：这个事件，如果内部业务比较复杂，那么当用户操作比较快时，并不会所有的事件都触发，例：当用户快读划过每一个一级分类，并不会所有的一级分类都会触发这个事件。原因：浏览器执行事件需要时间，也就是操作太快会造成卡顿现象。
    // changeColor 方法 需要进行节流操作。
    changeColor: throttle(function (index) {
      // throttle 函数接收的函数参数，别用箭头函数，如果里面设计 this 会有this 指向的问题。
      this.categoryIndex = index;
    }, 100), // 注意 throttle 函数别忘记传 第二个参数，每隔多少时间执行一次。
    restoreColor() {
      this.categoryIndex = -1;
    },
    goSearch(event) {
      // 注意：这个函数的功能是 当我们点击三级联动的分类的时候，跳转到对应的 search 模块，并把我们的分类名和id 传递过去
      // 为什么不采用声明式路由导航？ 因为此处设计的 分类比较多，如果每个分类都采用声明式路由导航，那么需要创建很多个 router-link，而router-link 是一个组件，创建这么多组件会占用很大的内存，会影响性能，导致卡顿。

      // 所以此处用编程式路由导航，同时由于直接给触发元素绑定事件，那么需要给很大量元素绑定事件，也会影响性能，所以最好的方式是利用事件委派，把事件绑定给这些元素的父元素，这样只需要绑定一次就可以了。但是我们要采取措施辨别我们点击的元素是哪个子元素，
      // 这里判断我们点击的是哪个子元素的方法是 给子元素加 自定义属性，这样我们只需要判断点击的元素的自定义属性，就知道了点击的是哪个子元素

      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      if (categoryname) {
        let routePath = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        routePath.query = query;
        if (this.$route.params) {
          routePath.params = this.$route.params;
        }
        this.$router.push(routePath);

        // 在我们发送Ajax 请求，携带分类的query参数时，我们应该还要考虑，如果有 params 参数应该同时也携带给 服务器（也就是用户先点击分类，再进行搜索的情况）。
      }
    },
    sortShow() {
      // 这个方法的背景: 在我们的 search 模块，也需要用到 三级联动这个组件，不过一级分类默认是隐藏的，当鼠标经过展示，鼠标移除隐藏
      // 不止search 模块，基本上除了 home 模块的三级联动的一级分类是默认展示的，其他的模块一级分类默认都是隐藏的。
      // 解决方案：用 show 变量控制一级分类的显示与隐藏，给 一级分类加 v-show show 为true 就展示，false 就隐藏。而我们根据业务需要来改变show这个变量的值。
      this.show = true;
    },
    sortHide() {
      // 当我们的鼠标 离开“全部商品分类” 时，如果不是 home 模块，那么就隐藏一级分类。
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script> 

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .item.acc {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式，当我们的三级联动在非 home 模块时，我们的一级分类是有显示和隐藏两种效果的，显示与隐藏我们给它加上了过渡效果
    .sort-enter {
      // 注意，我们的过渡规则，是写在 CSS 中的，这里的 sort 并不是元素的类名 sort 而是过渡元素的name属性，指定这个规则是服务于name属性为 sort 的过渡元素的
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all .2s linear;
    }
    .sort-leave {
      height: 461px;
    }
    .sort-leave-to {
      height: 0;
    }
    .sort-leave-active {
      transition: all .2s linear;
    }
  }
}
</style>