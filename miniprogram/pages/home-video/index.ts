import {Video} from "../../service/video";
// @ts-ignore
import {EventCallback} from "/typings/types/wx/index";

const video = new Video();
// pages/home-video/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // mv排行
    topMvs: [],
    // mv排行数据 是否还有更多
    hasMore: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {

    this.getTopMV();
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
  async onPullDownRefresh() {
    this.getTopMV();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    this.getTopMV({
      offset: this.data.topMvs?.length,
      limit: 16
    })
    // const {data} = await video.getTopMV({
    //   offset: this.data.topMvs?.length,
    //   limit: 10
    // });
    // this.setData({
    //   topMvs: this.data.topMvs.concat(data.data)
    // });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  async getTopMV(requestData = {offset: 0, limit: 16}) {
    // 没有数据 不可请求
    if (!this.data.hasMore && this.data.topMvs?.length) return;
    // 可以请求数据 展示加载动画
    wx.showNavigationBarLoading();
    const {data} = await video.getTopMV(requestData);
    console.log(data);
    this.setData({
      hasMore: data.hasMore,
      // 更新数据 是拼接 还是刷新数据
      topMvs: (this.data.hasMore && requestData.offset !== 0) ? this.data.topMvs.concat(data.data) : data.data,
    });
    // 隐藏加载动画
    wx.hideNavigationBarLoading();
    //  如果是下拉刷新数据 则请求完毕后 关闭下拉动画
    if (requestData.offset === 0 && requestData.limit === this.data.topMvs.length) {
      wx.stopPullDownRefresh();
    }
  },

  gotoVideo(e: EventCallback) {
    const id = e.detail.id;
    console.log(e, id);
    //  前往详情页面 携带视频详情id
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
    });
  }
})