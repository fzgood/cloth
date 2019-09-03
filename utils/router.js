import pages from '../config/pageLevel.js'
const navArr = [wx.navigateTo, wx.redirectTo, wx.reLaunch, wx.switchTab]
/**
 * 跳转前获取当前用户是否拥有对应的权限进行跳转
 * 
 * @param {String} page
 * 页面跳转路径
 * @param {Number} type
 * 0: 保留当前页面，跳转到应用内的某个页面,
 * 1: 关闭当前页面，跳转到应用内的某个页面,
 * 2: 关闭所有页面，打开到应用内的某个页面,
 * 3: 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 */
const jumpPage = function (page, type = 0) {
  const userLevel = 0;
  const levelArr = pages[page.split('?')[0]];
  // 封禁用户跳转到指定页面
  if (userLevel == -1) {

  } else if (!levelArr) {
    console.error(page + ',页面不存在，请确认路径！');
  } else {
    const isJump = levelArr.indexOf(userLevel) !== -1;
    if (isJump) {
      navArr[type]({
        url: page
      });
    } else {
      // 权限不足
    }
  }
}

export default jumpPage;