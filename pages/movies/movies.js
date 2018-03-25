var app = getApp();
var util = require('../../utils/utils.js');
Page({

  data: {
    inTheatersUrl: {},
    comingSoonUrl: {},
    top250Url: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,

  },
  onLoad: function () {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "Top250");
  },
  getMovieListData: function (url, settedKey, kindTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, kindTitle);
      },
      fail: function () {
        console.log("fail")
      }
    })
  },
  
  bindconfirm: function (event) {
    var text = event.detail.value;

    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },
  onCancelImgTap: function () {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    })
  },
  onBindFocus: function () {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  
  processDoubanData: function (moviesDouban, settedKey, kindTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      };
      movies.push(temp);
    }
    var readerData = {};
    readerData[settedKey] = {
      movies: movies,
      kindTitle: kindTitle
    };
    this.setData(readerData);
  }
})