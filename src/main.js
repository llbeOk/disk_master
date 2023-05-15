import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
//引入store
import store from './store'
//引入router
import router from './router'
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')