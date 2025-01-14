import VueRouter from 'vue-router'
import Agent from '../view/pages/agent.vue'
import ChatHome from '../view/pages/chatHome/index.vue'
import Video from '../view/pages/video.vue'
import Lingting from '../view/pages/lingting.vue'
import Setting from '../view/pages/setting.vue'
import Home from "@/view/home.vue";

export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/ChatHome",
            component: Home,
            children: [
                {
                    path: "/ChatHome",
                    name: "ChatHome",
                    component: ChatHome,
                },
                {
                    path: "/Agent",
                    name: "Agent",
                    component: Agent,
                },
                {
                    path: "/Video",
                    name: "Video",
                    component: Video
                },
                {
                    path: "/Lingting",
                    name: "Lingting",
                    component: Lingting
                },
                {
                    path: "/Setting",
                    name: "Setting",
                    component: Setting
                },
            ]
        },
    ]
})
