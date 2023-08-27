<script setup>
import { reactive } from 'vue';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

const form = reactive({
  phone: null,  // 手机号
  password: null, // 密码
  passwordAgain: null,  // 确认密码
  code: null, // 验证码
  isAgree: false, // 是否同意用户协议
})
const errors = reactive({
  phone: null,  // 手机号错误的提示信息
  password: null, // 密码格式错误的提示信息
  passwordAgain: null,  // 确认密码不一致的错误提示信息
  code: null,  // 验证码格式错误的提示信息
  isAgree: null,  // 不同意用户协议的错误提示信息
})

const userStore = useUserStore();
const router = useRouter();


// 获取注册验证码
async function getCode() {
  try {
    if (validatePhone(form.phone)) {
      await userStore.getCode(form.phone);
      form.code = userStore.code;
    } else {
      alert("请检查手机号！");
    }
  } catch (error) {
    alert(error.message);
  }
}

async function userRegister() {
  try {
    if (validatePhone(form.phone) && validatePassword(form.password) && validatePasswordAgain(form.passwordAgain) && validateCode(form.code) && validateIsAgree(form.isAgree)) {
      await userStore.userRegister({
        phone: form.phone,
        password: form.password,
        code: form.code
      });
      router.push('/login');
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
function validatePasswordAgain(value) {
  if (!value) {
    errors.passwordAgain = '请再输入一次';
    return false;
  } else if (value !== form.password) {
    errors.passwordAgain = "两次输入不一致";
    return false;
  } else return true;
}
function validateCode(value) {
  if (!value) {
    errors.code = "请输入验证码";
    return false;
  } else if (!/^\d{6}$/.test(value)) {
    errors.code = "验证码是6个数字";
    return false;
  } else return true;
}
function validateIsAgree(value) {
  if (!value) {
    errors.isAgree = "请勾选同意用户协议";
    return false;
  } else return true;
}

</script>

<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login" target="_blank">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" v-model="form.phone" />
        <span v-show="!validatePhone(form.phone)" class="error-msg">{{ errors.phone }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" v-model="form.code" />
        <button style="width:100px; height:38px;margin-left: 5px;" @click="getCode">获取验证码</button>
        <span v-show="!validateCode(form.code)" class="error-msg">{{ errors.code }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" v-model="form.password" />
        <span v-show="!validatePassword(form.password)" class="error-msg">{{ errors.password }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" v-model="form.passwordAgain">
        <span v-show="!validatePasswordAgain(form.passwordAgain)" class="error-msg">{{ errors.passwordAgain }}</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="form.isAgree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.isAgree }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
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
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
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