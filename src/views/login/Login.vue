<script setup>
import { useUserStore } from '@/store/user';
import { useRoute, useRouter } from 'vue-router';
import { reactive } from 'vue';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const form = reactive({
  phone:null, // 手机号
  password: null, // 密码
})
const errors = reactive({
  phone:null, // 手机号错误的提示信息
  password:null,// 密码错误的提示信息
})

async function userLogin() {
  try {
    if (validatePhone(form.phone) && validatePassword(form.password)) {
      await userStore.userLogin({
        phone: form.phone,
        password: form.password
      });
      let toPath = route.query.redirect || '/home'
      router.push(toPath);
    }
  } catch (error) {
    alert(error.message);
  }
}

function validatePhone(value) {
  if (!value) {
    errors.phone = '请输入手机号！'
    return false;
  } else if (!/^1[3-9]\d{9}$/.test(value)) {
    errors.phone = "手机号格式错误";
    return false;
  } else return true;
}
function validatePassword(value) {
  if (!value) {
    errors.password = "请输入密码"
    return false;
  } else if (!/^\w{6,24}$/.test(value)) {
    errors.password = "密码是6-24个字符"
    return false;
  } else return true;
}

</script>

<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login" style="background-image: url('/images/login/loginbg.png');">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a style="border-right: 0;">扫描登录</a>
            </li>
            <li>
              <a class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form>
              <div class="input-text clearFix">
                <span class="account" style="background-image: url('/images/home/icons.png');"></span>
                <input type="text" v-model="form.phone">
                <span v-show="!validatePhone(form.phone)" class="error-msg">{{ errors.phone }}</span>
              </div>
              <div class="input-text clearFix">
                <span class="pwd" style="background-image: url('/images/home/icons.png');"></span>
                <input type="text" v-model="form.password">
                <span v-show="!validatePassword(form.password)" class="error-msg">{{ errors.password }}</span>
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input type="checkbox" checked="">
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button @click.prevent="userLogin" class="btn">登&nbsp;&nbsp;录</button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt=""></li>
                <li><img src="./images/sina.png" alt=""></li>
                <li><img src="./images/ali.png" alt=""></li>
                <li><img src="./images/weixin.png" alt=""></li>
              </ul>
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .login-container {
    .login-wrap {
      height: 487px;
      background-color: #e93854;

      .login {
        width: 1200px;
        height: 487px;
        margin: 0 auto;
        // background: url('./images/loginbg.png') no-repeat;
        background-repeat: no-repeat;
      }

      .loginform {
        width: 420px;
        height: 406px;
        box-sizing: border-box;
        background: #fff;
        float: right;
        top: 45px;
        position: relative;
        padding: 20px;

        .tab {

          li {
            width: 50%;
            float: left;
            text-align: center;

            a {
              width: 100%;
              display: block;
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              font-weight: 700;
              color: #333;
              border: 1px solid #ddd;
              box-sizing: border-box;
              text-decoration: none;

            }

            .current {
              border-bottom: none;
              border-top-color: #28a3ef;
              color: #e1251b;
            }
          }
        }

        .content {
          width: 380px;
          height: 316px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-top: none;
          padding: 18px;

          form {
            margin: 15px 0 18px 0;
            font-size: 12px;
            line-height: 18px;

            .input-text {
              margin-bottom: 30px;
              position: relative;

              span {
                float: left;
                width: 37px;
                height: 32px;
                border: 1px solid #ccc;
                background-position: bottom -10px right -201px;
                background-repeat: no-repeat;
                box-sizing: border-box;
                border-radius: 2px 0 0 2px;
              }

              .account {
                background-position: -10px -201px;
              }

              .pwd {
                background-position: -72px -201px;
              }

              input {
                width: 302px;
                height: 32px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-left: none;
                float: left;
                padding-top: 6px;
                padding-bottom: 6px;
                font-size: 14px;
                line-height: 22px;
                padding-right: 8px;
                padding-left: 8px;

                border-radius: 0 2px 2px 0;
                outline: none;
              }

              .error-msg {
                position: absolute;
                display: inline-block;
                width: 100%;
                border: none;
                top: 35px;
                left: 40px;
                color: #e1251b;
              }
            }

            .setting {
              label {
                float: left;
              }

              .forget {
                float: right;
              }
            }

            .btn {
              background-color: #e1251b;
              padding: 6px;
              border-radius: 0;
              font-size: 16px;
              font-family: 微软雅黑;
              word-spacing: 4px;
              border: 1px solid #e1251b;
              color: #fff;
              width: 100%;
              height: 36px;
              margin-top: 25px;
              outline: none;
            }
          }

          .call {
            margin-top: 30px;

            ul {
              float: left;

              li {
                float: left;
                margin-right: 5px;
              }
            }

            .register {
              float: right;
              font-size: 15px;
              line-height: 38px;
            }

            .register:hover {
              color: #4cb9fc;
              text-decoration: underline;
            }
          }

        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }

  }
</style>