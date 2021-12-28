import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', redirect: '/index' },
        {
            path: '/index',
            component: () =>
                import ('../view/IndexView.vue'),
            meta: { title: "首页" }
        },
        {
            path: '/china',
            name: "china",
            component: () =>
                import ('../view/ChinaDataView.vue'),
            meta: { title: "国内数据" }
        }, {
            path: "/world",
            name: "world",
            component: () =>
                import ('../view/WorldDataView.vue'),
            meta: { title: "世界数据" }
        },
        {
            path: "/guide",
            name: "guide",
            component: () =>
                import ('../view/ContainerView.vue'),
            meta: { title: "防疫指南" }
        }
    ]
})
router.beforeEach((to) => {
    document.title = to.meta.title
})
export default router