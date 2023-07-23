// 引入uuid包，注意这个包我们已经有了不用下载。
import { v4 as uuidv4 } from 'uuid';

export const getUuid = () => {
  let uuidString = localStorage.getItem('sphUuid');

  if (!uuidString) {
    // 如果本次没有存储 uuid 那么就生成一个 uuid 并存储在本地
    uuidString = uuidv4();
    localStorage.setItem('sphUuid', uuidString)
    console.log('创建了一个uuid');
    // up: uuidv4 生成的就是一个字符串，所以没有必要用JSON转化为字符串
    // console.log(uuidString, 'uuidString');
  }
  return uuidString;
};