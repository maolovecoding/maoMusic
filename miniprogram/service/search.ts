/**
 * @FileName: search.ts
 * @Description: 搜索数据请求
 * @author 毛毛
 * @date 2022-01-07 16:15
 */
import {Http} from "../http/index"

export class Search {
  private static readonly HOT_SEARCH = "search/hot";
  private static readonly SEARCH_SUGGEST = "search/suggest";
  private static readonly SEARCH = "search";

  /**
   * 获取热门搜索的关键字
   */
  getHotSearch() {
    return Http.request({
      url: Search.HOT_SEARCH
    });
  }

  /**
   * 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
   * @param keywords 关键词
   */
  getSearchSuggest(keywords: string) {
    return Http.request({
      url: Search.SEARCH_SUGGEST,
      data: {
        keywords,
        // 表示获取的是移动端数据
        type: "mobile"
      }
    });
  }

  /**
   * 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开
   * @param keywords
   */
  getSearch(keywords: string[], {limit = 30, offset = 0}: { limit: number, offset: number } = {limit: 30, offset: 0}) {
    return Http.request({
      url: Search.SEARCH,
      data: {
        keywords: keywords.join(""),
        limit,
        offset
      }
    });
  }
}

export default new Search;