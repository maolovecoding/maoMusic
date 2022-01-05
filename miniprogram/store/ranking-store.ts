/**
 * @FileName: ranking-store.ts
 * @Description: 推荐榜单的store
 * @author 毛毛
 * @date 2022-01-05 13:14
 */
import {HYEventStore} from 'hy-event-store'
import songRanking from "../service/song-ranking";

export default new HYEventStore({
  state: {
    hotRanking: {}
  },
  actions: {
    getRankingDataAction(ctx: any, options: any) {
      console.log(ctx,options)
      // 热门歌曲
      songRanking.getRankings(1).then(res => {
        // console.log(res.data.playlist.tracks);
        ctx.hotRanking = res?.data?.playlist;
      });
    }
  }
})