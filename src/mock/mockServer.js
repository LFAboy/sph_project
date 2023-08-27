// 先引入 Mock 对象
import Mock from 'mockjs';
import bannerList from './bannerList.json';
import floorList from './floorList.json';

// Mock 服务器会 拦截 路径为 /mock/bannerList 的请求。
Mock.mock('/mock/bannerList', {code: 200, data: bannerList});

Mock.mock('/mock/floorList', {code: 200, data: floorList})