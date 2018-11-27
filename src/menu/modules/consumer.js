export default {
   path: '/admin/consumer',
   title: '用户管理',
   icon: 'users',
   children: (pre => [
      {path: `${pre}`, title: '普通用户列表', icon: 'user-circle'},
      {path: `${pre}/dealer`, title: '经销商列表', icon: 'user-secret'},
      // {path: `${pre}/userInfo`, title: '编辑/查看用户'}
   ])('/admin/consumer')
}
