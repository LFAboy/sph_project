// 先引入 mockjs 模块
import Mock from 'mockjs';
// 把JSON 数据格式引入进来，注意：JSON 数据格式根本没有对外暴露，但是可以引入
// webpack 默认对外暴露：图片、JSON 数据格式
import banner from './banner.json'
import floor from './floor.json'

// Mock 对象的 mock方法：第一个参数是请求地址，第二个参数是请求数据
Mock.mock('/mock/banner', {code:200, data:banner});  // 模拟首页大的轮播图的数据
Mock.mock('/mock/floor', {code:200, data:floor})