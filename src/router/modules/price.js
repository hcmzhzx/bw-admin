import layoutHeaderAside from '@/layout/header-aside'

const meta = {requiresAuth: true}

export default {
   path: '/admin/price',
   name: 'admin/price',
   meta,
   redirect: {name: 'admin-price'},
   component: layoutHeaderAside,
   children: (pre => [
      {path: 'price', name: `${pre}`, component: () => import('@/pages/admin/price'), meta: {meta, title: '会员价格列表'}},
      {path: 'addPrice', name: `${pre}-addPrice`, component: () => import('@/pages/admin/price/addPrice'), meta: {meta, title: '会员价格新增'}},
   ])('admin-price')
}