/**
 * @FileName: hy-event-store.d.ts
 * @Description: 状态管理 文件声明
 * @author 毛毛
 * @date 2022-01-05 12:38
 */
// 模块声明
declare module "hy-event-store" {
  export class HYEventBus {
  }

  export class HYEventStore {
    constructor(options: any);

    dispatch(action: string, payload?: any);

    onState(attribute: string, callback: (newVal: any) => void);

    onStates(attribute: string[], callback: (newVal: any) => void);

    setState(attribute: string, newValue: any);

    offState(attribute: string, callback: (newVal: any) => void);
  }
}