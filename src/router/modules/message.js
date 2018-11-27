import layoutHeaderAside from '@/layout/header-aside'
const meta = {requiresAuth: true}
export default {
   path: '/admin/message',
   name: 'admin/message',
   meta,
   redirect: {name: 'admin-message'},
   component: layoutHeaderAside,
   children: (pre => [
      {path: 'message', name: `${pre}`, component: () => import('@/pages/admin/message'), meta: {meta, title: '投诉或投诉文章'}},
      {path: 'submit', name: `${pre}-submit`, component: () => import('@/pages/admin/message/submit'), meta: {meta, title: '提交好文章'}},
   ])('admin-message')
}