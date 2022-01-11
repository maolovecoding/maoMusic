/**
 * @FileName: topic.ts
 * @Description: 话题
 * @author 毛毛
 * @date 2022-01-10 13:21
 */
import {Http} from "../http/index";
import {PageHelper} from "./types";

export class Topic {
  private static readonly HOT_TOPIC = "hot/topic";

  /**
   * 调用此接口 , 可获取热门话题
   * @param pageHelper
   */
  getHotTopic(pageHelper: PageHelper = {limit: 20, offset: 0}) {
    return Http.request({
      url: Topic.HOT_TOPIC,
      data: {
        ...pageHelper
      }
    })
  }
}

export default new Topic;