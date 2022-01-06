/**
 * @FileName: song-menu.ts
 * @Description: 歌单 榜单
 * @author 毛毛
 * @date 2022-01-06 10:26
 */
import {Http} from "../http/index";

export class SongMenu {
  private static readonly TOP_PLAYLIST = "top/playlist";
  // 歌单标签
  private readonly cat: string;
  private limit: number;
  // 歌单类型 热门
  private order: string;

  constructor(order = "hot", cat = "全部", limit = 8,) {
    this.cat = cat;
    this.limit = limit;
    this.order = order;
  }


  getSongMenu(offset = 0) {
    return Http.request({
      url: SongMenu.TOP_PLAYLIST,
      data: {
        cat: this.cat,
        limit: this.limit,
        offset,
        order: this.order
      }
    });
  }
}