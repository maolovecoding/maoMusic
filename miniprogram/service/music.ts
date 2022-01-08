/**
 * @FileName: music.ts
 * @Description: 音乐相关数据接口
 * @author 毛毛
 * @date 2022-01-01 16:56
 */
import {Http} from "../http/index";

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
}

export default new Music;