export const getToken = () => {
  return localStorage.getItem('TOKEN');
}

export const setToken = (token: string) => {
  return localStorage.setItem('TOKEN', token);
}

export const removeToken = () => {
  // localstorage.removeItem() 没有返回值
  localStorage.removeItem('TOKEN');
}