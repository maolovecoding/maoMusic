// pages/music-player/index.ts
import music from "../../service/music";
import {lyricScrollTop, navigationBarHeight} from "../../constant/index";
import {musicPlayerStore} from "../../store/music-player-store";
import my from "../../service/my";
import audioContextPlayerStore, {playerStore} from "../../store/audio-context-player-store";
// import {parseLyric} from "../../utils/parse-lyric";
const playModeIconList = ["order", "repeat", "random"];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    // 歌曲标题
    title: "",
    currentSong: {} as any,
    // 歌曲时长 毫秒
    durationTime: 0,
    // 歌曲当前播放到的时间
    currentTime: 0,
    // songLyric 歌词
    songLyric: [] as { time, text }[],
    // 当前行歌词
    currentLineLyric: "",
    // 当前行歌词在所有歌词数组中的索引
    currentLineLyricIndex: 0,

    // 0 表示歌曲页  1 表示歌词页
    currentPageIndex: 0,
    // 使用swiper作为内容区的展示 动态计算剩余屏幕的高度
    contentHeight: 0,
    // 当前播放的音乐 是否是用户喜欢的音乐
    isLove: false,
    // 是否正在播放
    isPlaying: true,
    // 用户喜欢的音乐的列表 ids
    loveMusicIds: [] as number[],
    // 显示布局一 还是布局二 false 显示QQ
    showWYXOrQQ: false,
    // 进度条播放的进度
    sliderValue: 0,
    // 滑块是否正在改变
    isSliderChanging: false,

    // 评论
    songComments: {} as any,
    // 歌曲暂停
    isPaused: false,
    // 显示布局2的歌词
    isShowLyric: false,
    // 歌词每次需要向上滚动的高度
    lyricScrollTop,
    // 播放模式
    playModeIndex: 0,
    // 播放模式对应的图标名称
    playModeIcon: "order",
    // 模式列表
    // playModeIconList: ["order","repeat","random"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({id}) {
    // 发起网络请求 获取歌曲播放相关数据 并开始播放音乐 TODO 在跳转到本页面的时候 就会发起请求了
    // playerStore.dispatch("playMusicWithSongIdAction", {id});
    // 将获取到的共享数据 设置当data中
    this.setupPlayStoreListener();
    this.setData({id});
    // 获取音乐数据
    this.getMusicInfo(id);
    // 计算内容高度
    this.getContentHeight();
  },
  /**
   * 监听共享数据的改变
   */
  setupPlayStoreListener() {
    // 1. 监听歌曲请求数据的相关变化
    playerStore.onStates(["currentSong", "durationTime", "songLyric", "title"],
        ({
           currentSong,
           durationTime,
           songLyric,
           title,
         }) => {
          console.log(currentSong, durationTime, songLyric)
          if (currentSong) this.setData({currentSong});
          if (durationTime) this.setData({durationTime});
          if (songLyric) this.setData({songLyric});
          // 标题跑马灯 一般只会监听一次改变 标题获取到以后就不会改变，跑马灯是在本页面做的
          if (title) this.setData({title});
        });
    //  监听 歌曲播放时数据的相关变化
    playerStore.onStates(["currentTime", "currentLineLyric", "currentLineLyricIndex"],
        ({
           currentTime,
           currentLineLyric,
           currentLineLyricIndex,
         }) => {
          // 1. 时间变化操作
          if (currentTime && !this.data.isSliderChanging) {
            // 获取到进度条的位置
            const sliderValue: number = currentTime / this.data.durationTime * 100;
            this.setData({currentTime, sliderValue});
          }
          // 歌词发生改变
          if (currentLineLyric) this.setData({currentLineLyric});
          // 当前行歌词索引发生改变时 设置 也需要设置当前行需要上滑的距离
          if (currentLineLyricIndex) this.setData({
            currentLineLyricIndex,
            lyricScrollTop: currentLineLyricIndex * lyricScrollTop
          });
        });
    // 监听播放模式的改变 播放状态的改变
    playerStore.onState("playModeIndex", playModeIndex => {
      console.log(playModeIndex);
      this.setData({playModeIndex, playModeIcon: playModeIconList[playModeIndex]});
    });
    playerStore.onState("isPlaying", isPlaying => {
      this.setData({isPlaying});
    });
  },
  /**
   * 获取音乐相关的数据
   * @param id 音乐id
   */
  async getMusicInfo(id) {
    // 1. 音乐 url
    // const res1 = await music.getMusicUrl([id]);
    // 2. 音乐 评论
    const res2 = await music.getMusicComments(id);
    // 3. 歌词
    // const res3 = await music.getMusicLyric(id);
    // 4. 歌曲详情
    // const res4 = await music.getMusicDetail([id]);
    // 5. 发起请求 获取用户喜欢的所有的音乐列表的ids TODO 放在这个不是很合适 不需要每次都请求 反而只需要请求一次
    musicPlayerStore.dispatch("getLoveMusicIds");
    // console.log(res1);
    console.log(res2);
    // console.log(res3);
    // console.log(res4.data);
    // this.setData({
    //   // 设置音乐相关信息
    //   currentSong: res4.data.songs[0],
    //   // 歌曲时长
    //   durationTime: res4.data.songs[0].dt,
    //   // 设置歌词
    //   songLyric: parseLyric(res3.data.lrc.lyric),
    // });
    // this.setData({
    //   // 防止出现 null undefined
    //   title: this.data.currentSong.name + (this.data.currentSong.alia[0] ?? "") + "     "
    // });
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
    // console.log(res1.data.data[0].url);
    // 将地址给音频对象
    // this.setMusicPlay(res1.data.data[0].url);
    // this.setMusicPlay();
  },
  /**
   * 音乐播放
   * @param url
   */
  setMusicPlay(url: string) {
    console.log(url);
    // 音乐播放前 停止上一首歌的播放
    // audioContextPlayerStore.stop();
    // audioContextPlayerStore.src = url;
    // // 在音乐解析 完成后 播放
    audioContextPlayerStore.onCanplay(() => {
      audioContextPlayerStore.play();
    });
    // 监听音乐播放时 时间的更新
    audioContextPlayerStore.onTimeUpdate(() => {
      // 滑块正在滑动时 我们不计算时间的更新 和滑块所处的进度位置
      if (this.data.isSliderChanging) return;
      // 拿到的时间是秒为单位 转为 ms
      const currentTime = audioContextPlayerStore.currentTime * 1000;
      // 获取到进度条的位置
      const sliderValue: number = currentTime / this.data.durationTime * 100;
      // 设置当前时间
      this.setData({currentTime, sliderValue});

      if (!this.data.songLyric?.length) return;

      // 查找当前播放进度时的歌词
      let lyricText = "";
      let currentLineLyricIndex;
      for (let i = 0; i < this.data.songLyric.length; i++) {
        const lyricInfo = this.data.songLyric[i];
        if (currentTime < lyricInfo.time) {
          // console.log(i);
          currentLineLyricIndex = i - 1;
          lyricText = this.data.songLyric[currentLineLyricIndex].text;
          break;
        }
      }
      if (this.data.currentLineLyric !== lyricText) this.setData({
        currentLineLyric: lyricText,
        currentLineLyricIndex,
        lyricScrollTop: currentLineLyricIndex * lyricScrollTop
      });
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
    audioContextPlayerStore.pause();
    // 让歌曲跳转到需要播放的时间
    audioContextPlayerStore.seek(currentTime / 1000);
    // 记录最新的进度  TODO 当滑块不再滑动时 也会触发该事件 所以修改正在滑动滑块变量
    this.setData({sliderValue: detail.value, isSliderChanging: false, isPaused: false});
    playerStore.setState("isPlaying", true);
  },
  /**
   * 滑块拖拽过程中触发
   * @param detail
   */
  onSliderChanging({detail}) {
    // 计算当前播放时间
    const currentTime = this.data.durationTime * detail.value / 100;
    // 设置滑块正在改变
    // sliderValue: detail.value  滑块虽然改变 但是我们这里不能将滑块的值设置，不然会出现进度条乱跳
    this.setData({
      isSliderChanging: true, currentTime,
      // sliderValue: detail.value
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
  onMusicToPause() {
    // audioContextPlayerStore.pause();
    this.setData({isPaused: true});
    // playerStore.setState("isPlaying", false);
    playerStore.dispatch("changeMusicPlayStatusAction");
  },
  /**
   * 歌曲播放
   */
  onMusicToPlay() {
    // audioContextPlayerStore.play();
    this.setData({isPaused: false});
    // playerStore.setState("isPlaying", true);

    playerStore.dispatch("changeMusicPlayStatusAction");

  },
  /**
   * 播放状态的切换
   */
  onPlayStatusChange() {
    // if (this.data.isPaused) this.onMusicToPlay();
    // else this.onMusicToPause();

    if (this.data.isPlaying) this.onMusicToPause();
    else this.onMusicToPlay();

    // playerStore.dispatch("changeMusicPlayStatusAction");
  },
  /**
   * 播放模式的切换 单曲循环 随机 顺序
   */
  onPlayModeChange() {
    // 改变模式的值
    playerStore.setState("playModeIndex", (this.data.playModeIndex + 1) % 3);
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