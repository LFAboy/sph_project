// vue3 报错提示 找不到 模块 ./App.vue 或其相应的类型声明
// 报错原因：typescript 只能理解 .ts 文件 无法理解 .vue文件


declare module '*.vue' {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component;
}


// declare module "*.vue" {
//   import { ComponentOptions } from "vue";

//   const componentOptions: ComponentOptions;

//   export default componentOptions;
// }