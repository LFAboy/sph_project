// 封装游客身份模块，生成一个随机字符串，且不再变化

import { v4 as uuidv4 } from 'uuid';

// export default uuidv4()
export const getUUID = () => {
    let uu_id = localStorage.getItem('UUID')
    if(!uu_id){
        // 注意判断条件，有取反
        uu_id = uuidv4()
        localStorage.setItem('UUID', uu_id)
    }
    return uu_id;
}