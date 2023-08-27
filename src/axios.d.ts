// 该文件的作用：背景（当我们在store 的 actions 是一个一步请求时，请求返回的结果是一个 promise，我们不能读取到 result.code 因为类型“AxiosResponse<any, any>”上不存在属性“code” ），我们需要配置该文件 声明返回的对象上可以是任何属性

import { AxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosInstance{
    (config: AxiosRequestConfig): Promise<any>
  }
}

