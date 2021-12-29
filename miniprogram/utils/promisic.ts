/**
 * @FileName: promisic.ts
 * @Description: 将非promise函数 转为可使用promise函数
 * @author 毛毛
 * @date 2021-12-26 20:26
 */
// @ts-ignore
import {RequestOption} from "../../typings/types/index";

/**
 *
 * @param fn 需要转为支持promise的函数
 */
export const promisic = (fn: (...args: any) => any) => {
  // 高阶函数
  return (params: RequestOption) => {
    // 代理模式
    return new Promise((resolve, reject) => {
      //  将源对象source 合并到目标对象 target
      Object.assign(params, {
        success: (res: any) => {
          resolve(res);
        },
        fail: (res: any) => {
          reject(res);
        }
      });
      fn(params);
    });
  }
}


