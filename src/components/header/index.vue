<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo.name">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userInfo.name }}</a>
            <a @click="signOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <!-- <a href="###">我的订单</a> -->
          <router-link to="/center">我的订单</router-link>
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
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model.lazy="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderIndex",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.loginRegister.userInfo;
    }
  },
  methods: {
    // 跳转到 search 路由的方法，是通过编程式路由导航
    goSearch() {
      // this.$router.push('/search');
      // this.$router.push(`/search/${this.keyword}?b=b&c=c`);

      // 注意 本次Ajax 请求，携带的参数是 params 并没有携带query 参数，如果我们在搜索的时已经有query参数了，那么我们应该同时携带上 query
      // 这样有利于服务器进行判断 具体给我们返回哪些数据。
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          params: {
            keyword: this.keyword.trim() || undefined,
            // up: 如果 params 参数为空 就不展示 params 参数
          },
          query: this.$route.query
        });
      }
    },
    clearInput() {
      this.keyword = '';
    },
    async signOut() {
      // 当我们点击退出登录的方法
      try {
        await this.$store.dispatch('signOut');
        this.$router.push('/home');
        // up: 如果退出登录，那么回到首页
      } catch (error) {
        alert(error.message);
      }
    }
  },
  mounted() {
    // 我们一般在 mounted 中绑定自定义事件。
    this.$bus.$on('clearInput', this.clearInput);
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
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

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
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