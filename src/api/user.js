import request from '@/utils/request'
// import { getToken } from '@/utils/auth'

export function login(data) {
  const req = {
    url: 'user-center',
    action: 'login',
    check: false,
    data: data
  }
  return request({
    url: req.url,
    method: 'post',
    data: req
  })
}

export function adminLogin(data) {
  const req = {
    url: 'account',
    action: 'adminLogin',
    check: false,
    data: data
  }
  return request({
    url: '',
    method: 'post',
    data: req
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(data) {
  return request({
    url: data.name,
    method: 'post',
    data: data
  })
}

export function sendSmsCode(data) {
  const req = {
    url: 'account',
    action: 'sendSmsCode',
    check: false,
    data: data
  }
  return request({
    url: '',
    method: 'post',
    data: req
  })
}

export function verifyCode(data) {
  const req = {
    url: 'account',
    action: 'verifyCode',
    check: false,
    data: data
  }
  return request({
    url: '',
    method: 'post',
    data: req
  })
}

export function register(data) {
  const req = {
    url: 'account',
    action: 'register',
    check: false,
    data: data
  }
  return request({
    url: '',
    method: 'post',
    data: req
  })
}

export function iso(data) {
  return request({
    url: data.name,
    method: 'post',
    data: data
  })
}

