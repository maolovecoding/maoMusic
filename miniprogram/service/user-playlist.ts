import {Http} from "../http/http";

/**
 * @FileName: user-playlist.ts
 * @Description: TODO
 * @author 毛毛
 * @date 2022-01-08 16:17
 */

export class UserPlaylist {

  /**
   * 获取用户歌单
   */
  getUserPlayList({offset = 0, limit = 30} = {}) {
    return Http.request({
      url: "user/playlist",
      data: {
        limit: limit,
        offset,
        uid: wx.getStorageSync("uid")
      }
    });
  }
}

export default new UserPlaylist;