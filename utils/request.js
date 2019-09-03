const apiUrl = '';

const Request = function () {
  this.apiUrl = apiUrl;
}

Request.prototype.use = function(fn){
  fn && fn();
  return this;
}

Request.prototype.get = function (url, data) {
  var header = {
    'content-type': 'application/json'
  };
  return new Promise(function (resolve, reject) {
    wx.request({
      url: apiUrl + url, //仅为示例，并非真实的接口地址
      data: data,
      method: 'get',
      header: header,
      success(res) {
        if (res.statusCode === 200) {
          var data = res.data;
          resolve(data)
        } else {
          reject();
        }
      },
      fail(xhr) {
        reject(xhr);
      }
    })
  })
}

Request.prototype.post = function (url, data) {
  var header = {
    'content-type': 'application/json'
  };
  return new Promise(function (resolve, reject) {
    wx.request({
      url: apiUrl + url, //仅为示例，并非真实的接口地址
      data: data,
      method: 'post',
      header: header,
      success(res) {
        if (res.statusCode === 200) {
          var data = res.data;
          resolve(data)
        } else {
          reject();
        }
      },
      fail(xhr) {
        reject(xhr);
      }
    })
  })
}

export default new Request();