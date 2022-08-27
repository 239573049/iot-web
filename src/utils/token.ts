export function getToken() {
  return window.localStorage.getItem('token');
}

export function setToken(value) {
  window.localStorage.setItem('token', value);
}
