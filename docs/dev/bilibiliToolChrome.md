# bilibiliToolChrome bilibili Chrome 小插件

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=887331418&bvid=BV1cK4y1M7bN&cid=314404206&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"  style="width: 640px; height: 430px; max-width: 100%"></iframe>

## 功能

1. 开启夜间模式
2. 选中网页中的文字，可以右键直接使用b站搜索
3. 在地址栏输入bs后按下tab，输入内容可以用b站搜索
4. 在b站视频播放页面可以提取封面
5. 每日自动签到

## 如何使用？

1. 选择你的浏览器

    * 如果使用的是`Microsoft Edge`
      ，可以直接点击[链接](https://microsoftedge.microsoft.com/addons/detail/aohbpbfhcabhiofhbeecgligemcadeld)，从商店进行下载
    * 如果使用的是`chrome`，需要在扩展设置中开启`开发者模式`，然后手动加载扩展
    * 如果是其他国产浏览器，如果是基于`chromium`内核的，理论上都是可以使用的，方法同chrome

2. 目录下已经内置好了一个build成功的版本（不排除改完代码忘了打包push），如果直接加载是可以使用的，如果需要自己编辑，可以查看第3点

3. 我想自己修改扩展？

    * （v2.0.0之后的版本）扩展基于`TypeScript`编写，使用`webpack`打包，插件版本为`v3`。
    * 如果是之前接触过`v2`版本的插件，需要通过[chrome dev](https://developer.chrome.com/docs/extensions/mv3/intro/)
      了解一下变化，因为后台页面已经修改为`service work`，许多api已经发生了变化。

   ```shell
   npm i # 安装npm依赖
   npm run build # 使用 webpack5.65.0 构建，最后的代码会在dist中，剩余指令可在script中自行查看
   ```

## 更新日志

### `2.0.0 beta (branch: v2.0.0)` 2021-12-25

**本版本未合入master，暂时不会上商店，等`v3`调试稳定了同步商店**

1. 重构项目目录，重新分类文件，整个项目由`JavaScript`迁移为`TypeScript`
2. 使用`webpack`优化插件体积。
3. 插件`manifest`迁移至`v3`。
4. 更换部分老旧`chrome api`，遵循`google事件驱动模型(service work)`。替换大多数回调函数，启动和监听由异步切换为阻塞(
   `async/await or promise`)。**这是一个风险项，由于`v3`引入了es6以上的部分特性，并且使用了`service work`，`background`
   生命周期不可预估，稳定性不如`v2`版本，只解决了大部分可能影响正常使用的bug。**
5. 夜间模式实现模式由js转为注入css，优先级更高并且速度更快，如发生问题，请关闭夜间模式
6. 修复部分夜间模式的bug（pc端新版暂时0适配！！！！）

### `1.4.0` 2021-08-29

1. 增加了大会员每月b币劵和会员购优惠劵的领取，我是大会员我骄傲！！！（因为b站csrf检测origin header的关系，该功能只能打开b站页面才能使用）

### `1.3.0` 2021-08-28

时隔四个月，激动人心的1.3.0版本发布了！！！

1. 修复了夜间模式动态页评论的bug，妈妈再也不用担心我和别人对线看不见字啦
2. 夜间模式增加播放页的支持，被窝里偷偷看视频终于不会吃傻瓜蛋了
3. 新增简单夜间模式，浏览器喜欢开很多页面的小伙伴看过来，需要滚动和单击触发
4. 优化了代码逻辑（一个用java的狠补JavaScript）
5. 还修复了一些你没有看见的bug哦(\*╹▽╹\*)

### `v1.2.2`

设置页面按钮改为开关

### `v1.2.1`

修复每次开启插件签到的bug

### `v1.2.0`

增加每日签到功能，可以自动获得2硬币和辣条啦;修改初始化变量逻辑，使用chrome api优化初始化速度

### `v1.1.2`

修改监听器逻辑，优化脚本速度

### `v1.1.1`

修复了b站页面引入bootstrap而导致ui改变的问题

### `v1.1.0`

完成b站封面提取嵌入页面

### `v1.0.1`

插件设置页面的实现，登录浏览器后可同步设置

### `v1.0.0`

插件基本功能完成