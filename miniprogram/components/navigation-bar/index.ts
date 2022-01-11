// components/navigation-bar/index.ts
import {navigationBarHeight} from "../../constant/index";

Component({
  options: {
    // 开启多插槽
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 状态栏高度
    statusBarHeight: getApp().globalData.statusBarHeight,
    // 导航栏的高度
    navigationBarHeight
  },
  lifetimes: {
    created() {
      // const info = wx.getSystemInfoSync();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backClick(){
      // 返回
      this.triggerEvent("back");
    }
  }
})
