<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';
import { trackEvent } from './api/analytics';

//onLauch是uni-app声明周期钩子，应用启动时自动执行一次
onLaunch(() => {
  //发送一个应用被打开的统计事件，catch捕捉异常，就算发送失败也不报错
  trackEvent('app_open').catch(() => undefined);
});
// uni-app 框架在 编译时 做了这件事：
// 1. 你写好 pages.json 配置页面路径和 TabBar
// 2. 你写好各页面组件（如 pages/index/index.vue）
// 3. uni-app 编译器 读取 pages.json，自动生成路由表，自动把页面路径和对应组件关联起来
// 4. 当你点击底部 Tab 或调用 navigateTo 跳转时，框架根据路径找到对应的页面组件来渲染
// pages.json相当于application.yml — 配置文件，声明有哪些路由
//pages.json文件中代码解释
// tarBar为底栏导航，类似于手机app底部切换栏
// list中目前有四项按顺序为首页-历史-收藏-我的，其中pagePath对应着具体跳转的路由页面
// 路径规范：pages/模块名/模块名 — 这是 uni-app 的约定，框架会自动去找 pages/result/result.vue 这个文件，你不需要写
// import
// style 里的导航栏配置：
//   - navigationBarTitleText — 页面顶部的标题文字
//   - navigationBarBackgroundColor — 顶栏背景色（暖色米黄）
//   - navigationBarTextStyle — 标题文字颜色（黑色）
</script>

<style>
page {
  min-height: 100%;
  background: #f7efe5;
  color: #2d2925;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
}

.page {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 28rpx;
}

.section {
  margin-top: 28rpx;
}

.panel {
  background: #ffffff;
  border: 1rpx solid #d8c9b8;
  border-radius: 16rpx;
  padding: 28rpx;
}

.primary-button {
  min-height: 92rpx;
  border-radius: 18rpx;
  background: #a85f2d;
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 700;
}

.ghost-button {
  min-height: 72rpx;
  border-radius: 12rpx;
  background: #fff9f1;
  color: #a85f2d;
  font-size: 28rpx;
}

.muted {
  color: #7d746a;
}
</style>
