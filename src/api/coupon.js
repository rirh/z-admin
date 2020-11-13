import request from '@/utils/request'
import { getToken, getCookie } from '@/utils/auth'

export function getData(data) {
  const req = {
    url: 'coupon',
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

export function delData(data) {
  const req = {
    url: 'coupon',
    action: 'del',
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
