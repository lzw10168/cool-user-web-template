import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useStore } from "/@/cool";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
const ignoreToken = ["/login", "/captcha"];

router.beforeEach((to, from, next) => {
	const { user } = useStore();

	if (ignoreToken.includes(to.path)) {
		next();
	} else {
		if (user.token) {
			next();
		} else {
      // TODO
			// router.login();
		}
	}
});

export default router
