import Vue from 'vue'
import VueRouter from 'vue-router'
import {httpGet} from '@/api/sys/http'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index'
import util from '@/libs/util.js'

// 路由数据
import routes from './routes'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
   routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
   // 进度条
   NProgress.start()
   // 关闭搜索面板
   store.commit('d2admin/search/set', false)

   // 这里暂时将cookie里是否存有token作为验证是否登录的条件
   // 请根据自身业务需要修改
   const token = util.cookies.get('token')
   if (token && token !== 'undefined') {

      next()
   } else {
      const search = 'http://localhost:8080'
      if (location.search.includes('?code=')) {
         const code = location.search.substr(location.search.indexOf('=') + 1);
         httpGet(`get_token?code=${code}`).then(res => {
            util.cookies.set('token', res.access_token)

            const path = util.cookies.get('redirect')
            // 根据是否存有重定向页面判断如何重定向 http://localhost:8080    http://console.eyooh.com
            window.location.href = path ? `${search}/#${path}` : `${search}/#/index`
            // 删除 cookie 中保存的重定向页面
            util.cookies.remove('redirect')
         })
      } else {
         // 将当前预计打开的页面完整地址临时存储 登录后继续跳转，这个 cookie(redirect) 会在登录后自动删除
         util.cookies.set('redirect', to.fullPath)
         // 没有登录的时候跳转到登录界面
         window.location.href = `https://oauth.zx85.net/login?client_id=20181019165102&redirect_url=${search}/#/index`
      }
   }
})

router.afterEach(to => {
   // 进度条
   NProgress.done()
   // 需要的信息
   const app = router.app
   const {name, params, query} = to
   // 多页控制 打开新的页面
   app.$store.dispatch('d2admin/page/open', {name, params, query})
   // 更改标题
   util.title(to.meta.title)
})

export default router
