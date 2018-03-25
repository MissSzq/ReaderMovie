// components/move-list/move-list.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    allData:{
      type:Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    allData:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMoreTap: function (event) {
      var category = event.currentTarget.dataset.category;
      wx.navigateTo({
        url: '../../pages/movies/more-movie/more-movie?category=' + category,
      })
    },
  }
})
