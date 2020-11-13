import request from '@/utils/request'

export function getShopData(data) {
  const req = {
    url: 'shop',
    action: 'queryOne',
    check: false,
    data: data
  }
  return request({
    url: '',
    method: 'post',
    data: req
  })
}
