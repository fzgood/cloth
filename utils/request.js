// const apiUrl = 'https://cmqplus.goho.co/';
const apiUrl = 'http://192.168.31.230:8888/';
const version = 'V201907225';
const Request = function () {
  this.apiUrl = apiUrl + version;
  this.data = {
    'client': 'wechat_applet',
    'companyId': '1',
    'latitude': 0,
    'longitude': 0,
    'token': ''
  }
}

Request.prototype.use = function(fn){
  fn && fn();
  return this;
}

Request.prototype.getToken = function(){
  this.data.token = wx.getStorageSync('token');
}

Request.prototype.get = function (url, data) {
  this.getToken();
  var header = {
    'content-type': 'application/json'
  };
  const params = Object.assign({}, this.data, data);
  console.log(params);
  return new Promise((resolve, reject) => {
    wx.request({
      url: this.apiUrl + url, //仅为示例，并非真实的接口地址
      data: params,
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
  this.getToken();
  var header = {
    'content-type': 'application/json'
  };
  const params = Object.assign({}, this.data, data);
  return new Promise((resolve, reject)=> {
    wx.request({
      url: this.apiUrl + url, //仅为示例，并非真实的接口地址
      data: params,
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
      fail: xhr => {
        reject(xhr);
        wx.hideLoading()
      }
    })
  })
}


Request.prototype.uploadImage = function(images){
  wx.showLoading({
    mask: true
  })
  return new Promise((resolve, reject)=>{
    var files = [];
    var upload = (arr)=>{
      var file = arr.splice(0, 1)[0];
      wx.uploadFile({
        url: this.apiUrl + '/file/upload', //仅为示例，非真实的接口地址
        filePath: file,
        name: 'file',
        success(res) {
          if (res.statusCode === 200) {
            var data = JSON.parse(res.data);
            if (data.code === 0) {
              files.push(data.data.url);
              if (arr.length) {
                upload(arr)
              } else {
                wx.hideLoading()
                resolve(files);
              }
            }
          }
        },
        fail: xhr => {
          resolve(files);
          wx.hideLoading()
        }
      })
    }
    upload(images);
  })
}

export default new Request();