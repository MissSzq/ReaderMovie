// components/move/movie.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: {
      type: Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMovieTap: function (event) {
      console.log(4)
      var movieId = event.currentTarget.dataset.movieid;
      wx.navigateTo({
        url: '/pages/movies/movie-detail/movie-detail?id=' + movieId,
      })
    },
  }
})
