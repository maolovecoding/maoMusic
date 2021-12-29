/**
 * @FileName: video.ts
 * @Description: 视频相关数据请求
 * @author 毛毛
 * @date 2021-12-26 21:03
 */
//@ts-ignore
import {RequestOption} from "/typings/types/index";
import {Http} from "../http/http";

interface TopMVDataType {
  offset?: number;
  limit?: number;
  // 歌曲地区
  area?: string;
}

export class Video {
  /**
   * 调用此接口地址 获取 mv 排行
   * 可选参数： limit 取出数量 默认 30
   *          area： 歌曲地区
   *          offset: 偏移数量 用于分页
   */
  static _TOP_MV = "top/mv";

  _topMvs = [];

  get topMvs(): any[] {
    return this._topMvs;
  }

  /**
   * 发起任意请求 请求地址调用方指定
   * @param params
   */
  request(params: RequestOption): Promise<any> {
    return Http.request(params);
  }

  /**
   * get方法请求 获取mv排行
   * @param data
   */
  getTopMV(data: TopMVDataType): Promise<any> {
    return Http.request({
      url: Video._TOP_MV,
      method: "GET",
      data
    });
  }
}
