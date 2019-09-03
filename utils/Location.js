function Location(){

}

Location.prototype.getLocation = function(){
  return new Promise((resolve, reject)=>{
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        resolve(res);
      },
      fail(xhr){
        reject(xhr);
      }
    })
  });
}

Location.prototype.openLocation = function (object) {
  return new Promise((resolve, reject) => {
    var options = object;
    options.success = function (res) {
      object.success();
      resolve(res);
    }
    options.fail = function (xhr) {
      object.fail();
      reject(xhr);
    }
    wx.openLocation(options);
  })
}

Location.prototype.chooseLocation = function () {
  return new Promise((resolve, reject) => {
    wx.chooseLocation({
      success(res){
        resolve(res);
      },
      fail(xhr){
        reject(xhr);
      }
    });
  })
}


export default new Location();