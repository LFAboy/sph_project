<script setup>
import { useHomeStore } from '@/store/home';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
// import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';

const sortShow = ref(true);
// 为什么使用 JS 交互来控制sort 分类的显示与隐藏，因为用hover 控制的话，当鼠标移除 all去查看 具体的分类的时候，具体的分类就会隐藏。所以只能用 JS 控制。

const homeStore = useHomeStore();
const { categoryList } = storeToRefs(homeStore);

const router = useRouter();
const route = useRoute();

// console.log(route, 'route');

function sortHide() {
  if (route.path != '/home') {
    sortShow.value = false;
  }
}

function goSearch(event) {
  let routePath = {
    name: 'search',
    query: {
      categoryName: ''
    },
  }
  let { category1id, category2id, category3id, categoryname } = event.target.dataset;
  if (categoryname) {
    routePath.query.categoryName = categoryname;

    if (category1id) {
      routePath.query.category1Id = category1id;
    } else if (category2id) {
      routePath.query.category2Id = category2id;
    } else {
      routePath.query.category3Id = category3id;
    }

    // 如果当前有 params 参数那么也加上 params 参数是 搜索框内的keyword
    if (route.params) {
      routePath.params = route.params;
    }
  }

  // 发送 search 请求
  router.push(routePath);
}

onMounted(() => {
  if (route.path != '/home') {
    sortShow.value = false;
  }
})
</script>

<template>
  <div class="type-nav">
    <div class="container" @mouseleave="sortHide">
      <h2 class="all" @mouseenter="sortShow = true">全部商品分类</h2>
      <nav class="nav">
        <a>服装城</a>
        <a>美妆馆</a>
        <a>尚品汇超市</a>
        <a>全球购</a>
        <a>闪购</a>
        <a>团购</a>
        <a>有趣</a>
        <a>秒杀</a>
      </nav>
      <div class="sort" v-show="sortShow">
        <div @click="goSearch" class="all-sort-list2">
          <div class="item" v-for="item1 in categoryList" :key="item1.categoryId">
            <h3 :data-categoryName="item1.categoryName" :data-category1id="item1.categoryId">
              <a :data-categoryName="item1.categoryName" :data-category1id="item1.categoryId">{{ item1.categoryName }}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore" v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                  <dt>
                    <a :data-categoryName="item2.categoryName" :data-category2id="item2.categoryId">{{ item2.categoryName
                    }}</a>
                  </dt>
                  <dd>
                    <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                      <a :data-categoryName="item3.categoryName" :data-category3id="item3.categoryId">{{
                        item3.categoryName }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


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

    // .all:hover ~ .sort {
    //   display: block;
    // }

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
      // display: none;
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
            cursor: pointer;

            a {
              color: #333;
              text-decoration: none;
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
                  cursor: pointer;

                  a:hover {
                    color: #e1251b;
                  }
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
                    cursor: pointer;

                    a:hover {
                      color: #e1251b;
                    }
                  }
                }
              }
            }
          }

          &:hover {
            h3 {
              background-color: #e1251b;

              a {
                color: #fafafa;
              }
            }

            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>