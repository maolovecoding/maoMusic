// pages/detail-song/index.ts
import rankingStore from "../../store/ranking-store"
import {SongMenu} from "../../service/song-menu";

const songMenu = new SongMenu;
Page({
  data: {
    ranking: "",
    type: "",
    songInfo: {},
    // 歌单的全部歌曲
    allSong: [],
  },

  /**
   *
   * @param ranking 榜单类型
   * @param type 类型：是榜单数据 还是歌单数据 等等
   * @param id 歌单id
   */
  onLoad({ranking, type, id}) {
    this.setData({type});

    if (type === "menu") {
      console.log(id);
      // 该接口请求的数据不全 用下一个接口 请求当前歌单的全部数据
      songMenu.getSongMenuDetail(id!).then(res => {
        console.log(res.data.playlist);
        this.setData({
          songInfo: res.data.playlist
        });
      });
      songMenu.getSongMenuTrackAll(id!).then(result => {
        console.log(result.data);
        this.setData({
          allSong: result.data.songs
        });
      })
    } else if (type === "rank") {
      this.setData({ranking});
      rankingStore.onState(ranking!, this.getRankingData);
    }
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 取消数据监听
    this.data.ranking && rankingStore.offState(this.data.ranking, this.getRankingData);
  },

  getRankingData(res) {
    console.log(res);
    this.setData({
      songInfo: res
    });
  },
})