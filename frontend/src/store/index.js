import { createStore } from 'vuex'
import axios from 'axios'

const SERVER_HOST = process.env.VUE_APP_SERVER_HOST

export default createStore({
  state: {
    isLoggedIn: false,
    isDesk: false,
    isStaff: false,
    isAdmin: false,
    postList: [],
  },
  mutations: {
    DESK_LOGIN(state) {
      state.isLoggedIn = true
      state.isDesk = true
    },
    STAFF_LOGIN(state) {
      state.isLoggedIn = true
      state.isStaff = true
    },
    ADMIN_LOGIN(state) {
      state.isLoggedIn = true
      state.isAdmin = true
    },
    LOGOUT(state) {
      state.isLoggedIn = false
      state.isDesk = false
      state.isStaff = false
      state.isAdmin = false
    },
    SET_POST_LIST(state, postList) {
      state.postList = postList
    },
  },
  actions: {
    desk_login({ commit }) {
      console.log('desk_login action 실행됨!')
      commit('DESK_LOGIN')
    },
    staff_login({ commit }) {
      console.log('staff_login action 실행됨!')
      commit('STAFF_LOGIN')
    },
    admin_login({ commit }) {
      console.log('admin_login action 실행됨!')
      commit('ADMIN_LOGIN')
    },
    logoutAction({ commit }) {
      commit('LOGOUT')
    },
    fetchPostList({ commit }, deskId) {
      const token = localStorage.getItem('token')
      const config = {
        Authorization: `Bearer ${token}`
      }
      axios({
        method: 'get',
        url: `${SERVER_HOST}/desk/posts?desk=${deskId}&page=1`,
        headers: config
      })
        .then(res => {
          console.log('fetchPostList 실행됨')
          console.log(res.data.data)
          commit('SET_POST_LIST', res.data.data)
        })
        .catch(err => console.error(err))
    },
  },
  modules: {
  }
})