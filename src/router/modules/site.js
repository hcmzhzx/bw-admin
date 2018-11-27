import layoutHeaderAside from '@/layout/header-aside'

const meta = {requiresAuth: true}

export default {
   path: '/admin/site',
   name: 'admin/site',
   meta,
   redirect: {name: 'admin-site'},
   component: layoutHeaderAside,
   children: (pre => [
      {path: 'site', name: `${pre}`, component: () => import('@/pages/admin/site'), meta: {meta, title: '站点列表'}},
      {path: 'look', name: `${pre}-look`, component: () => import('@/pages/admin/site/look'), meta: {meta, title: '站点新增'}},
   ])('admin-site')
}

