import music from "../../service/music";
import {QueryRect, Throttle} from "../../utils/index"
import rankingStore, {rankingMap} from "../../store/ranking-store"
import {SongMenu} from "../../service/song-menu"
// 热门歌单请求
const hotSongMenu = new SongMenu();
// 推荐歌单请求
const recommendSongMenu = new SongMenu("hot", "华语");
// 查询图片高度的函数 转为节流函数
//@ts-ignore
const ThrottleQueryRect = Throttle(QueryRect, 1000);

// pages/home-music/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图高度 网络图片加载完成以后 才能获取到在当前机型下实际的图片大小
    swiperHeight: 0,
    banners: Array,
    // 推荐歌曲
    recommendSongs: [],
    // 热门歌单
    hotSongMenu: [],
    // 推荐歌单
    recommendSongMenu: [],
    // 榜单数据
    rankings: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getPageData();
    // 发起共享数据的请求
    rankingStore.dispatch("getRankingDataAction");
    // 获取共享数据
    rankingStore.onState("hotRanking", (val) => {
      this.setData({
        // 推荐歌曲 只显示前六条数据
        recommendSongs: val?.tracks?.slice(0, 6)
      });
      // console.log(this.data.recommendSongs);
    });
    rankingStore.onState("newRanking", this.getRankingHandler(0));
    rankingStore.onState("originRanking", this.getRankingHandler(2));
    rankingStore.onState("upRanking", this.getRankingHandler(3));
  },

  getPageData() {
    // 获取推荐歌曲数据
    music.getBanners().then(res => {
      // console.log(res.data.banners)
      this.setData({
        banners: res.data.banners
      });
    });
    //  获取 热门歌单数据
    hotSongMenu.getSongMenu().then(res => {
      console.log(res);
      this.setData({
        hotSongMenu: res.data.playlists
      });
    });
    recommendSongMenu.getSongMenu().then(res => {
      console.log(res);
      this.setData({
        recommendSongMenu: res.data.playlists
      });
    });
  },
  /**
   * 监听图片加载完毕的回调函数
   */
  imgOnLoad() {
    // 获取图片的高度
    ThrottleQueryRect(".swiper-image").then((res: any) => {
      // 拿到矩形
      const rect = res[0];
      this.setData({
        swiperHeight: rect.height
      });
    });
  },

  searchClick() {
    //  跳转到搜索详情页
    wx.navigateTo({
      url: "/pages/detail-search/index",
    });
  },
  /**
   * 巅峰榜数据发发生改变的时候 进行数据监听的回调处理函数
   * @param idx
   */
  getRankingHandler(idx: number) {
    return (res) => {
      if (Object.keys(res)?.length === 0) return;
      const name = res?.name;
      const coverImage = res?.coverImgUrl;
      const playCount = res?.playCount;
      const songList = res.tracks?.slice(0, 3);
      // this.data.rankings.push({name, coverImage, songList})
      const rankings = {...this.data.rankings, [idx]: {name, coverImage, songList, playCount}};
      this.setData({
        rankings
      });
    }
  },
  /**
   * 更多 按钮的点击
   */
  moreClick() {
    this.navigateToDetailSongPage("hotRanking");
  },
  /**
   * 巅峰榜 点击跳转整个榜单的详情
   * @param e
   */
  rankingItemClick(e) {
    console.log(e)
    const idx = e.currentTarget.dataset.idx;
    console.log(rankingMap[idx]);
    this.navigateToDetailSongPage(rankingMap[idx]);
  },

  navigateToDetailSongPage(ranking: string) {
    wx.navigateTo({
      // 跳转详情页 类型：榜单排行
      url: `/pages/detail-song/index?ranking=${ranking}&type=rank`
    });
  },

  imgOnLoad_bak() {
    // 获取图片的高度
    // 获取组件的高度
    const query = wx.createSelectorQuery();
    // 指定组件 绑定指定组件
    query.select(".swiper-image")
        // 组件绑定为矩形
        .boundingClientRect();
    // 执行查询
    query.exec(res => {
      // 得到这个组件的相关数据 高度宽度
      const rect = res[0];
      // 拿到矩形的高度
      this.setData({
        swiperHeight: rect.height
      });
    });
  },
})