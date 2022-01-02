// @ts-ignore
import {EventCallback} from "/typings/types/wx/index";
import music from "../../service/music";
import {QueryRect, Throttle} from "../../utils/index"
// 查询图片高度的函数 转为节流函数
//@ts-ignore
const ThrottleQueryRect = Throttle(QueryRect,1000);

// pages/home-music/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图高度 网络图片加载完成以后 才能获取到在当前机型下实际的图片大小
    swiperHeight: 0,
    banners: Array,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getPageData();
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

  getPageData() {
    music.getBanners().then(res => {
      console.log(res.data.banners)
      this.setData({
        banners: res.data.banners
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