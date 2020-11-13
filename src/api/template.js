import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getData(data) {
  const req = {
    url: 'template',
    action: 'query',
    check: true,
    uniIdToken: getToken(),
    data: data
  }
  return request({
    url: '',
    method: 'post',
    data: req
  })
}

export function delData(data) {
  const req = {
    url: 'template',
    action: 'del',
    check: true,
    uniIdToken: getToken(),
    data: data
  }
  return request({
    url: '',
    method: 'post',
    data: req
  })
}
