// Vue 插件一定对外暴露一个对象
let myPlugins = {}

// 这个对象有一个 install 方法   且这个方法不能是箭头函数
myPlugins.install = function(Vue, options){
    // 设置自定义指令的方法第一个参数是自定义指令的名字，第二个参数是该指令的回调函数是一个箭头函数
    // 这里设置我们自定义指令的名字 就是我们传入配置对象的 name 属性。
    Vue.directive(options.name, (element, params)=> {
        // element 就是我们使用该指令的元素， params 参数是一个对象，是对指令后面字符串的一个对象，属性expression是表达式,还有一个属性是我
        // 我们指令的修饰符
        element.innerHTML = params.value.toUpperCase()
    })
}

export default myPlugins;