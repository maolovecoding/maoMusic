/**
 * @FileName: parse-lyric.ts
 * @Description: 解析歌词
 * @author 毛毛
 * @date 2022-01-13 11:56
 */
// @ts-ignore
// import {RegExpExecArray} from "../../typings/index"

const pattern = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
/**
 * 将字符串歌词 解析为时间和歌词 数组
 * @param lyric
 */
export const parseLyric = (lyric: string): { time, text }[] => {
  // 将歌词按照换行符分割
  const lyricStrings = lyric.split('\n');
  const lyricInfos: { time, text }[] = [];
  for (const lyricString of lyricStrings) {
    // 拿到每一行歌词时间
    //  [03:55.81]谁说站在光里的才算英雄
    // console.log(pattern.exec(lyricString))
    const res = pattern.exec(lyricString);
    if (!res) continue;
    // if (res && res instanceof RegExpExecArray) {
    // const all = res[0];
    const minute = parseInt(res[1]) * 60 * 1000;
    const second = parseInt(res[2]) * 1000;
    const millisecond: number = res[3].length === 2 ? parseInt(res[3]) * 10 : parseInt(res[3]);
    // 当前行歌词播放时所处的时间 单位 ms
    const time = minute + second + millisecond;
    // 拿到每一行歌词的文本 text
    const text = lyricString.replace(pattern, "");
    const lyricInfo = {time, text};
    lyricInfos.push(lyricInfo);
    // }

  }
  return lyricInfos;
};