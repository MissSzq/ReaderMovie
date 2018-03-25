// components/movie-grid/movie-grid.js
var util = require('../../utils/utils.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movies:{
      type: Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onScrollLower(){
      this.triggerEvent("onScrollLower")
    }
  }
})
