import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '../views/TodoList.vue'
import Register from '../components/auth/Register.vue'
import Login from '../components/auth/Login.vue'
import Hello from '../components/HelloWorld.vue'
//import store from '../store/index.js'

//console.log('dentro router')

Vue.use(VueRouter)

const routes = [
  {
    path: '/hello',
    name: 'Hello',
    component: Hello,
    meta:{
      requiresAuth: true
    },
  },
  {
    path: '/',
    name: 'TodoList',
    component: TodoList,
    meta:{
      requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      requiresVisitor: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//
// const guard = function(to, from, next) {
//   // check for valid auth token
//   if(localStorage.getItem('token')){
//   axios.get('/isvalidtoken').then(response => {
//       // Token is valid, so continue
//       console.log('valid: '+response.data.valid)
//       if(response.data.valid){
//          next();
//       }else{
//         localStorage.removeItem('token')
//         window.location.href = "/login";
//       }
      
//   }).catch(error => {
//       // There was an error so redirect
//       console.log(error)
//       localStorage.removeItem('token')
//       window.location.href = "/login";
//   })
// }else{
//   next();
// }
// };

//
router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem('token') || '';

  if(to.matched.some(record => record.meta.requiresAuth)) {
    
    if (!isAuthenticated) {
      next({name: 'Login'})
    }else{
      next()
    }
    
  }
  
  if(to.matched.some(record => record.meta.requiresVisitor)) {
    
    if (isAuthenticated) {
      next({name: 'TodoList'})
    }else {
      next()
    }

  } else {
    next()
  }
  

})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// })

export default router
