<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked($event, cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeNum('mins', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="changeNum('input', $event.target.value, cart.skuId)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeNum('plus', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteGoods(cart)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length>0" @change="changeAllChecked($event)"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalMoney }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { debounce } from "lodash";
export default {
  name: "ShopCart",
  data() {
    return {
      flag: true,
    };
  },
  mounted() {
    // 挂载是时候发送请求，请求购物车是数据
    this.getCartList();
  },
  computed: {
    ...mapGetters(["cartInfoList"]),
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
      // up: 数组的 every 方法返回的是布尔值，让每次遍历返回的结果是 true 时，整体的结果就是 true 如果有一个返回 false 那么就是false
      //这里采用了 函数的简写形式。
    },
    totalMoney() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
  },
  methods: {
    getCartList() {
      // 这个方法是发送请求，获取 shopCart 模块最新的数据
      this.$store.dispatch("getShopCartList");
    },
    changeNum: debounce(async function (type, disNum, cart) {
      // 这个方法是当我们改变购物车中的商品的 数量时触发。
      // 这个方法需要实现的逻辑： 判断时那个元素触发的事件，然后整理参数，发送请求（两个，一个是告诉服务器更改了数量，另一个是拿最新的购物车数据）.参数：商品的ID，商品数量的变化量，请求接口是/api/cart/addToCart/{ skuId }/{ skuNum }
      // 这个函数接收的三个参数中，第一个参数标识是哪个元素触发的这个事件，第二个参数是变化量（如果是Input触发的那么是变化后未经处理的input的value），第三个参数是我们变化商品的信息
      let skuId = cart.skuId;
      switch (type) {
        case "mins": {
          disNum = cart.skuNum < 2 ? 0 : -1;
          break;
        }
        case "input": {
          if (isNaN(disNum * 1)) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) <= 0 ? 0 : parseInt(disNum) - cart.skuNum;
          }
          break;
        }
        case "plus": {
          disNum = 1;
          break;
        }
      }
      // 发送请求。告诉服务器更改了数量
      if (disNum !== 0) {
        // 如果数量没有更改那么就不发请求
        try {
          await this.$store.dispatch("addUpdateGoods", {
            skuId,
            skuNum: disNum,
          });
          // 发送请求，获取最新的购物车数据
          this.getCartList();
          this.flag = true;
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert("更改失败！");
      }
    }, 1000),
    async updateChecked(event, cart) {
      // 点击商品选中状态的更新方法
      event.target.checked ? cart.isChecked = '1' : cart.isChecked = '0';
      try {
        await this.$store.dispatch('updateChecked', {skuId: cart.skuId, isChecked: cart.isChecked});
        // 更新成功后发送请求获取最新的购物车数据进行展示。
        this.getCartList();
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteGoods(cart) {
      // 点击删除某个商品的方法
      try {
        await this.$store.dispatch('clearGoods', cart.skuId);
        // 如果删除成功，那么就再次发送请求获取最新的购物车列表
        this.getCartList();
      } catch (error) {
        alert(error.message)
      }
    },
    async changeAllChecked(event) {
      // 点击全选的处理
      let isChecked = event.target.checked ? '1' : '0';;  
      try {
        // console.log(this.$store.dispatch('changeAllChecked', isChecked));
        await this.$store.dispatch('changeAllChecked', isChecked);
        this.getCartList();
      } catch (error) {
        alert('全选更新失败')
      }
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>