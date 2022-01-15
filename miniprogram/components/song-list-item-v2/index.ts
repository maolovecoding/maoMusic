// components/song-list-item/index.ts
import {playerStore} from "../../store/audio-context-player-store";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
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
    // 点击歌单的歌曲 跳转到歌曲的播放页 携带歌曲id
    itemClick() {
      const id = this.properties.item.id;
      wx.navigateTo({
        url: `/pages/music-player/index?id=${id}`
      });
      playerStore.dispatch("playMusicWithSongIdAction", {id});
    }
  }
})
