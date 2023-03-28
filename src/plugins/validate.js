// vee-validate 插件的引入与使用. 插件功能： 表单验证
import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 引入中文的提示信息, 默认的是英文的
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
// 该模块不需要对外暴露，只需要在入口文件中引入 执行一下就行了 例： import '../src/plugins/validate'

VeeValidate.Validator.localize('zh_CN', {
    messages:{
        ...zh_CN.messages,
        is:(field)=> `${field}必须与密码相同`  // 修改内置规则的message ，让确认密码和 密码相同
    },
    attributes:{
        phone:'手机号',
        code:'验证码',
        password:'密码',
        password1:'确认密码',
        isCheck:'协议',
        agree:'协议'
    }
})


// 自定义校验规则  用于校验协议是否勾选
VeeValidate.Validator.extend('tongyi', {
    validate:(value) => {
        return value;
    },
    getMessage: (field)=> field + '协议必须同意'
})