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


## 有关插槽-想给插槽增加默认值的优雅解决方式

在使用小程序组件的slot插槽的时候，我们发现这个插槽是不能给默认值的。并不像vue和react那么好用。原因是我们不能给插槽提供默认值，在使用组件的时候传值就不显示默认值。

最简单的方式当然是使用一个布尔类型的变量，通过`wx:if`和`wx:else`来控制是显示插槽的值，还是显示组件内部的默认值。

**很明显，这个方式不优雅，不是我们大多数人所希望的。**

事实上，还是有一种方式可以优雅的解决这个问题。需要利用css的一些特性。

我们可以使用一个`empty`伪类来解决。

![image-20220104162236938](https://gitee.com/maolovecoding/picture/raw/master/images/web/wei_chat/image-20220104162236938.png)

```html
<view class="header">
    <!-- 标题  -->
    <view class="title">{{title}}</view>
    <view class="slot">
        <slot></slot>
    </view>
    <!-- 插槽不传递值的时候，则作为默认值显示 默认情况下 我们不让其显示 -->
    <view class="right">
        <text class="right-title">{{rightText}}</text>
        <!-- 图标 -->
        <image class="icon" src="../common/images/icon/arrow-right.png"/>
    </view>
</view>
```

样式采用的是less进行书写

```css
/* components/area-header/index.wxss */
.header {
  height: 80rpx;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .title {
    color: #000;
    font-weight: bold;
    font-size: 34rpx;
  }

  // 默认插槽是否显示 如果默认插槽组件内是空的，也就是没有传组件，此时<slot/>
  // 标签在渲染的时候，会消失，则slot标签的父容器此时为空
  .slot:empty + .right {
    // 插槽是空 则显示默认插槽
    display: block;
  }

  .right {
    // 默认情况 我们认为插槽会传值 则不显示
    display: none;

    .right-title {
      font-size: 28rpx;
      color: #bbb;
      line-height: 80rpx;
      text-align: center;
    }

    .icon {
      // 图片 文字对齐方式
      vertical-align: middle;
      height: 48rpx;
      width: 48rpx;
    }
  }
}
```



如果我们没有给插槽传值，则会显示下面类名为`right`的标签：

![image-20220104162236938](https://gitee.com/maolovecoding/picture/raw/master/images/web/wei_chat/image-20220104162236938.png)

**如果我们在使用组件的时候，给插槽传值了，则会显示我们传入的值：**

![image-20220104162628330](https://gitee.com/maolovecoding/picture/raw/master/images/web/wei_chat/image-20220104162628330.png)

![image-20220104162635898](https://gitee.com/maolovecoding/picture/raw/master/images/web/wei_chat/image-20220104162635898.png)

可以解决多使用变量，在给插槽传值的时候，还需要使用变量控制默认标签是否显示的问题。

