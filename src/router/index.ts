import Home from "../components/Home.vue";
import notFound from "../components/notFound.vue";
import {createWebHashHistory, createRouter} from 'vue-router'


const history = createWebHashHistory()
export const router = createRouter({
    history,
    routes: [
        {path: "/", component: Home},
        {path:"/:pathMatch(.*)*",component:notFound}
    ]
})