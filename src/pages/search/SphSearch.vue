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
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTradeMark">×</i></li>
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{attrValue.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isOne}" @click="changeOrder(1)">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-sort-down':isDesc, 'icon-sort-up':isAsc}"></span></a>
                </li>
                <li :class="{active: isTwo}" @click="changeOrder(2)">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-sort-down':isDesc, 'icon-sort-up':isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!--  在路由跳转的时候注意带参数id -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{goods.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{goods.title}}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <PaginationIndex :pageNo="searchParams.pageNo" :total="total" :pageSize="searchParams.pageSize" :continues="5"
            @getPageNo="getPageNo"></PaginationIndex>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState} from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "SphSearch",
  data(){
    return{
      // 带给服务器的参数
      searchParams:{
        // 一级分类的id
        category1Id:'',
        // 二级分类的id
        category2Id:'',
        // 三级分类的id
        category3Id:'',
        // 分类的名字
        categoryName:'',
        // 关键字
        keyword:"",
        // 排序  有初始的数据： 综合降序
        order:"1:desc",
        // 当前的页码
        pageNo: 1,
        // 每一页展示的数据个数
        pageSize: 10,
        // 平拍售卖商品的属性
        props:[],
        // 品牌
        trademark:""
      }
    }
  },
  components: {
    SearchSelector,
  },
  beforeMount(){
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    // Object.assign() 方法 是用来合并对象的。
  },
  mounted() {
    // 在发送请求之前把参数也一起带给服务器（把searchParams 变化后的值带给服务器）
    this.getData();
  },
  watch:{
    $route(){
      // 在更新 参数之前，应该把 上一次的id 参数至空，以防有多个id 发送给服务器
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 注意虽然 在 beforeMount 我们已经更新一次参数了，但是 beforeMount 只执行一次后续的就不会再自动更新了
      this.getData()
    }
  },
  computed: {
    ...mapGetters(['goodsList']),
    ...mapState({
      total: state => state.search.searchList.total
    }),
    isOne(){
      return this.searchParams.order.split(':')[0] == 1
    },
    isTwo(){
      return this.searchParams.order.split(':')[0] == 2
    },
    isAsc(){
      return this.searchParams.order.split(':')[1] == 'asc'
    },
    isDesc(){
      return this.searchParams.order.split(':')[1] == 'desc'
    },
  },
  methods:{
    // 向服务器发送请求获取 search 模块数据，（根据参数不同返回不同的数据进行展示）
    // 把这次的请求封装成一个函数：当你需要在调用的时候调用即可。
    getData(){
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeCategoryName(){
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 如果为 undefined 那么带给服务器的参数中就不会有这个字段了，能减小带宽提高性能
      this.getData()
      // 地址栏也需要改：进行路由跳转
      if(this.$route.params) this.$router.push({'name':'search', 'params': this.$route.params})
    },
    removeKeyword(){
      this.searchParams.keyword = undefined

      // 再次发送请求
      this.getData()
      // 通知兄弟组件 Header 组件清除 input 框中的关键字
      this.$bus.$emit('clear')
      // 进行路由的跳转
      if(this.$route.query) this.$router.push({'name': 'search', 'query': this.$route.query})
    },
    // 自定义事件的回到
    trademarkInfo(trademark){
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再发请求
      this.getData()
    },
    removeTradeMark(){
      this.searchParams.trademark = undefined
      //再发请求
      this.getData()
    },
    // 自定义事件 收集平台属性地方回调函数
    attrInfo(attr, attrValue){
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if(this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props);
      // 再发请求
      this.getData()
    },
    // 删除售卖的属性
    removeAttr(index){
      // 再次整理参数
      this.searchParams.props.splice(index, 1)
      // 再发请求
      this.getData()
    },
    changeOrder(flag){
      let orderFlag = this.searchParams.order.split(":")[0];
      let orderSort = this.searchParams.order.split(":")[1];

      if(flag == orderFlag){
        orderSort = (orderSort == 'asc' ? 'desc':'asc');
      }else{
        orderFlag = flag;
        orderSort = 'desc'
      }
      this.searchParams.order = `${orderFlag}:${orderSort}`
      this.getData()
    },
    // 自定义事件：用于收集分页器中的最近的当前页码，这样下次向服务器请求时，可以更新请求的页码
    getPageNo(pageNo){
      this.searchParams.pageNo = pageNo;
      // 再次发请求
      this.getData()
    }
  }
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