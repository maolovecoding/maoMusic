/**
 * @FileName: my-love-music-store.ts
 * @Description: 音乐相关数据接口
 * @author 毛毛
 * @date 2022-01-01 16:56
 */
import {Http} from "../http/index";
import {PageHelper} from "./types";

export class Music {
  /**
   * 轮播图接口地址
   * @private
   */
  private static BANNER = "banner";

  /**
   * 获取音乐轮播图 type表示设备类型
   */
  getBanners(): Promise<any> {
    // iPhone 5
    const {model} = wx.getSystemInfoSync();
    return Http.request({
      url: Music.BANNER,
      data: {
        type: model.split(" ")[0].toLowerCase()
      }
    });
  }

  /**
   * 获取歌曲详情
   * @param ids 歌曲id 可以是多个 逗号分隔
   */
  getMusicDetail(ids: number[]) {
    return Http.request({
      url: "song/detail",
      data: {
        ids: ids.join(",")
      }
    });
  }

  /**
   * 获取歌曲url 可以传多个
   * @param ids
   */
  getMusicUrl(ids: number[]) {
    return Http.request({
      url: "song/url",
      data: {
        id: ids.join(",")
      }
    });
  }

//  获取用户信息 , 歌单，收藏，mv, dj 数量
  getUserSubCount() {
    return Http.request({
      url: "user/subcount",
    });
  }

  /**
   * 获取 音乐的歌词
   * @param id 音乐id
   */
  getMusicLyric(id: number | string) {
    return Http.request({
      url: "lyric",
      data: {
        id
      }
    });
  }

  /**
   * 获取音乐评论 歌曲评论
   * @param id
   * @param pageHelper
   */
  getMusicComments(id: number | string, pageHelper: PageHelper = {limit: 20, offset: 0}) {
    return Http.request({
      url: "comment/music",
      data: {
        id,
        ...pageHelper
      }
    });
  }
}



export default new Music;