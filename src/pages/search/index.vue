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
            <!-- 这个面包屑展示的是 路径中query参数的 categoryName -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 这个面包屑展示的是 路径中params 参数的 keyword -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 这个面包屑展示的是 我们选中的 品牌 trademark -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTradeMark">×</i>
            </li>
            <!-- 这个面包屑展示的是 选中的平台属性 -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}<i @click="removeAttrInfo(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @addTradeMark="addTradeMark"
          @addAttrInfo="addAttrInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: order.includes('1') }"
                  @click="changeOrder('1')"
                >
                  <a
                    >综合<span
                      class="iconfont"
                      :class="{
                        'icon-direction-down': order.includes('desc'),
                        'icon-direction-up': order.includes('asc'),
                      }"
                      v-show="order.includes('1')"
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
                        'icon-direction-down': order.includes('desc'),
                        'icon-direction-up': order.includes('asc'),
                      }"
                      v-show="order.includes('2')"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to='`/detail/${goods.id}`'>
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Pagination
          :pageNo="searchParams.pageNo"
          :total="total"
          :pageSize="searchParams.pageSize"
          :pageContinue="5"
          @changePage="changePage"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      // searchParams 数据保存的是我们每次发送 search 请求所需要传递的参数，由于我们可以发送多次search 请求，且每次请求的参数
      // 不一样，所以我们准备一个变量保存最新的参数，发送请求的时候携带这个变量就可以了，如果我们的参数需要变化就变更这里的变量
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc", // 这个与我们请求回来的数据排序有关
        pageNo: 1, // 这个是我们分页器的参数
        pageSize: 10,
        props: [],
        trademark: "",
        // 我们每次发送请求都需要携带这十个参数，如果有的参数没有值就携带默认值，后台会做处理，这里我们前台不做处理
      },
    };
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
    order() {
      return this.searchParams.order;
    },
  },
  beforeMount() {
    // 在这里我们整理getSearchData的参数
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.keyword = this.$route.params.keyword;
    // 我们利用 Object.assign() 方法把 路由query、params对象上与 searchParams 对象上有相同属性名的属性值赋值给 searchParams对象
    // Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 在我们发送请求前先整理参数。
    // this.getSearchData();
    // up: 关于上述的 beforeMounte 和 mounted 中 写的在组件挂载的时候发送一次请求，我们可以通过配置监视属性，立即执行一次来解决。
  },
  methods: {
    // 这个方法获取search 模块的数据
    getSearchData() {
      // 每次发送后，我们都要清空 category1Id category2Id category3Id categotyName这四个参数，然后再根据路由参数重新给这四个参数赋值。原因：每次发送请求的时候，只有其中二个参数为有效参数，
      // 其余的参数会干扰我们的搜索结果，且逻辑上不应该携带，所以我们清空，防止有上一次请求参数的残留
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      // UP: 清空 categoryId 我们用 undifined 比空字符串的好处是： undefined 不会在发送请求的时候携带这个参数，有助于减小带宽。
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeCategoryName() {
      // 这个方法是 删除 面包屑中的 categoryName 时触发的; 我们要完成的逻辑，清空searchParamms.categoryName 同时改变路径再发发送请求
      // 由于我们封装的方法 getData 发送请求，每次发送请求前都会整理参数，把categoryId categoryName 清空然后根据路由的参数填充 searchParams 中的 categoryId 和 categoryName, 所以我们这里只需要进行路由跳转（同时改变参数）即可。

      if (this.$route.params) {
        // 如果有params 参数，那么我们再发发送请求的时候应该也带上这个参数
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      }
    },
    removeKeyword() {
      // 这个方法是 当删除面包屑中的 keyword 面包屑的时候触发; 我们要实现的逻辑：清除 searchParams中的 keyword,清空 input 输入框的值，改变路径发送请求（注意别忘了携带query参数）。
      this.searchParams.keyword = "";
      // 我们清空 input 输入框的值由于 input 在兄弟组件 header中，我们采用 $bus 清除。
      this.$bus.$emit("clearInput");
      if (this.$route.query) {
        // 判断条件 为 this.$route.query 一直为真，空对象也为真，只不过空对象时，并不会携带上做为参数发送给 服务器。
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
    },
    removeTradeMark() {
      // 这个方法是 当我们触发 删除 面包屑中的 trademark 面包屑时触发。逻辑：清除这个面包屑，再次发送请求，不携带这个trademark参数。
      this.searchParams.trademark = "";
      this.getSearchData();
    },
    removeAttrInfo(index) {
      this.searchParams.props.splice(index, 1);
      this.getSearchData();
    },
    addTradeMark(trade) {
      // 这个是一个自定义事件触发的 回调，用于接收子组件， 传递过来的 trademark 参数。
      this.searchParams.trademark = `${trade.tmId}:${trade.tmName}`;
      this.getSearchData();
    },
    addAttrInfo(attr, attrValue) {
      //接收子组件传递过来的 关于 售卖属性的参数，整理参数然后发送请求
      let attrString = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (!this.searchParams.props.includes(attrString)) {
        this.searchParams.props.push(attrString);
      }
      this.getSearchData();
    },
    changeOrder(index) {
      // 先拿当前的 order的 综合还是价格，升序还是降序
      let originIndex = this.order.split(":")[0];
      let originSort = this.order.split(":")[1];
      if (index === originIndex) {
        originSort = originSort === "desc" ? "asc" : "desc";
      } else {
        originIndex = originIndex === "1" ? "2" : "1";
        originSort = "desc";
      }
      this.searchParams.order = `${originIndex}:${originSort}`;
      this.getSearchData();
    },
    changePage(pageNo) {
      //这个方法是自定义事件的回调，用于接收子组件传递过来的页码的改变

      // 整理参数，重新发送请求
      this.searchParams.pageNo = pageNo;
      this.getSearchData();
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        // 如果路径发生变化 那么我们就再次发送 getSearchData 请求，发请求前先整理参数
        this.getSearchData();
        // console.log('$route watch执行了一次，这个一上来也会执行一次');
      },
    },
  },
};
</script>

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
    }
  }
}
</style>