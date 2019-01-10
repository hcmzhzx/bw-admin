import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
   path: '/admin/article',
   name: 'admin/article',
   meta,
   redirect: { name: 'admin-article' },
   component: layoutHeaderAside,
   children: (pre => [
      { path: 'article', name: `${pre}`, component: () => import('@/pages/admin/article'), meta: { meta, title: '文章列表' } },
      { path: 'detail', name: `${pre}-detail`, component: () => import('@/pages/admin/article/detail'), meta: { meta, title: '文章详情' } }
   ])('admin-article')
}
