// uuid 创建一个随机字符串当token使用
import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
  let uu_id = localStorage.getItem('UUID');
  if (!uu_id) {
    // 注意判断条件取反，是当没有uu_id的时候执行
    uu_id = uuidv4();
    localStorage.setItem('UUID', uu_id as string);
  }
  return uu_id;
}