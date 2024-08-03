
import Vue from 'vue';
import Router from 'vue-router';
import { firestore, auth } from 'boot/firebase';

// page imports
import MainLayout from 'layouts/MainLayout.vue';
import Login from 'pages/Login.vue';
import CheckIn from 'pages/CheckIn.vue';
import Admin from 'pages/Admin.vue';
import Help from 'pages/Help.vue';

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: () => import('pages/Index.vue') }, // 2 ways to import a vue page, this and the belows
      { path: 'login', component: Login },
      { path: 'check_in', component: CheckIn, meta: { requiresAuth: true, role: 'staff' } },
      { path: 'admin', component: Admin, meta: { requiresAuth: true, role: 'admin' } },
      { path: 'help', component: Help }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

const router = new Router({
  mode: 'history',
  routes
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

export default routes
