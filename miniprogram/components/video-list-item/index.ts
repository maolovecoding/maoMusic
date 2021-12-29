// components/video-list-item/index.ts
// @ts-ignore
import {EventCallback} from "/typings/types/wx/index";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    topMv: Object
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    videoItemClick(e: EventCallback) {
      console.log(e.currentTarget.dataset);
      this.triggerEvent("getVideoId", e.currentTarget.dataset);
    }
  }
})
