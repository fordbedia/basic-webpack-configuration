import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Users from './components/Users.vue'

require('./assets/scss/index.scss')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/Users',
      component: Users
    }
  ]
})

new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')


// new Vue({
//   el: '#app',
//   router
// })
