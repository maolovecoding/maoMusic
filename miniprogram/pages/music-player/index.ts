// pages/music-player/index.ts
import music from "../../service/music";
import {navigationBarHeight} from "../../constant/index";
import {musicPlayerStore} from "../../store/music-player-store";
import my from "../../service/my";
import audioContext from "../../store/audio-context";
import {parseLyric} from "../../utils/parse-lyric";

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
    loveMusicIds: [] as number[],
    // 显示布局一 还是布局二 false 显示QQ
    showWYXOrQQ: false,
    // 歌曲时长 毫秒
    durationTime: 0,
    // 歌曲当前播放到的时间
    currentTime: 0,
    // 进度条播放的进度
    sliderValue: 0,
    // 滑块是否正在改变
    isSliderChanging: false,
    // songLyric 歌词
    songLyric: [] as { time, text }[],
    // 评论
    songComments: {} as any,
    // 当前行歌词
    currentLineLyric: "",
    // 歌曲暂停
    isPaused: false,
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
  /**
   * 获取音乐相关的数据
   * @param id 音乐id
   */
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
    musicPlayerStore.dispatch("getLoveMusicIds");
    console.log(res1);
    console.log(res2);
    console.log(res3);
    console.log(res4.data);
    this.setData({
      // 设置音乐相关信息
      currentSong: res4.data.songs[0],
      // 歌曲时长
      durationTime: res4.data.songs[0].dt,
      // 设置歌词
      songLyric: parseLyric(res3.data.lrc.lyric),
    });
    this.setData({
      // 防止粗细 null undefined
      title: this.data.currentSong.name + (this.data.currentSong.alia[0] ?? "") + "     "
    });
    wx.nextTick(() => {
      this.horseRaceLamp("title");
    });
    // 获取到所有的喜欢音乐的列表 包含所有的音乐的id
    musicPlayerStore.onState("loveMusicIds", (val: number[]) => {
      this.setData({
        loveMusicIds: val
      });
      // 获取当前歌曲 是否是用户喜欢的歌曲
      if (this.data.loveMusicIds.includes(Number.parseInt(id)))
        this.setData({isLove: true});
    });
    // 音乐地址
    console.log(res1.data.data[0].url);
    // 将地址给音频对象
    this.setMusicPlay(res1.data.data[0].url);
  },
  /**
   * 音乐播放
   * @param url
   */
  setMusicPlay(url: string) {
    // 音乐播放前 停止上一首歌的播放
    audioContext.stop();
    audioContext.src = url;
    // 在音乐解析 完成后 播放
    audioContext.onCanplay(() => {
      audioContext.play();
    });
    // 监听音乐播放时 时间的更新
    audioContext.onTimeUpdate(() => {
      // 滑块正在滑动时 我们不计算时间的更新 和滑块所处的进度位置
      if (this.data.isSliderChanging) return;
      // 拿到的时间是秒为单位 转为 ms
      const currentTime = audioContext.currentTime * 1000;
      // 获取到进度条的位置
      const sliderValue: number = currentTime / this.data.durationTime * 100;
      // 设置当前时间
      this.setData({currentTime, sliderValue});
      // 查找当前播放进度时的歌词
      let lyricText = "";
      for (let i = 0; i < this.data.songLyric.length; i++) {
        const lyricInfo = this.data.songLyric[i];
        if (currentTime < lyricInfo.time) {
          console.log(i);
          lyricText = this.data.songLyric[i - 1].text;
          break;
        }
      }
      if (this.data.currentLineLyric !== lyricText) this.setData({currentLineLyric: lyricText});
    });
  },
  /**
   * 歌曲播放进度条改变时 触发
   * @param e
   */
  onSliderChange({detail}) {
    console.log(detail.value);
    // 拿到进度 计算当前应该播放的歌曲的当前时间
    const currentTime = this.data.durationTime * detail.value / 100;
    // TODO 防止出现进度条乱跳 在设置需要跳转到歌曲播放的进度位置时 先停止当前歌曲的播放
    audioContext.pause();
    // 让歌曲跳转到需要播放的时间
    audioContext.seek(currentTime / 1000);
    // 记录最新的进度  TODO 当滑块不再滑动时 也会触发该事件 所以修改正在滑动滑块变量
    this.setData({sliderValue: detail.value, isSliderChanging: false,isPaused:false});
  },
  /**
   * 滑块拖拽过程中触发
   * @param detail
   */
  onSliderChanging({detail}) {
    // 计算当前播放时间
    const currentTime = this.data.durationTime * detail.value / 100;
    // 设置滑块正在改变
    this.setData({isSliderChanging: true, currentTime, sliderValue: detail.value});
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
   * 喜欢 还是取消喜欢当前这首歌
   * @constructor
   */
  HandleLoveOrDisLove() {
    // 不喜欢的时候 点击了 歌曲状态变成喜欢
    my.setMusicLikeOrDislike(this.data.currentSong.id, !this.data.isLove).then(res => {
      console.log(res);
    })
  },
  /**
   * 歌曲暂停
   */
  onMusicToPause(){
    audioContext.pause();
    this.setData({isPaused:true});
  },
  /**
   * 歌曲播放
   */
  onMusicToPlay(){
    audioContext.play();
    this.setData({isPaused:false});
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