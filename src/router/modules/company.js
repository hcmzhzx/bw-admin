import layoutHeaderAside from '@/layout/header-aside'

const meta = {requiresAuth: true}

export default {
   path: '/admin/company',
   name: 'admin/company',
   meta,
   redirect: {name: 'admin-company'},
   component: layoutHeaderAside,
   children: (pre => [
      {path: 'company', name: `${pre}`, component: () => import('@/pages/admin/company'), meta: {meta, title: '公司列表'}},
      {path: 'custom', name: `${pre}-custom`, component: () => import('@/pages/admin/company/custom'), meta: {meta, title: '自定义品牌'}},
      {path: 'apply', name: `${pre}-apply`, component: () => import('@/pages/admin/company/apply'), meta: {meta, title: '公司申请列表'}},
   ])('admin-company')
}
