// pages/love-music-detail/index.ts
import {myLoveMusicStore} from "../../store/my-love-music-store";
import my from "../../service/my";
import music from "../../service/music";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 我的喜欢的歌单
    loveMusicMenu: {} as any,
    // love music ids
    loveMusicIds: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // myLoveMusicStore.dispatch("getLoveMusic");
    myLoveMusicStore.onState("loveMusic", val => {
      console.log(val);
      this.setData({
        loveMusicMenu: val
      });
    });
    // 获取我喜欢的音乐 的所有音乐id组成的数组
    my.getUserLikeList().then(res => {
      console.log(res.data.ids);
      this.setData({
        loveMusicIds: res.data.ids
      });
      // 获取前一百条数据
      return music.getMusicDetail(this.data.loveMusicIds.slice(0, 100));
    }).then(res => {
      console.log(res.data.songs);
    })
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