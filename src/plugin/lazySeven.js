const lazyloading = {};

lazyloading.install = function(Vue, options) {
  //注入的第一个参数是 Vue 构造函数.第二个参数就是我们Use 插件的时候传入的配置对象/
}


// 插件对外暴露的是一个对象，这个对象有一个 install 的方法，当我们 使用 Vue.use(插件的时候)会调用 Install 方法
export default lazyloading;


// 图片懒加载功能插件由于暂不编写，后期可以试一下。