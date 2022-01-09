/**
 * @FileName: my.ts
 * @Description: 用户信息
 * @author 毛毛
 * @date 2022-01-08 13:00
 */
import {Http} from "../http/index";

export class My {
  /**
   * 用户名
   * @private
   */
  private phone: string;
  /**
   * 密码
   * @private
   */
  private password: string;

  private static readonly LOGIN_BY_CELLPHONE = "login/cellphone";
  private static readonly USER_LEVEL = "user/level";

  constructor(phone: string, password: string) {
    this.phone = phone;
    this.password = password;
  }

  async login(): Promise<any> {
    // 缓存读取用户信息
    const res = wx.getStorageSync("userInfo");
    if (res) return Promise.resolve(res);
    const {data} = await Http.request({
      url: My.LOGIN_BY_CELLPHONE,
      data: {
        phone: this.phone,
        password: this.password
      }
    });
    // 缓存中没有信息 存储用户信息
    wx.setStorage({
      key: "userInfo",
      data
    });
    // 缓存 cookie
    wx.setStorage({
      key: "cookie",
      data: data.cookie
    });
    // 缓存 uid
    wx.setStorage({
      key: "uid",
      data: data.account.id
    })
    return data;
  }

  /**
   * 获取用户等级数据
   */
  async getUserLevel() {
    const res = wx.getStorageSync("userLevel");
    if (res) return Promise.resolve(res);
    const {data} = await Http.request({
      url: My.USER_LEVEL,
    });
    // 缓存中没有信息 存储用户信息
    wx.setStorage({
      key: "userLevel",
      data
    });
    return data;
  }

  /**
   * 获取用户详细数据
   * @param uid
   */
  getUserDetail(uid) {
    return Http.request({
      url: "user/detail",
      data: {
        uid
      }
    });
  }

  /**
   * 获取账号信息
   */
  getUserAccount() {
    return Http.request({
      url: "user/account",
    });
  }

  // 获取vip信息
  getUserVipInfo() {
    return Http.request({
      url: "vip/info",
    });
  }

  /**
   * 获取用户喜欢的音乐列表
   */
  getUserLikeList() {
    return Http.request({
      url: "likelist",
      data: {
        uid: wx.getStorageSync("uid")
      }
    });
  }

  /**
   * 喜欢 不喜欢 音乐
   * @param id 音乐id
   */
  setMusicLikeOrDislike(id: number, like = true) {
    return Http.request({
      url: "like",
      data: {
        id,
        like
      }
    });
  }

  /**
   * 更新用户信息
   * 必选参数：  gender: 性别 0:保密 1:男性 2:女性
   birthday: 出生日期,时间戳 unix timestamp
   nickname: 用户昵称
   province: 省份id
   city: 城市id
   signature：用户签名
   */
  updateUserInfo() {
    return Http.request({
      url: "user/update",
      method: "POST",
      data: {}
    });
  }
}

// 暂时用来登录 简单配置
export default new My("", ".");
