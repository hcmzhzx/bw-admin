import request from '@/plugin/axios'

export function httpGet (url, params = {}) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function httpPost (url, data = {}) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function httpPat (url, data = {}) {
   return request({
      url,
      method: 'patch',
      data
   })
}

export function httpPut (url, data = {}) {
   return request({
      url,
      method: 'put',
      data
   })
}

export function httpDel (url, data = {}) {
   return request({
      url,
      method: 'delete',
      data
   })
}