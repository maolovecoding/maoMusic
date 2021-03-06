/**
 * @FileName: video.ts
 * @Description: 视频相关数据请求
 * @author 毛毛
 * @date 2021-12-26 21:03
 */
//@ts-ignore
import {RequestOption} from "/typings/types/index";
import {Http} from "../http/http";
import {PageHelper} from "./types";

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
  private static TOP_MV = "top/mv";
  /**
   * mv的地址
   * @private
   */
  private static MV_URL = "mv/url";
  /**
   * mv的详情数据
   * @private
   */
  private static MV_DETAIL = "mv/detail";
  private static RELATED_MV = "related/allvideo";

  //@ts-ignore
  private topMvs = [];

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
      url: Video.TOP_MV,
      data
    });
  }

  /**
   * 获取mv的url地址
   * @param id mv的唯一标识
   */
  getMvUrl(id: string): Promise<any> {
    return Http.request({
      url: Video.MV_URL,
      data: {
        id
      }
    });
  }

  /**
   * 获取mv的详情数据
   * @param mvid mv的唯一标识
   */
  getMvDetail(mvid: string): Promise<any> {
    return Http.request({
      url: Video.MV_DETAIL,
      data: {
        mvid
      }
    });
  }

  /**
   * 获取mv的相关联的mv数据
   * @param id
   */
  getRelatedMv(id: string): Promise<any> {
    return Http.request({
      url: Video.RELATED_MV,
      data: {
        id
      }
    });
  }

  /**
   * 获取最近播放的mv
   */
  getRecentMv(limit = 100) {
    return Http.request({
      url: "record/recent/video",
      data: {
        limit
      }
    });
  }

  /**
   * 获取当前mv的 点赞 转发 评论数 数据
   */
  getMvRelatedInfo(mvid: string) {
    return Http.request({
      url: "mv/detail/info",
      data: {
        mvid
      }
    });
  }

  /**
   * 获取mv的评论
   * @param id
   * @param pageHelper
   */
  getMvComments(id: string, pageHelper: PageHelper = {limit: 20, offset: 0}) {
    return Http.request({
      url: "comment/mv",
      data: {
        id,
        ...pageHelper
        // before:
      }
    });
  }

  /**
   * 获取视频标签列表
   */
  getMvGroupList() {
    return Http.request({
      url: "video/group/list",
    });
  }

  /**
   * 获取视频分类列表
   */
  getMvCategoryList() {
    return Http.request({
      url: "video/category/list",
    });
  }

  /**
   * 获取视频标签/分类下的视频
   * @param id 值是 标签id或者 分类id
   * @param offset 偏移量
   */
  getMvGroup(id: string, offset = 0) {
    return Http.request({
      url: "video/group",
      data: {
        id, offset
      }
    });
  }
}


/**
 * 视频请求对象可全局唯一
 */
export default new Video;