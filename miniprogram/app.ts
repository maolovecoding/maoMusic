// app.ts
// @ts-ignore
import {IAppOption} from "/typings/index"

App<IAppOption>({
  // 应用程序级别 共享数据
  globalData: {
    // 屏幕宽度 高度
    screenWidth: 0,
    screenHeight: 0,
  },
  onLaunch() {
    // 程序启动时 获取屏幕宽度 高度信息
    const {screenWidth, screenHeight} = wx.getSystemInfoSync();
    this.globalData.screenWidth = screenWidth;
    this.globalData.screenHeight = screenHeight;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
  getInfo() {
    const {screenWidth, screenHeight} = wx.getSystemInfoSync();
    this.setData({
      screenWidth: screenWidth,
      screenHeight: screenHeight
    });
  },
})