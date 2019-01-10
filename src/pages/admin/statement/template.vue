<template>
   <d2-container class="message">
      <div class="el-table el-table--fit el-table--enable-row-transition el-table__body" style="width:100%;" v-if="!Loading">
         <p class="title">模板消息报表</p>
         <table class="el-table--border" style="width:100%;">
            <thead>
            <tr class="active">
               <th class="is-center">时间\类型</th>
               <th class="is-center">文章更新</th>
               <th class="is-center">完善信息</th>
               <th class="is-center">加微信</th>
               <th class="is-center">日统计</th>
               <th class="is-center">周统计</th>
               <th class="is-center">文章审核</th>
            </tr>
            </thead>
            <tbody>
            <tr>
               <td class="is-center">今日</td>
               <td class="is-center" v-cloak>{{templateList.article.today}}</td>
               <td class="is-center" v-cloak>{{templateList.profile.today}}</td>
               <td class="is-center" v-cloak>{{templateList.wechat.today}}</td>
               <td class="is-center" v-cloak>{{templateList.day.today}}</td>
               <td class="is-center" v-cloak>{{templateList.week.today}}</td>
               <td class="is-center" v-cloak>{{templateList.examine.today}}</td>
            </tr>
            <tr>
               <td class="is-center">昨日</td>
               <td class="is-center" v-cloak>{{templateList.article.yesterday}}</td>
               <td class="is-center" v-cloak>{{templateList.profile.yesterday}}</td>
               <td class="is-center" v-cloak>{{templateList.wechat.yesterday}}</td>
               <td class="is-center" v-cloak>{{templateList.day.yesterday}}</td>
               <td class="is-center" v-cloak>{{templateList.week.yesterday}}</td>
               <td class="is-center" v-cloak>{{templateList.examine.yesterday}}</td>
            </tr>
            <tr>
               <td class="is-center">前日</td>
               <td class="is-center" v-cloak>{{templateList.article.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{templateList.profile.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{templateList.wechat.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{templateList.day.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{templateList.week.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{templateList.examine.before_yesterday}}</td>

            </tr>
            <tr>
               <td class="is-center">本月</td>
               <td class="is-center" v-cloak>{{templateList.article.this_month}}</td>
               <td class="is-center" v-cloak>{{templateList.profile.this_month}}</td>
               <td class="is-center" v-cloak>{{templateList.wechat.this_month}}</td>
               <td class="is-center" v-cloak>{{templateList.day.this_month}}</td>
               <td class="is-center" v-cloak>{{templateList.week.this_month}}</td>
               <td class="is-center" v-cloak>{{templateList.examine.this_month}}</td>
            </tr>
            <tr>
               <td class="is-center">同比</td>
               <td class="is-center" v-cloak>{{templateList.article.last_month_day}}</td>
               <td class="is-center" v-cloak>{{templateList.profile.last_month_day}}</td>
               <td class="is-center" v-cloak>{{templateList.wechat.last_month_day}}</td>
               <td class="is-center" v-cloak>{{templateList.day.last_month_day}}</td>
               <td class="is-center" v-cloak>{{templateList.week.last_month_day}}</td>
               <td class="is-center" v-cloak>{{templateList.examine.last_month_day}}</td>
            </tr>
            <tr>
               <td class="is-center">上月</td>
               <td class="is-center" v-cloak>{{templateList.article.last_month}}</td>
               <td class="is-center" v-cloak>{{templateList.profile.last_month}}</td>
               <td class="is-center" v-cloak>{{templateList.wechat.last_month}}</td>
               <td class="is-center" v-cloak>{{templateList.day.last_month}}</td>
               <td class="is-center" v-cloak>{{templateList.week.last_month}}</td>
               <td class="is-center" v-cloak>{{templateList.examine.last_month}}</td>
            </tr>
            <tr>
               <td class="is-center">前月</td>
               <td class="is-center" v-cloak>{{templateList.article.before_last_month}}</td>
               <td class="is-center" v-cloak>{{templateList.profile.before_last_month}}</td>
               <td class="is-center" v-cloak>{{templateList.wechat.before_last_month}}</td>
               <td class="is-center" v-cloak>{{templateList.day.before_last_month}}</td>
               <td class="is-center" v-cloak>{{templateList.week.before_last_month}}</td>
               <td class="is-center" v-cloak>{{templateList.examine.before_last_month}}</td>
            </tr>
            <tr>
               <td class="is-center">总计</td>
               <td class="is-center" v-cloak>{{templateList.article.all}}</td>
               <td class="is-center" v-cloak>{{templateList.profile.all}}</td>
               <td class="is-center" v-cloak>{{templateList.wechat.all}}</td>
               <td class="is-center" v-cloak>{{templateList.day.all}}</td>
               <td class="is-center" v-cloak>{{templateList.week.all}}</td>
               <td class="is-center" v-cloak>{{templateList.examine.all}}</td>
            </tr>
            </tbody>
         </table>
      </div>
      <el-button type="primary" v-loading.fullscreen.lock="Loading" v-else></el-button>
   </d2-container>
</template>

<script>
   import {httpGet} from '@/api/sys/http'

   export default {
      name: 'message',
      data(){
         return{
            templateList:{},
            Loading:true
         }
      },
      created(){
         httpGet(`report/template`).then(res=>{
            this.templateList = {...res}
            this.Loading = false
         })
      }
   }
</script>

<style>
.message .title{margin:0;padding:12px 0;text-align:center;background:#fff;font-weight:bold;color:#909399;border:1px solid #ebeef5;border-bottom:none;}
</style>