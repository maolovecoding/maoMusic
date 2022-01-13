/**
 * @FileName: music-player-store.ts
 * @Description: 音乐播放的状态管理
 * @author 毛毛
 * @date 2022-01-11 18:20
 */
import {HYEventStore} from "hy-event-store";
import my from "../service/my";

export const musicPlayerStore = new HYEventStore({
  state: {
    // 喜欢的音乐的 所有id
    loveMusicIds: [],
  },
  actions: {
    getLoveMusicIds(ctx) {
      my.getUserLikeList().then(res => {
        ctx.loveMusicIds = res.data.ids;
        console.log(res);
      });
    }
  }
});

// musicPlayerStore.dispatch("getLoveMusicIds");
