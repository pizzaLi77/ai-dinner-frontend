import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

export function createApp() {
  const app = createSSRApp(App); //创建一个vue应用实例
  app.use(createPinia()); //注册Pinia状态管理库，相当于给应用挂载一个全局共享的内存缓存/redis，各个组件都能读写这个全局状态
  return {
    app,
  };
}
