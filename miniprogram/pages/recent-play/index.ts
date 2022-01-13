// pages/recent-play/index.ts
import my from "../../service/my";
import video from "../../service/video";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 最近播放的歌曲
    recentSongs: [],
    // 最近播放的mv
    recentMvs: [],
    // 手机状态栏的高度
    statusBarHeight: getApp().globalData.statusBarHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getPageData();
  },
  /**
   * 获取页面数据
   */
  getPageData() {
    // 获取最近播放歌曲
    my.getRecentSongs().then(res => {
      console.log(res.data.data);
      this.setData({
        recentSongs: res.data.data.list
      });
    });
    // 获取最近播放的mv
    video.getRecentMv().then(res => {
      // console.log(res.data);
      this.setData({
        recentMvs: res.data.data.list
      });
    });
  },
  /**
   * 返回上个页面
   */
  onClickLeft() {
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