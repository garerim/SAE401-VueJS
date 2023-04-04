import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import RegisterView from '../views/RegisterView.vue'
import SignInView from '../views/SignInView.vue'
import ClubView from '../views/ClubView.vue'
import AboutView from '../views/AboutView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/account/',
      name: 'account',
      component: AccountView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/register/',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/signin/',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/club/:id',
      name: 'club',
      component: ClubView,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()){
      next();
    } else {
      alert("you don't have access")
      next("/")
    }
  } else {
    next()
  }
});

export default router
