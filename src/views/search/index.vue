<script setup>
import SearchSelector from './SearchSelector/SearchSelector.vue'
import { reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSearchStore } from '@/store/search';
import emitter from '@/utils/mitt';

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();
const searchParams = reactive({
  category1Id: '',
  category2Id: '',
  category3Id: '',
  categoryName: '',
  keyword: '',
  order: '1:desc',
  pageNo: 1,
  pageSize: 10,
  props: [],
  trademark: '',
})

const total = computed(() => searchStore.searchInfo.total);


// 我们应该把发送请求（请求对应内容的数据），放在 watch 中，因为我们可以在 search 模块不止发送多次请求查询，而放在onMounted中只能发送一次请求。
watch(route, () => {
  getSearchData();
}, { immediate: true })

// 发送请求的方法
function getSearchData() {
  // 每次发送请求前，我们都要清空 category1Id category2Id categoty3Id caegoryName 因为，防止上次残留的数据干扰，这四个数据中只有两个是有效数据，清空后我们再根据路径参数赋值.keyword不用请求，因为后面的赋值会覆盖掉
  searchParams.category1Id = undefined;
  searchParams.category2Id = undefined;
  searchParams.category3Id = undefined;
  searchParams.categoryName = undefined;
  Object.assign(searchParams, route.params, route.query);
  searchStore.getSearchInfo(searchParams);
}

function removeCategoryName() {
  // 如果直接调用 getSearchData() 那么并不会改变路径，所以我们进行路由跳转，可以改变路径，同时当路径改变的时候，会自动的调用 getSearchData 方法，所以只需要改变路径即可。
  if (route.params) {
    router.push({
      name: 'search',
      params: route.params
    })
  }
}
function removeKeyword() {
  // 采用路由跳转既可以改变路径右可以调用 getSearchData 发送请求
  searchParams.keyword = '';
  // 通知兄弟组件把input 框里面的残留给清除了
  emitter.emit('clearInput');
  if (route.query) {
    router.push({
      name: 'search',
      query: route.query
    })
  }
}

function addAttrInfo(attr, attrValue) {
  //接收子组件传递过来的 关于 售卖属性的参数，整理参数然后发送请求
  let attrString = `${attr.attrId}:${attrValue}:${attr.attrName}`;
  if (!searchParams.props.includes(attrString)) {
    searchParams.props.push(attrString);
  }
  getSearchData();
}

function addTradeMark(trade) {
  searchParams.trademark = `${trade.tmId}:${trade.tmName}`;
  getSearchData();
}

function removeTradeMark() {
  searchParams.trademark = '';
  getSearchData();
}

function removeProp(index) {
  searchParams.props.splice(index, 1)
  getSearchData();
}

function changePage(toPage) {
  searchParams.pageNo = toPage;
  getSearchData();
}

function changeOrder(order) {
  let originIndex = searchParams.order.split(":")[0];
  let originSort = searchParams.order.split(":")[1];

  if (order === originIndex) {
    originSort = (originSort === "desc" ? "asc" : "desc");
  }else {
    originIndex = order;
    originSort = 'desc';
  }
  searchParams.order = `${originIndex}:${originSort}`;
  getSearchData();
}

defineOptions({
  name: 'Search'
})
</script>

<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 这个面包屑展示的是 路径query参数中的categoryName -->
            <li class="with-x" v-show="route.query.categoryName">{{ route.query.categoryName }}<i
                @click="removeCategoryName">×</i></li>

            <!-- 这个面包屑展示的是 路径params 参数中的 keyword -->
            <li class="with-x" v-show="route.params.keyword">{{ route.params.keyword }}<i @click="removeKeyword">×</i></li>

            <!-- 这个面包屑展示的是 选中的品牌trademark -->
            <li class="with-x" v-show="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i @click="removeTradeMark">×</i></li>

            <!-- 这个面包屑展示的是我们选中的平台属性 -->
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">
              {{ prop.split(":")[1] }}<i
                @click="removeProp(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @add-attrInfo="addAttrInfo" @add-tradeMark="addTradeMark" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:searchParams.order.includes('1')}"
                @click="changeOrder('1')">
                  <a>综合<span
                      class="iconfont"
                      :class="{
                        'icon-direction-down': searchParams.order.includes('desc'),
                        'icon-direction-up': searchParams.order.includes('asc'),
                      }"
                      v-show="searchParams.order.includes('1')"
                    ></span
                  ></a>
                </li>
                <li
                  :class="{ active: searchParams.order.includes('2') }"
                  @click="changeOrder('2')"
                >
                  <a
                    >价格<span
                      class="iconfont"
                      :class="{
                        'icon-direction-down': searchParams.order.includes('desc'),
                        'icon-direction-up': searchParams.order.includes('asc'),
                      }"
                      v-show="searchParams.order.includes('2')"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in searchStore.goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"><img v-lazy="goods.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ goods.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageContinue="5" :pageSize="searchParams.pageSize" :total="total"
            @change-page="changePage"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>