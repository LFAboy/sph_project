export const getToken = ()=> {
    return localStorage.getItem('TOKEN')
}
export const setToken = (token)=> {
    return localStorage.setItem('TOKEN', token)
}

// 清除本地存储的 token 
export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}