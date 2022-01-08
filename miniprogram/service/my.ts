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

  getUserDetail(uid) {
    return Http.request({
      url: "user/detail",
      data: {
        uid
      }
    });
  }

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
}

// 暂时用来登录 简单配置
export default new My("", "");
