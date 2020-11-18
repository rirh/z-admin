import { login, logout, getInfo, adminLogin } from '@/api/user'
import { getToken, setToken, removeToken, setCookie } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userId: '',
    user: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_USER: (state, payload) => {
    state.user = payload
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ name: 'user-center', action: 'login', username: username.trim(), password: password }).then(response => {
        console.log(response)
        commit('UPDATE_USER', response)
        commit('SET_NAME', response.username)
        commit('SET_AVATAR', response.avatarUrl)
        commit('SET_TOKEN', response.token)
        commit('SET_USER_ID', response.uid)
        setToken(response.token)
        setCookie('userId', response.uid)
        setCookie('userName', response.username)
        setCookie('token', response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // admin login
  adminLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      debugger
      adminLogin({ name: 'user-center', action: 'login', username: username.trim(), password: password }).then(response => {
        commit('SET_NAME', response.username)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_TOKEN', response.token)
        commit('SET_USER_ID', response.uid)
        setToken(response.token)
        setCookie('userId', response.uid)
        setCookie('userName', response.username)
        setCookie('token', response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({
        name: 'user-center',
        action: 'logout',
        token: getToken()
      }).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        console.log(error)
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

