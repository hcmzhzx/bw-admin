import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    //url: '/get_token?code=',
    url: '/login',
    method: 'get',
    data
  })
}
