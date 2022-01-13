// pages/home-my/index.ts
import my from "../../service/my";
// import music from "../../service/music";
import userPlaylist from "../../service/user-playlist";
import {myLoveMusicStore} from "../../store/my-love-music-store";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {},
    // 用户等级
    userLevel: {},
    // vip info
    vipInfo: {},
    // love music
    myLoveMusic: {} as any,
    // 激活的 tab
    activeTabIndex: "0",
    // 创建的歌单
    createdMenu: [] as any[],
    //  收藏的歌单
    keepMenu: [] as any[],
    // 宫格区域展示的数据
    grid: ["recently", "downloaded", "air", "bug", "friend", "keep", "get-friend", "add"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getUserInfo();
    this.getSongDetail();
  },
  onShow(): void | Promise<void> {
    this.onLoad();
  },
  /**
   * 去往最近播放页面
   * @param e
   */
  recentlyClick(e) {
    console.log(e);
    // 去往最近播放页面
    wx.navigateTo({
      url: "/pages/recent-play/index"
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
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
  },
  /**
   * 去往我喜欢的音乐歌单
   * @param e
   */
  loveSongClick() {
    console.log(this.data.myLoveMusic)
    wx.navigateTo({
      url: `/pages/love-music-detail/index`
    });
  },
  /**
   * tab 切换回调
   * @param e
   */
  tabChange(e) {
    console.log(e, e.target.dataset.index);
    this.setData({
      activeTabIndex: e.target.dataset.index
    });
  },
  /**
   * 歌单 tab 栏 滚动到当前页面视图的顶部时
   */
  songMenuTabScrollToTop() {
    wx.createSelectorQuery().select(".song-menu-tab").boundingClientRect(rect => {
      console.log(rect, rect.top);
      wx.pageScrollTo({
        // selector: ".song-menu-tab",
        scrollTop: 0,
        duration: 200
      }).then(res => {
        console.log(res);
      })
    })
  },
  getUserInfo() {
    my.login().then(res => {
      console.log(res);
      this.setData({
        userInfo: res
      });
    });
    my.getUserLevel().then(res => {
      console.log(res.data);
      this.setData({
        userLevel: res.data
      });
    });
    my.getUserVipInfo().then(res => {
      console.log(res.data.data);
      this.setData({
        vipInfo: res.data.data
      })
    });

  },
  getSongDetail() {
    // my.getUserLikeList().then(res => {
    //   console.log(res.data);
    //   this.setData({
    //     ids: res.data.ids
    //   });
    //   // 没有点击我的喜欢 只需要获取第一条喜欢的音乐详情数据
    //   return music.getMusicDetail([res.data.ids[0]]);
    // }).then(res => {
    //   console.log(res.data);
    //   return music.getMusicUrl([res.data.songs[0].id])
    // }).then(res => {
    //   console.log(res);
    // });
    // 获取我喜欢的音乐歌单
    userPlaylist.getUserPlayList({limit: 1}).then(res => {
      // console.log(res.data.playlist);
      this.setData({
        myLoveMusic: res.data.playlist[0]
      });
      // 将我喜欢的音乐 歌单 进行数据状态管理
      myLoveMusicStore.setState("loveMusic", this.data.myLoveMusic);
      const uid = wx.getStorageSync("uid");
      // 要注意 userId 是数字  而我们的uid现在是字符串
      //   createdMenu 创建的歌单    keepMenu 收藏的歌单
      const keepMenu = [] as any[];
      const createdMenu = (res.data.playlist.slice(1) as any[]).filter(menu => {
        if (menu.userId == uid) return true;
        keepMenu.push(menu);
        return false;
      });
      console.log(createdMenu);
      this.setData({
        createdMenu: createdMenu,
        keepMenu
      });
    });
  }
});
