export default {
   path: '/admin/company',
   title: '公司管理',
   icon: 'hospital-o',
   children: (pre => [
      {path: `${pre}`, title: '公司列表', icon: 'list-alt'},
      {path: `${pre}/custom`, title: '自定义品牌', icon: 'plus-square'},
      // {path: `${pre}/apply`, title: '公司申请列表'}
   ])('/admin/company')
}
