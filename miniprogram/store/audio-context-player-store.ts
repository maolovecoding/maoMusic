/**
 * @FileName: audio-context-player-store.ts
 * @Description: 单例 全局唯一的音频播放对象
 * @author 毛毛
 * @date 2022-01-13 10:13
 */
import music from "../service/music";
import {HYEventStore as EventStore} from "hy-event-store";
import {parseLyric} from "../utils/parse-lyric";


const audioContextPlayerStore = wx.createInnerAudioContext();
export default audioContextPlayerStore;

export const playerStore = new EventStore({
  state: {
    id: "",
    currentSong: {} as any,
    // 歌曲时长 毫秒
    durationTime: 0,
    // 歌曲当前播放到的时间
    currentTime: 0,
    // songLyric 歌词
    songLyric: [] as { time, text }[],
    // 当前行歌词
    currentLineLyric: "",
    // 当前行歌词在所有歌词数组中的索引
    currentLineLyricIndex: 0,
    // 歌曲标题
    title: "",
    // 播放模式 0 单曲循环  1 顺序  2 随机
    playModeIndex: 0,
    //  是否正在播放
    isPlaying: false,
  },
  actions: {
    /**
     * 获取音乐数据
     * @param ctx
     * @param id
     */
    playMusicWithSongIdAction(ctx, {id}) {
      // 同一首歌
      if (!id || ctx.id === id) return;
      // 播放状态
      ctx.isPlaying = true;
      // 4. 歌曲详情
      music.getMusicDetail([id]).then(res => {
        console.log(res);
        ctx.id = id;
        // 设置音乐相关信息
        ctx.currentSong = res.data.songs[0];
        // 歌曲时长
        ctx.durationTime = res.data.songs[0].dt;
        // 歌曲标题
        ctx.title = ctx.currentSong.name + (ctx.currentSong.alia[0] ?? "") + "     "
      });
      music.getMusicLyric(id).then(res => {
        // 设置歌词
        ctx.songLyric = parseLyric(res.data.lrc.lyric);
      });
      // 1. 音乐 url  TODO  音乐播放三部曲
      music.getMusicUrl([id]).then(res => {
        // 音乐地址
        const url = res.data.data[0].url;
        // 音乐播放前 停止上一首歌的播放
        audioContextPlayerStore.stop();
        audioContextPlayerStore.src = url;
        // 在音乐解析 完成后 播放 设置自动播放 其实还是等待歌曲解析到可以播放为止  才能播放
        audioContextPlayerStore.autoplay = true;
      });
      // 监听 音乐播放相关的事件
      (this as any).dispatch("setupAudioContextListener");
    },
    /**
     * 监听音乐播放
     */
    setupAudioContextListener(ctx) {
      // 在音乐解析 完成后 播放
      audioContextPlayerStore.onCanplay(() => {
        audioContextPlayerStore.play();
      });
      // 监听音乐播放时 时间的更新
      audioContextPlayerStore.onTimeUpdate(() => {
        // 拿到的时间是秒为单位 转为 ms
        const currentTime = audioContextPlayerStore.currentTime * 1000;
        ctx.currentTime = currentTime;

        if (!ctx.songLyric?.length) return;

        // 查找当前播放进度时的歌词
        let lyricText = "";
        let currentLineLyricIndex;
        for (let i = 0; i < ctx.songLyric.length; i++) {
          const lyricInfo = ctx.songLyric[i];
          if (currentTime < lyricInfo.time) {
            // console.log(i);
            currentLineLyricIndex = i - 1;
            lyricText = ctx.songLyric[currentLineLyricIndex].text;
            break;
          }
        }
        if (ctx.currentLineLyricIndex !== currentLineLyricIndex) {
          ctx.currentLineLyric = lyricText;
          ctx.currentLineLyricIndex = currentLineLyricIndex;
        }
      });
    },
    /**
     * 歌曲播放暂停的切换
     * @param ctx
     */
    changeMusicPlayStatusAction(ctx) {
      ctx.isPlaying = !ctx.isPlaying;
      if (ctx.isPlaying) audioContextPlayerStore.play();
      else audioContextPlayerStore.pause();
    },
  }
});