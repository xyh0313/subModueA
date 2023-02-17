/*
 * @Description: 
 * @Date: 2023-01-30 11:33:49
 * @LastEditTime: 2023-02-17 14:32:38
 * @Author: xinyanhui@haier.com
 */
import home from '@/views/home.vue'
import about from '@/views/about.vue'
// import Detail from '@/view/detail.vue'
const routes = [
    {
        name: 'home',
        path: '/',
        component: home
        // component: () => import('@/view/home.vue')
    },
    {
        name: 'about',
        path: '/about',
        // component: () => import('@/view/home.vue')
        component: about,
    },

]

export default routes