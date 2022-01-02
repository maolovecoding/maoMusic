// pages/detail-video/index.ts
//@ts-ignore
import {Record} from "/typings/types";
import video from "../../service/video";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvUrl: Object,
    mvDetail: Object,
    mvRelatedVideo: Array,
  },

  /**
   * 生命周期函数--监听页面加载
   * @param id mv唯一标识
   */
  onLoad: function ({id}: Record) {
    // 获取页面数据
    this.getPageData(id);
  },

  getPageData(id: string) {
    // 获取mv播放地址
    video.getMvUrl(id).then(res => {
      console.log(res.data);
      this.setData({
        mvInfo: res.data.data
      })
    });
    // 获取mv的详情数据
    video.getMvDetail(id).then(res => {
      console.log(res.data.data);
      this.setData({
        mvDetail: res.data.data
      })
    });
    //获取mv的相关mv视频
    video.getRelatedMv(id).then(res => {
      console.log(res.data.data);
      this.setData({
        mvRelatedVideo: res.data.data
      })
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