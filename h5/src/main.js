/*
 * @Description: 
 * @Date: 2023-01-13 13:53:57
 * @LastEditTime: 2023-02-08 09:55:13
 * @Author: xinyanhui@haier.com
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import '@/assets/styles/common.css'
import 'vant/lib/index.css'


const app = createApp(App)

// app.config.globalProperties.IotSdk = () => IotSdk.getInstance();
app.use(Vant)

app.use(router)

app.mount('#app')
