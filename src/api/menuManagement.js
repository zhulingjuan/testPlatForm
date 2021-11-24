import request from '@/utils/request'
import request_self from '@/utils/request_self'

export function getTree(data) {
  return request({
    url: '/menuManagement/getTree',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request_self({
    url: '/dyn/saveDyn',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/menuManagement/doDelete',
    method: 'post',
    data,
  })
}
