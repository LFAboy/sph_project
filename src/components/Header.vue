<script setup>
import { ref, onUnmounted, computed, onMounted} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import emitter from '@/utils/mitt';
import { useUserStore } from '@/store/user';

const router = useRouter();
const route = useRoute();
const inputDom = ref(null);
const userStore = useUserStore();
const userName = computed(() => {
  return userStore.userInfo.name || undefined
})

function startSearch() {
  if (inputDom.value.value.trim()) {
    if (route.query) {
      router.push({
        name: 'search',
        params: {
          keyword: inputDom.value.value.trim(),
        },
        query: route.query,
      })
    } else {
      router.push({
        name: 'search',
        params: inputDom.value.value.trim()
      });
    }
  }
}

async function logOut() {
  try {
    let result = await userStore.userLogout();
    if (result == 200) {
      router.push('/home');
    }
  } catch (error) {
    alert(error.message);
  }
}

onMounted(() => {
  emitter.on('clearInput', () => {
  inputDom.value.value = '';
})
}),

onUnmounted(() => {
  emitter.off('clearInput');
})
</script>


<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="logOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myOrder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="尚品汇">
          <img src="images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" ref="inputDom" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="startSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>



<style lang="less" scoped>
.header {
  &>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>