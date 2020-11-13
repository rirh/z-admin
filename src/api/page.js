import request from '@/utils/request'
import { getToken, getCookie } from '@/utils/auth'

export function getData(data) {
  const req = {
    url: 'page',
    action: 'query',
    check: true,
    uniIdToken: getToken(),
    shopId: getCookie('shopId'),
    data: data
  }
  return request({
    url: '',
    method: 'post',
    data: req
  })
}

export function addData(data) {
  const req = {
    url: 'page',
    action: 'add',
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

export function editData(data) {
  const req = {
    url: 'page',
    action: 'edit',
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
    url: 'page',
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
