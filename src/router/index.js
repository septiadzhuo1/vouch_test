import Router from 'vue-router';
import AppHome from '../components/AppHome'
import ChatRoom from '../components/ChatRoom'
import Vue from 'vue';

Vue.use(Router);


const router = new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            name: '/',
            component: AppHome,
        },
        {
            path:'/chatroom',
            name:'chatroom',
            component:ChatRoom
        }
    ]
})

export default router