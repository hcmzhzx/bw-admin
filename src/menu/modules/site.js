export default {
   path: '/admin/site',
   title: '站点管理',
   icon: 'institution',
   children: (pre => [
      {path: `${pre}`, title: '站点列表', icon:'th-list'},
      // {path: `${pre}/look`, title: '站点新增'}
   ])('/admin/site')
}
