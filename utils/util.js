const app = getApp();
const formatTime = (date,onlyDate,_type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (onlyDate=="onlyDate"){
    if (_type=="en"){
      return formatNumber(month) + "月" + formatNumber(day)+"日"
    }else{
      return [year, month, day].map(formatNumber).join('-'); 
    } 
  }else{
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }
  
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const checkLogin=function(){
  if (!wx.getStorageSync("token")){
    wx.navigateTo({
      url: '/pages/login/login',
    })
    return ;
  }
}

const showToast=function(msg){
  wx.showToast({
    title: msg,
    icon: "none",
    success: function () {
      setTimeout(function () {
        wx.hideToast();
      }, 3000)
    }
  })
}

module.exports = {
  formatTime: formatTime,
  checkLogin: checkLogin,
  showToast: showToast
}
