import request from '@/utils/request_self'

export function getRouterList(data) {
  return request({
    url: '/dyn/getDynFrame',
    method: 'post',
    data,
  })
}

export function getRouterMenuList(data) {
  return request({
    url: '/dyn/getDynMenu',
    method: 'post',
    data,
  })
}
