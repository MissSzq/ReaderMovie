var postsData = require("../../../data/posts-data.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic :false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData,
    });
    var postsCollected = wx.getStorageSync("posts_collected");
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    };
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      this.setData({
        isPlayingMusic : true,
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
      
    })
  },
  // wx.setStorageSync("key", "风暴英雄")
  //   wx.setStorageSync("key", {
  //     game : "风暴英雄",
  //     developer : "暴雪"
  //   })
  //   wx.setStorageSync("key1", {
  //     game :"lol",
  //     developer : "腾讯"
  //   })
  // },
  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postCollected, postsCollected);


  },
  showToast: function (postCollected, postsCollected) {
    // 更新文章是否收藏缓存
    var that = this;
    var postCollected = postCollected;
    wx.setStorageSync("posts_collected", postsCollected);
    that.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: "success"
    })
  },
  onShareTap: function (event) {
    var itemlist = ["分享到微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博" ]
    wx.showActionSheet({
      itemList:itemlist,
      success: function (res){
        wx.showModal({
          title:  "用户"+itemlist[res.tapIndex],
          content: '用户是否取消分享？现在无法实现分享功能',
        })
      }
    })
  },
  onMusicTap: function (event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    var music = postsData.postList[this.data.currentPostId].music;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic :false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music. coverImg,
      });
      this.setData({
        isPlayingMusic: true
      });
    }

  }
  // showModal: function (postCollected, postsCollected) {
  //   var that = this;
  //   wx.showModal({
  //     title: '收藏',
  //     content: postCollected?'是否收藏文章？':'是否取消收藏？',
  //     showCancel: true,
  //     success: function (res) {
  //       if (res.confirm) {
  //         // 更新文章是否收藏缓存
  //         wx.setStorageSync("posts_collected", postsCollected);
  //         that.setData({
  //           collected: postCollected
  //         });
  //       }
  //     }
  //   });


  // onShareTap:function(event){
  //   wx.removeStorageSync("key")//清除缓存
  //   // wx.clearStorageSync();清除全部缓存
  // }

})