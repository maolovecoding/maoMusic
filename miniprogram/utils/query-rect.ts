/**
 * @FileName: query-rect.ts
 * @Description: 查询某个矩形的信息 比如高度 宽度
 * @author 毛毛
 * @date 2022-01-01 19:23
 */
/**
 *
 * @param selector 选择器
 */
export default function (selector: string) {
  const query = wx.createSelectorQuery();
  // 指定组件 绑定指定组件
  query.select(selector)
      // 组件绑定为矩形
      .boundingClientRect();
  return new Promise<any>((resolve) => {
    // 执行查询
    // query.exec(res => {
    //   // 得到这个组件的相关数据 高度宽度
    //   resolve(res);
    // });
    query.exec(resolve);
  })
}