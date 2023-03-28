<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="navShow" @mouseleave="navLeave">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="c1 in categoryList"
              :key="c1['categoryId']"
            >
              <h3>
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2['categoryId']"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="c3 in c2.categoryChild"
                        :key="c3['categoryId']"
                      >
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3id="c3.categoryId"
                          >{{ c3.categoryName }}</a
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
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      show: true,
    };
  },
  // 当组件一挂载完毕，就可以向服务器发送请求，请求这个三级联动的数据
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 对象写法，值是一个函数，当模板中用到这个计算属性时，会执行这个回调函数，并注入一个参数 state 这个参数即为大仓库中的state
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    goSearch(event) {
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        let q = {
          // path:'/search'
          name: "search",
          query:{
            categoryName:categoryname
          }
        };
        if (category1id) {
          q.query.category1Id = category1id
        } else if (category2id) {
          q.query.category2Id = category2id
        } else {
          q.query.category3Id = category3id
        }
        if(this.$route.params) {
          // 如果当前有params 参数，就也合并上
          q.params = this.$route.params;
        }
        this.$router.push(q);
      }
    },
    navShow(){
      this.show = true
    },
    navLeave(){
      if(this.$route.path != '/home'){
        this.show = false
      }
    }
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

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .item:hover {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间和变化速率
    .sort-enter-active{
      transition: all .12s linear;
    }
  }
}
</style>