Page({
  onTap:function(){
    // 父级跳到子集 有返回
      // wx.navigateTo({
      //   url:"../posts/post"
      // });
    //无返回  
    wx.switchTab({
        url: '../posts/post',
      })
  },

})