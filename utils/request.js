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


Request.prototype.uploadImage = function(images){
  return new Promise((resolve, reject)=>{
    var files = [];
    var upload = function (images){
      var file = arr.splice(0, 1)[0];
      wx.uploadFile({
        url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        filePath: file,
        name: 'file',
        success(res) {
          if(200){
            files.push(res.data);
            if (arr.length) {
              upload(arr)
            } else {
              resolve(files);
            }
          }
        }
      })
    }
    
  })
}

export default new Request();