import layoutHeaderAside from '@/layout/header-aside'

const meta = {requiresAuth: true}

export default {
   path: '/admin/orders',
   name: 'admin/orders',
   meta,
   redirect: {name: 'admin-orders'},
   component: layoutHeaderAside,
   children: (pre => [
      {path: 'orders', name: `${pre}`, component: () => import('@/pages/admin/orders'), meta: {meta, title: '订单列表'}},
      {path: 'reward', name: `${pre}-reward`, component: () => import('@/pages/admin/orders/reward'), meta: {meta, title: '提现列表'}}
   ])('admin-orders')
}