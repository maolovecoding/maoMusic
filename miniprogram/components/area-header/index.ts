// components/area-header/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 默认标题
    title: String,
    // 右侧文字 默认更多
    rightText: {
      type: String,
      value: "更多"
    },
    show: {
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
    onClick() {
      // 点击了 更多 触发事件
      this.triggerEvent("click");
    }
  }
})
