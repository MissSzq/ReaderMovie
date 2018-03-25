var postsData = require("../../data/posts-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postlist: postsData.postList,
    });
    // 页面加载在数据加载前了？无法使用直接赋值 最好都用setData传值
    // this.data.postlist = postsData.postlist;
    // console.log(this.data.postlist)
  },

  onPostTap: function (event) {
    // console.log(event)
    var postId = event.currentTarget.dataset.postid;
    // console.log(postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
  // 在父级调用冒泡方法 target 指的是当前点击的组件 和currentTarget是事件捕获的组件
  onSwiperTap:function(event){
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }

})