// pages/music-player/index.ts
import music from "../../service/music";
import {navigationBarHeight} from "../../constant/index";
import {musicPlayerStore} from "../../store/music-player-store";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSong: {} as any,
    // 0 表示歌曲页  1 表示歌词页
    currentPageIndex: 0,
    // 使用swiper作为内容区的展示 动态计算剩余屏幕的高度
    contentHeight: 0,
    // 歌曲标题
    title: "",
    // 当前播放的音乐 是否是用户喜欢的音乐
    isLove: false,
    // 是否正在播放
    isPlaying: true,
    // 用户喜欢的音乐的列表 ids
    loveMusicIds: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({id}) {
    // 获取音乐数据
    this.getMusicInfo(id);
    // 计算内容高度
    this.getContentHeight();
  },

  async getMusicInfo(id) {
    // 1. 音乐 url
    const res1 = await music.getMusicUrl([id]);
    // 2. 音乐 评论
    const res2 = await music.getMusicComments(id);
    // 3. 歌词
    const res3 = await music.getMusicLyric(id);
    // 4. 歌曲详情
    const res4 = await music.getMusicDetail([id]);
    // 5. 发起请求 获取用户喜欢的所有的音乐列表的ids TODO 放在这个不是很合适 不需要每次都请求 反而只需要请求一次
    // musicPlayerStore.dispatch("getLoveMusicIds");
    console.log(res1);
    console.log(res2);
    console.log(res3);
    console.log(res4.data);
    this.setData({
      currentSong: res4.data.songs[0],
    });
    this.setData({
      // 防止粗细 null undefined
      title: this.data.currentSong.name + (this.data.currentSong.alia[0] ?? "")  + "     "
    });
    wx.nextTick(() => {
      this.horseRaceLamp("title");
    });
    // 获取到所有的喜欢音乐的列表 包含所有的音乐的id
    musicPlayerStore.onState("loveMusicIds", (val) => {
      this.setData({
        loveMusicIds: val
      });
    });
  },
  /**
   * 获取 swiper 内容的高度
   */
  getContentHeight() {
    const {screenHeight, statusBarHeight} = getApp().globalData;
    this.setData({
      // 44 导航栏的高度
      contentHeight: screenHeight - statusBarHeight - navigationBarHeight
    });
  },
  /**
   * swiper-item 内容发生改变 也就是切换轮播页时触发
   * @param e
   */
  swiperItemChange({detail}) {
    // current 就是切换后的 index 在歌曲和歌词之间切换
    const {current} = detail;
    this.setData({
      currentPageIndex: current
    });
  },

  /**
   * 跑马灯特效
   */
  horseRaceLamp(field: string) {
    if (this.data[field]?.length >= 10)
      setInterval(() => {
        this.setData({
          [field]: this.data[field].slice(1) + this.data[field][0]
        });
      }, 600);
  },
  /**
   * 返回上个页面
   * @param e
   */
  backUpPage(e) {
    console.log(e);
    // 返回上个页面
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})