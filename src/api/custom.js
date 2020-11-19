import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getUserList(data) {
  data.token = getToken()
  return request({
    url: data.name,
    method: 'post',
    data
  })
}
export function DeleteUser(data) {
  data.token = getToken()
  return request({
    url: data.name,
    method: 'post',
    data
  })
}
export function bindEmail(data) {
  data.token = getToken()
  return request({
    url: data.name,
    method: 'post',
    data
  })
}

export function bindMobile(data) {
  data.token = getToken()
  return request({
    url: data.name,
    method: 'post',
    data
  })
}

export function unbindEmail(data) {
  data.token = getToken()
  return request({
    url: data.name,
    method: 'post',
    data
  })
}

export function unbindMobile(data) {
  data.token = getToken()
  return request({
    url: data.name,
    method: 'post',
    data
  })
}

export function updateUser(data) {
  data.token = getToken()
  return request({
    url: data.name,
    method: 'post',
    data
  })
}

