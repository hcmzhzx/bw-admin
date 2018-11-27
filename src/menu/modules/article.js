export default {
   path: '/admin/article',
   title: '文章列表',
   icon: 'leanpub',
   children: (pre => [
      {path: `${pre}`, title: '文章列表', icon: 'list-ul'},
      // {path: `${pre}/details`, title: '文章详情'}
   ])('/admin/article')
}
