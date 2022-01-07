// pages/detail-song/index.ts
import rankingStore from "../../store/ranking-store"
import {SongMenu} from "../../service/song-menu";

const songMenu = new SongMenu;
Page({
  data: {
    ranking: "",
    type: "",
    songInfo: {},
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
      songMenu.getSongMenuDetail(id!).then(res => {
        console.log(res.data.playlist);
        this.setData({
          songInfo: res.data.playlist
        })
      });
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