export default {
   path: '/admin/orders',
   title: '订单管理',
   icon: 'indent',
   children: (pre => [
      {path: `${pre}`, title: '订单列表', icon:'list-ol'},
      {path: `${pre}/reward`, title: '提现列表', icon:'jpy'},
   ])('/admin/orders')
}
