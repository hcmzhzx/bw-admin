export default {
   path: '/admin/message',
   title: '留言管理',
   icon: 'commenting',
   children: (pre => [
      {path: `${pre}`, title: '投诉或投诉文章', icon:'exclamation-triangle'},
      {path: `${pre}/submit`, title: '提交好文章', icon:'edit'},
   ])('/admin/message')
}
