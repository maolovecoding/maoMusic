/**
 * @FileName: song-menu.ts
 * @Description: 歌单 榜单
 * @author 毛毛
 * @date 2022-01-06 10:26
 */
import {Http} from "../http/index";
import {PageHelper} from "./types";

export class SongMenu {
  private static readonly TOP_PLAYLIST = "top/playlist";
  private static readonly SONG_MENU_DETAIL = "playlist/detail";
  private static readonly SONG_MENU_TRACK_ALL = "playlist/track/all";
  private static readonly KEEP_SONG_MENU_OR = "playlist/subscribe";
  private static readonly SONG_MENU_COMMENT = "comment/playlist";
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

  /**
   * 获取歌单数据
   * @param offset
   */
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

  /**
   * 获取歌单详情
   * @param id
   */
  getSongMenuDetail(id: string) {
    return Http.request({
      url: SongMenu.SONG_MENU_DETAIL,
      data: {
        id
      }
    });
  }

  /**
   * 获取歌单内所有的音乐
   * @param id 歌单id
   */
  getSongMenuTrackAll(id: string) {
    return Http.request({
      url: SongMenu.SONG_MENU_TRACK_ALL,
      data: {
        id
      }
    });
  }

  /**
   * subscribe 订阅
   * 收藏 取消歌单
   * t = 1 收藏
   * t = 2 取消收藏
   * id 歌单 t 操作类型
   */
  keepSongMenuOr(id: number, t = 1) {
    return Http.request({
      url: SongMenu.KEEP_SONG_MENU_OR,
      data: {
        t,
        id
      }
    });
  }

  /**
   * 获取歌单评论
   * @param id
   * @param pageHelper
   */
  getSongMenuComment(id: number, pageHelper: PageHelper = {limit: 20, offset: 0}) {
    return Http.request({
      url: SongMenu.SONG_MENU_COMMENT,
      data: {
        id,
        ...pageHelper
      }
    });
  }

}