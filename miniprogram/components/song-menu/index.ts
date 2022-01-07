// components/song-menu/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songMenu: {
      type: Array,
      value: []
    },
    title: {
      type: String,
      value: ""
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
    // 歌单的点击 跳转到详情页
    menuItemClick(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        //歌单类型
        url: `/pages/detail-song/index?id=${id}&type=menu`
      });
    }
  }
})
