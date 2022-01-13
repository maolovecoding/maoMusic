/**
 * @FileName: audio-context.ts
 * @Description: 单例 全局唯一的音频播放对象
 * @author 毛毛
 * @date 2022-01-13 10:13
 */

const audioContext = wx.createInnerAudioContext();
export default audioContext;