import request from '@/utils/request'
import { getToken, getCookie } from '@/utils/auth'

export function getShopData(data) {
  const req = {
    url: 'dashboard',
    action: 'query',
    check: true,
    uniIdToken: getToken(),
    data: data,
    shopId: getCookie('shopId')
  }
  return request({
    url: '',
    method: 'post',
    data: req
  })
}

export function getTodoData(data) {
  const req = {
    url: 'dashboard',
    action: 'queryOne',
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

export function getGoodsData(data) {
  const req = {
    url: 'dashboard',
    action: 'queryTwo',
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

export function getOrderData(data) {
  const req = {
    url: 'dashboard',
    action: 'queryThree',
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

export function getUserData(data) {
  const req = {
    url: 'dashboard',
    action: 'queryFour',
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
