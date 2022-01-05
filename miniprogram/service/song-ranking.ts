/**
 * @FileName: song-ranking.ts
 * @Description: 歌单排行 榜单
 * @author 毛毛
 * @date 2022-01-05 13:24
 */
import {promisic} from "../utils/index";

export class SongRanking {
  getRankings(idx: number): Promise<any> {
    return promisic(wx.request)({
      url: "http://123.207.32.32:9001/top/list",
      data: {idx}
    });
  }
}

export default new SongRanking;