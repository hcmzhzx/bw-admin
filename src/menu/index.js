import site from './modules/site'
import article from './modules/article'
import company from './modules/company'
import price from './modules/price'
import consumer from './modules/consumer'
import orders from './modules/orders'
import statement from './modules/statement'
import message from './modules/message'

// 菜单 侧边栏
export const menuAside = [
   {path: '/index', title: '首页', icon: 'home'},
   site,
   article,
   company,
   price,
   consumer,
   orders,
   statement,
   message,
]

// 菜单 顶栏
export const menuHeader = [
   /*{path: '/index', title: '首页', icon: 'home'},
   site,
   company,
   price,
   consumer,
   orders,
   statement,
   */
]
