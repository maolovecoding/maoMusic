// pages/detail-search/index.ts
import search from "../../service/search";
import {keywordsToNodes, debounce} from "../../utils/index";
// @ts-ignore
// TODO 进行防抖处理
search.getSearchSuggest = debounce(search.getSearchSuggest);
Page({
  data: {
    // 热词
    hotKeywords: [],
    // 搜索建议
    suggestSongs: [] as any[],
    // 搜索建议 节点 nodes 进行富文本展示
    suggestSongNodes: [],
    // 搜索的关键字
    searchKeyword: "",
    // 搜索结果 默认是搜索单曲的结果 条数 30条 {hasMore: true, songCount: 600, songs: []}
    searchResult: {}
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
        suggestSongs: [],
        // 清空上次搜索结果
        searchResult: [],
      });
      // 取消查询搜索结果的请求
      (search.getSearchSuggest as any).cancel();
      return;
    }

    // TODO 向服务器查询数据之前 可以先查询缓存中 是否具有该数据
    // 查询本地缓存 是否具有缓存的数据
    search.getSearchSuggest(detail).then(res => {
      console.log(res.data.result.allMatch);
      // if (!this.data.searchKeyword) return;
      // 搜索建议结果 一般是6条数据
      const suggestSongs = res.data.result.allMatch;
      // 将搜索结果 转为展示的富文本的nodes节点
      const suggestSongNodes = keywordsToNodes(suggestSongs, this.data.searchKeyword);
      // this.suggestSongsToNodes(suggestSongs);
      this.setData({
        // 清空上次搜索结果
        searchResult: [],
        suggestSongNodes,
        suggestSongs,
      });
      // TODO 将查询的数据缓存到本地
    });
  },
  /**
   * 搜索框事件 用户进行点击键盘确定(回车)时 触发 此时展示搜索结果 详细结果
   * @param detail 搜索内容
   */
  searchAction({detail}) {
    search.getSearch([detail]).then(res => {
      console.log(res.data.result);
      this.setData({
        // 实际结果 在属性 songs里面
        searchResult: res.data.result
      });
    });
  },
  /**
   * 点击搜索建议 触发搜索  弃用
   * @deprecated 废弃
   * @param e
   */
  suggestSongAction(e) {
    // 获取关键字 根据点击的搜索联想输入框的内容
    const index = e.currentTarget.dataset.index;
    const keyword = this.data.suggestSongs[index].keyword;
    // 将搜索框的内容 替换为我们想要搜索的关键词
    this.setData({
      searchKeyword: keyword
    });
    // 发起网络请求 获取搜索结果 借用上面的 searchAction放
    this.searchAction({detail: keyword});
    console.log(keyword);
  },
  /**
   * 点击热词搜索 触发  弃用
   * @deprecated 废弃
   * @param e
   */
  hotSongTagAction(e) {
    // 获取关键词 热词
    const keyword = e.currentTarget.dataset.keyword;
    // 将搜索框的内容 替换为我们想要搜索的关键词
    this.setData({
      searchKeyword: keyword
    });
    // 发起网络请求
    // 发起网络请求 获取搜索结果 借用上面的 searchAction放
    this.searchAction({detail: keyword});
    console.log(keyword);
  },
  /**
   * 点击热词搜索 搜索建议 时触发 二者的回调函数 进行了合并
   * @param e
   */
  keywordAction(e) {
    // 获取关键字 根据点击的搜索联想输入框的内容
    const index = e.currentTarget.dataset.index;
    const keyword = index >= 0 ?
        this.data.suggestSongs[index].keyword
        : e.currentTarget.dataset.keyword;
    // 将搜索框的内容 替换为我们想要搜索的关键词
    this.setData({
      searchKeyword: keyword,
      suggestSongs: []
    });
    // 发起网络请求 获取搜索结果 借用上面的 searchAction放
    this.searchAction({detail: keyword});
    console.log(keyword);
  },
  /**
   * 已经弃用 这里只是暂时保存
   * 将搜索建议的结果 转为进行富文本展示时的nodes节点
   * @param suggestSongs
   * @deprecated
   */
  suggestSongsToNodes(suggestSongs: any[]) {
    // 取出关键词
    const suggestKeywords: string[] = suggestSongs.map(item => item.keyword);
    const suggestSongNodes: any = [];
    for (const suggestKeyword of suggestKeywords) {
      // 一个富文本的nodes
      const nodes: any[] = [];
      if (suggestKeyword.toLowerCase().startsWith(this.data.searchKeyword.toLowerCase())) {
        // 匹配到的搜索词
        const keyword = suggestKeyword.slice(0, this.data.searchKeyword.length);
        // node1
        const node1 = {
          name: "span",
          attrs: {
            style: "color:#26ce8a; font-weight: 500;"
          },
          children: [
            {type: "text", text: keyword}
          ]
        };
        const otherword = suggestKeyword.slice(this.data.searchKeyword.length);
        const node2 = {
          name: "span",
          attrs: {
            style: "color:#000;"
          },
          children: [
            {type: "text", text: otherword}
          ]
        };
        nodes.push(node1);
        nodes.push(node2);
      } else {
        const node = {
          name: "span",
          attrs: {
            style: "color:#000;"
          },
          children: [
            {type: "text", text: suggestKeyword}
          ]
        };
        nodes.push(node);
      }
      suggestSongNodes.push(nodes);
    }
    this.setData({
      suggestSongNodes
    });
  },
})