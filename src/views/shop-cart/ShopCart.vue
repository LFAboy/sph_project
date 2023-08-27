<script setup>
import { onMounted, computed } from 'vue';
import { useShopCartStore, } from '@/store/shopCart';
import { throttle } from 'lodash';
import { storeToRefs } from 'pinia'

const shopCartStore = useShopCartStore();
const { getShopCartList, addUpdateGoods, deleteGoods } = shopCartStore;
const { shopCartList, } = storeToRefs(shopCartStore);
const cartInfoList = computed(() => {
  let cartInfoObj = shopCartList.value[0] || {};
  return cartInfoObj.cartInfoList || []
})
const isAllChecked = computed(() => {
  return cartInfoList.value.every(item => item.isChecked == 1)
});
const totalPrice = computed(() => {
  let sum = 0;
  cartInfoList.value.forEach(item => {
    if (item.isChecked == 1) {
      sum += item.skuPrice * item.skuNum;
    }
  })
  return sum;
})

async function updateChecked(event, cart) {
  event.target.checked ? cart.isChecked = 1 : cart.isChecked = 0;
  try {
    await shopCartStore.updateChecked(cart.skuId, cart.isChecked);
    getShopCartList();
  } catch (error) {
    alert(error.message);
    return Promise.reject(new Error('操作失败！'));
  }
}

const changeNum = throttle(async function (flag, disNum, cart) {
  switch (flag) {
    case 'mins':
      disNum = cart.skuNum > 1 ? -1 : 0;
      break;
    case 'plus':
      disNum = 1;
      break;
    case 'change':
      if (isNaN(disNum) || disNum < 1) {
        disNum = 0;
      } else {
        disNum = parseInt(disNum) - cart.skuNum;
      }
      break;
  }

  try {
    await addUpdateGoods(cart.skuId, disNum);
    getShopCartList();
  } catch (error) {
    alert(error.message);
  }
}, 1100);

async function deleteCartById(cart) {
  try {
    await deleteGoods(cart.skuId);
    getShopCartList();  // 删除成功后就重新发送请求获取最新数据
  } catch (error) {
    alert(error.message);
    return Promise.reject(new Error('删除失败！'))
  }
}

async function updateAllCartChecked(event) {
  try {
    let isChecked = event.target.checked;
    isChecked = isChecked ? 1 : 0;
    let promiseArr = [];
    cartInfoList.value.forEach(item => {
      promiseArr.push(shopCartStore.updateChecked(item.skuId, isChecked));
    })
    await Promise.all(promiseArr);
    getShopCartList();
  } catch (error) {
    alert(error.message)
    return Promise.reject(new Error('全选或全不选操作失败!'))
  }
}

async function deleteAllCheckedCart() {
  try {
    let promiseArr = [];
    cartInfoList.value.forEach(item => {
      if (item.isChecked == 1) {
        promiseArr.push(deleteGoods(item.skuId));
      }
    })
    await Promise.all(promiseArr);
    getShopCartList();
  } catch (error) {
    alert(error.message);
    return Promise.reject(new Error('全选删除失败！'))
  }
}

onMounted(() => {
  try {
    getShopCartList();
  } catch (error) {
    console.log('获取购物车列表数据失败', error.message);
  }
})

</script>

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
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked($event, cart)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="changeNum('mins', -1, cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="text"
              @change="changeNum('change', $event.target.value * 1, cart)">
            <a class="plus" @click="changeNum('plus', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a>移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
a {
  cursor: pointer;
}

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

      &>div {
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

        &>li {
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

          a:hover {
            color: #c81623;
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

      a:hover {
        color: #c81623;
        text-decoration: none;
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
}</style>