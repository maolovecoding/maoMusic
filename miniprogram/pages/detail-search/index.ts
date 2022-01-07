// pages/detail-search/index.ts
import search from "../../service/search";

Page({
  data: {
    // 热词
    hotKeywords: [],
    // 搜索建议
    suggestSongs: [],
    // 搜索的关键字
    searchKeyword: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getPageData();
  },
  /**
   * 加载页面数据
   */
  getPageData() {
    search.getHotSearch().then(res => {
      // console.log(res.data.result.hots);
      this.setData({
        // 热词
        hotKeywords: res.data.result.hots
      });
    });
  },
  /**
   * 搜索框内容发生改变时 触发的回调函数
   * @param detail 搜索内容
   */
  searchDetail({detail}) {
    this.setData({
      searchKeyword: detail
    });
    detail = (detail as string).trim();
    if (!detail) {
      // 清空建议数据
      this.setData({
        suggestSongs: []
      });
      return;
    }

    // TODO 向服务器查询数据之前 可以先查询缓存中 是否具有该数据
    search.getSearchSuggest(detail).then(res => {
      console.log(res.data.result.allMatch);
      this.setData({
        suggestSongs: res.data.result.allMatch
      });
    });
  },

})