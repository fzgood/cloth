/**
 * @param {Object} pages
 * key: 页面跳转路径
 * value: 权限控制
 *  -1： 账号已被封禁
 *  0： 未登录用户
 *  1： 已登录用户
 */
const pages = {
  '/pages/order/list/list': [0, 1],
  '/pages/order/detail/detail': [0, 1],
  '/pages/order/apply/apply': [0, 1],
  '/pages/order/quickly/quickly': [0, 1],
  '/pages/user/address/list/list': [0, 1],
  '/pages/user/address/edit/edit': [0, 1],
  '/pages/user/index/index': [0, 1],
  '/pages/user/edit/edit': [0, 1],
  '/pages/carts/carts': [0, 1],
  '/pages/upload/upload': [0, 1],
  '/pages/product/list/list': [0, 1],
  '/pages/product/detail/detail': [0, 1],
  '/pages/custom/custom': [0, 1]
}
export default pages;