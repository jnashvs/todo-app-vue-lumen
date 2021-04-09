import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
import { auth } from "./modules/auth.js";

Vue.use(Vuex)
//antes d td tem d export constant store e la na main.js importal
//const store -> pode ser acessado globalmente: this.$store
// ex: acessat state-> this.$store.state.todos
export const store = new Vuex.Store({
  modules: {
    auth
  },
  state: {
    token: localStorage.getItem('token') || '',
    modal_active: false,
    editing: false,
    filter: 'all',
    todo: {
      'id': '',
      'title': '',
      'subtitle': '',
      'action': '',
      'completed': false,
    },
    todos: []
  },
  getters: {
    all_todos(state) {
      return state.todos
    },
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0
    },
    tasksFiltered(state) {
      // if (state.filter == 'all') {
      //   return state.todos
      // } else if (state.filter == 'active') {
      //   return state.todos.filter(todo => !todo.completed)
      // } else if (state.filter == 'completed') {
      //   return state.todos.filter(todo => todo.completed)
      // }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    addTask(state, todo) {
      state.todos.push({
        id: todo.id,
        action: todo.action,
        subtitle: todo.subtitle,
        title: todo.title,
        completed: todo.checked,
      })

      state.editing = false
    },
    updateTask(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'subtitle': todo.subtitle,
        'action': todo.action,
        'completed': todo.completed,
      })

      state.editing = false
    },
    deleteTask(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    retrieveTasks(state, todos) {
      state.todos = todos
    },
    logout(state) {
      state.status = ''
      state.token = ''
      localStorage.removeItem('token')
    },
  },
  actions: {
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
          .then(response => {
            context.commit('retrieveTasks', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    retrieveTasks(context) {

      axios.defaults.headers.common['Authorization'] = 'Bearer ' +context.state.token

      axios.get('/tasks')
        .then(response => {
          context.commit('retrieveTasks', response.data)
        })
        .catch(error => {
          console.log(error.name)
          context.commit('logout')
        })
    },
    addTask(context, todo) {
      axios.post('/task', todo)
        .then(response => {
          context.commit('addTask', response.data)
          console.log('add sucessfully')
        })
        .catch(error => {
          console.log(error.name)
          context.commit('logout')
        })
    },
    updateTask(context, todo) {
      axios.put('/task/'+todo.id, todo)
        .then(response => {
          context.commit('updateTask', todo)
          console.log(response.status)
        })
        .catch(error => {
          console.log(error.name)
          context.commit('logout')
        })
    },
    deleteTask(context, id) {
      axios.delete('/task/' + id)
        .then(response => {
          context.commit('deleteTask', id)
          console.log(response.status)
        })
        .catch(error => {
          console.log(error.name)
          context.commit('logout')
        })
    },
    checkAll(context, checked) {
      setTimeout(() => {
        context.commit('checkAll', checked)
      }, 100)
    },
    updateFilter(context, filter) {
      setTimeout(() => {
        context.commit('updateFilter', filter)
      }, 100)
    },
    clearCompleted(context) {
      setTimeout(() => {
        context.commit('clearCompleted')
      }, 100)
    }
  }
})