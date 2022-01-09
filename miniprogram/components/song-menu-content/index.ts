// components/song-menu-content/index.ts
Component({
  externalClasses:["menu-class"],

  /**
   * 组件的属性列表
   */
  properties: {
    // 歌单列表
    songMenu: {
      type: Array,
      value: []
    },
    // 是否显示加号
    showAdd: {
      type: Boolean,
      value: true
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
    itemClick(e){
      console.log(e.currentTarget.dataset.id);
      // 跳转到歌单详情，显示歌单数据
      wx.navigateTo({
        url:`/pages/detail-song/index?id=${e.currentTarget.dataset.id}&type=menu`
      })
    }
  }
})
