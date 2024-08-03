import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { firestore, auth } from 'boot/firebase'


Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE || 'history',
  base: process.env.VUE_ROUTER_BASE || '/'
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const user = auth.currentUser

  if (!requiresAuth) {
    next()
  } else if (requiresAuth && !user) {
    next('/login')
  } else if (requiresAuth && user) {
    try {
      const userDoc = await firestore.collection('staff_management').doc(user.email).get()
      const userData = userDoc.data()
      if (to.meta.role === userData.role) {
        next()
      } else {
        next('/')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      next('/')
    }
  } else {
    next()
  }
})

export default router
