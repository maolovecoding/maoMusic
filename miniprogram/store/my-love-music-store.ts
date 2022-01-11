/**
 * @FileName: my-love-music-store.ts
 * @Description: 我喜欢的音乐的状态管理
 * @author 毛毛
 * @date 2022-01-09 19:09
 */
import {HYEventStore} from "hy-event-store";
import userPlaylist from "../service/user-playlist"

export const myLoveMusicStore = new HYEventStore({
  state: {
    // 喜欢的音乐的 简略信息 歌单信息
    loveMusic: {} as any,
    // 喜欢的音乐的 所有id
    loveMusicIds: [],
  },
  actions: {
    getLoveMusic(ctx) {
      userPlaylist.getUserPlayList().then(res => {
        ctx["loveMusic"] = res.data.playlist[0];
      });
    }
  }
})