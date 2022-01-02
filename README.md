# 小程序项目实战--音乐播放器

## 小程序配置
### 基础库
本次我使用的小程序基础库是版本是：2.20.1。最好版本相差不大。


### 在项目中使用vant组件库
**使用vant组件库，需要先执行安装。**
```shell
npm i @vant/weapp
```
因为是在ts+less项目中。结合使用vant组件库，所以直接构建npm的时候，一般会报错。

**报错信息：**

**解决:微信小程序 Vant Weapp 没有找到可以构建的NPM包，请确认需要参与构建的npm在miniprogramroot目录**

所以我们需要在文件 `project.config.json`文件中进行配置。
配置如下：

```json
"setting":{
  // 值 需要为 true
  "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath":"./package.json",
        "miniprogramNpmDistDir": "./miniprogram/"
      }
    ],
}
```

在重新构建即可。

