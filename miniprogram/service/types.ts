/**
 * @FileName: types.ts
 * @Description: TODO
 * @author 毛毛
 * @date 2022-01-09 17:04
 */

/**
 * 分页参数对象
 */
export interface PageHelper {
  limit?: number;
  offset?: number;
  // 取歌单评论时的一个分页参数 取上一页和最后一项的 time 获取下一页数据（获取超过5k条评论时使用）
  before?: number
}

// export interface songMenuCommentPageHelper{
//
// }