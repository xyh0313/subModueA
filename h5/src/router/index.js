/*
 * @Description: 
 * @Date: 2023-01-30 11:33:30
 * @LastEditTime: 2023-02-09 13:40:34
 * @Author: xinyanhui@haier.com
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
// 不知道为啥用history模式不好使，项目部署白屏，没有报错，感觉是与服务器配置路径转发有问题
// hash模式好使
const router = createRouter({
    // mode: 'history',
    history: createWebHashHistory(),
    // history: createWebHistory(),
    base: '/iotsdk/',
    routes
})

export default router