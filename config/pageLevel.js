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
  '/pages/order/apply/apply': [0, 1],
  '/pages/user/address/list/list': [0, 1]
}
export default pages;