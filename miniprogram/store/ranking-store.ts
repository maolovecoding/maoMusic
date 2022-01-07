/**
 * @FileName: ranking-store.ts
 * @Description: 推荐榜单的store
 * @author 毛毛
 * @date 2022-01-05 13:14
 */
import {HYEventStore} from 'hy-event-store'
import songRanking from "../service/song-ranking";
// 巅峰榜 榜单映射关系
export const rankingMap = {0: "newRanking", 1: "hotRanking", 2: "originRanking", 3: "upRanking"};
export default new HYEventStore({
  state: {
    // 新歌
    newRanking: {},
    // 热歌
    hotRanking: {},
    // 原创
    originRanking: {},
    // 飙升榜
    upRanking: {},
  },
  actions: {
    getRankingDataAction(ctx: any, options: any) {
      console.log(ctx, options);
      // idx : 0 新歌榜 1 热歌榜 2 原创榜 3 飙升榜
      // 热门歌曲
      for (let i = 0; i < 4; i++) {
        songRanking.getRankings(i).then(res => {
          // console.log(res.data.playlist.tracks);
          const rankingName = rankingMap[i];
          ctx[rankingName] = res?.data?.playlist;
          // switch (i) {
          //   case 0:
          //     ctx.newRanking = res?.data?.playlist;
          //     break;
          //   case 1:
          //     ctx.hotRanking = res?.data?.playlist;
          //     break;
          //   case 2:
          //     ctx.originRanking = res?.data?.playlist;
          //     break;
          //   case 3:
          //     ctx.upRanking = res?.data?.playlist;
          //     break;
          // }
        });
      }
    }
  }
})