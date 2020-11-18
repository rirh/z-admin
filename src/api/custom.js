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

