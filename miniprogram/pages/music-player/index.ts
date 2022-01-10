// pages/music-player/index.ts
import music from "../../service/music";

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({id}) {
    this.getMusicInfo(id);
  },

  async getMusicInfo(id) {
    // 音乐 url
    const res1 = await music.getMusicUrl([id]);
    // 音乐 评论
    const res2 = await music.getMusicComments(id);
    // 歌词
    const res3 = await music.getMusicLyric(id);
    console.log(res1);
    console.log(res2);
    console.log(res3);
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