import layoutHeaderAside from '@/layout/header-aside'
const meta = {requiresAuth: true}
export default {
   path: '/admin/statement',
   name: 'admin/statement',
   meta,
   redirect: {name: 'admin-statement'},
   component: layoutHeaderAside,
   children: (pre => [
      {path: 'statement', name: `${pre}`, component: () => import('@/pages/admin/statement'), meta: {meta, title: '数据报表'}},
      {path: 'attract', name: `${pre}-attract`, component: () => import('@/pages/admin/statement/attract'), meta: {meta, title: '招商报表'}},
      {path: 'operation', name: `${pre}-operation`, component: () => import('@/pages/admin/statement/operation'), meta: {meta, title: '运营报表'}},
      {path: 'dealer', name: `${pre}-dealer`, component: () => import('@/pages/admin/statement/dealer'), meta: {meta, title: '经销商报表'}},
      {path: 'detail', name: `${pre}-detail`, component: () => import('@/pages/admin/statement/detail'), meta: {meta, title: '业绩详情'}},
   ])('admin-statement')
}