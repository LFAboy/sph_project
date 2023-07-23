export const getToken = function() {
  return localStorage.getItem('token');
};

export const setToken = function(token) {
  localStorage.setItem('token', token);
};

export const removeToken = function() {
  localStorage.removeItem('token');
}