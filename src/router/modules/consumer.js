import layoutHeaderAside from '@/layout/header-aside'

const meta = {requiresAuth: true}

export default {
   path: '/admin/consumer',
   name: 'admin/consumer',
   meta,
   redirect: {name: 'admin-consumer'},
   component: layoutHeaderAside,
   children: (pre => [
      {path: 'consumer', name: `${pre}`, component: () => import('@/pages/admin/consumer'), meta: {meta, title: '普通用户列表'}},
      {path: 'dealer', name: `${pre}-dealer`, component: () => import('@/pages/admin/consumer/dealer'), meta: {meta, title: '经销商列表'}},
      {path: 'userInfo', name: `${pre}-userInfo`, component: () => import('@/pages/admin/consumer/userInfo'), meta: {meta, title: '编辑/查看用户'}},
   ])('admin-consumer')
}