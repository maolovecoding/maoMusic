/**
 * @FileName: http.ts
 * @Description: 发起基本的网络请求
 * @author 毛毛
 * @date 2021-12-26 20:48
 */
import {promisic} from "../utils/index";
//@ts-ignore
import {RequestOption} from "/typings/types/index";
// @ts-ignore
import {BASE_URL} from "../config/index";

export class Http {
  static request({url, data, method}: RequestOption): Promise<any> {
    return promisic(wx.request)({
      url : BASE_URL + url,
      data,
      method,
      // 请求头 备用
      header: {}
    });
  }
}