export default {
   path: '/admin/price',
   title: '会员价格管理',
   icon: 'diamond',
   children: (pre => [
      {path: `${pre}`, title: '会员价格列表', icon:"reorder"},
      // {path: `${pre}/addPrice`, title: '会员价格新增'}
   ])('/admin/price')
}