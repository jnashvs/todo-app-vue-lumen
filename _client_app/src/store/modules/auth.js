import axios from 'axios'
export const auth = {
    namespaced: true,
    state: {
        status: '',
        register_status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },

    mutations: {
        saveToken(state, token) {
            state.token = token
        },
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = localStorage.getItem('token') || ''
            state.user = user
        },
        register_status(state, value) {
            state.register_status = value
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
            localStorage.removeItem('token')
        },
    },

    actions: {
        login({ commit }, data) {

            return new Promise((resolve, reject) => {
                axios.post('/login', data)
                    .then(response => {
                        const token = response.data.token
                        const user = response.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },
        register({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('/register', {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                })
                    .then(response => {
                        let status = 'error'
                        commit('register_status', status)
                        resolve(response)
                    })
                    .catch(error => {
                        let status = 'error'
                        commit('register_status', status)
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },


    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
    },

};