export default {
   path: '/admin/statement',
   title: '报表管理',
   icon: 'calendar',
   children: (pre => [
      { path: `${pre}`, title: '数据报表', icon: 'bar-chart' },
      { path: `${pre}/template`, title: '模板消息报表', icon: 'area-chart' },
      { path: `${pre}/attract`, title: '招商报表', icon: 'briefcase' },
      { path: `${pre}/operation`, title: '运营报表', icon: 'line-chart' },
      { path: `${pre}/dealer`, title: '经销商报表', icon: 'area-chart' }
   ])('/admin/statement')
}
