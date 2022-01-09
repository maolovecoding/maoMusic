// components/recommend-song/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommendSong: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击推荐歌曲 跳转到歌曲的播放页 携带歌曲id
    itemClick() {
      wx.navigateTo({
        url: `/pages/music-player/index?id=${this.properties.recommendSong.id}`
      });
    }
  }
})
