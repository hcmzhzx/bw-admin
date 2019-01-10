<template>
   <d2-container class="data">
      <div class="el-table el-table--fit el-table--enable-row-transition el-table__body" style="width:100%;" v-if="!Loading">
         <p class="title">数据报表</p>
         <table class="el-table--border" style="width:100%;">
            <thead>
            <tr class="active">
               <th class="is-center">时间\类型</th>
               <th class="is-center">关注人数</th>
               <th class="is-center">注册人数</th>
               <th class="is-center">创建开通率(%)</th>
               <th class="is-center">订单数</th>
               <th class="is-center">开通数</th>
               <th class="is-center">付费开通率(%)</th>
               <th class="is-center">开通金额(元)</th>
               <th class="is-center">提现(元)</th>
               <th class="is-center">退款数</th>
               <th class="is-center">退款金额(元)</th>
            </tr>
            </thead>
            <tbody>
            <tr>
               <td class="is-center">今日</td>
               <td class="is-center" v-cloak>{{commonList.subscribe_user.today}}</td>
               <td class="is-center" v-cloak>{{commonList.perfect_user.today}}</td>
               <td class="is-center" v-cloak>{{commonList.user_membership_rate.today.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order.today}}</td>
               <td class="is-center" v-cloak>{{commonList.open_up_order.today}}</td>
               <td class="is-center" v-cloak>{{commonList.membership_rate.today.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order_money.today}}</td>
               <td class="is-center" v-cloak>{{commonList.reward_use.today}}</td>
               <td class="is-center" v-cloak>{{commonList.refund.today}}</td>
               <td class="is-center" v-cloak>{{commonList.refund_money.today}}</td>
            </tr>
            <tr>
               <td class="is-center">昨日</td>
               <td class="is-center" v-cloak>{{commonList.subscribe_user.yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.perfect_user.yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.user_membership_rate.yesterday.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order.yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.open_up_order.yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.membership_rate.yesterday.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order_money.yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.reward_use.yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.refund.yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.refund_money.yesterday}}</td>
            </tr>
            <tr>
               <td class="is-center">前日</td>
               <td class="is-center" v-cloak>{{commonList.subscribe_user.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.perfect_user.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.user_membership_rate.before_yesterday.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.open_up_order.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.membership_rate.before_yesterday.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order_money.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.reward_use.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.refund.before_yesterday}}</td>
               <td class="is-center" v-cloak>{{commonList.refund_money.before_yesterday}}</td>
            </tr>
            <tr>
               <td class="is-center">本月</td>
               <td class="is-center" v-cloak>{{commonList.subscribe_user.this_month}}</td>
               <td class="is-center" v-cloak>{{commonList.perfect_user.this_month}}</td>
               <td class="is-center" v-cloak>{{commonList.user_membership_rate.this_month.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order.this_month}}</td>
               <td class="is-center" v-cloak>{{commonList.open_up_order.this_month}}</td>
               <td class="is-center" v-cloak>{{commonList.membership_rate.this_month.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order_money.this_month}}</td>
               <td class="is-center" v-cloak>{{commonList.reward_use.this_month}}</td>
               <td class="is-center" v-cloak>{{commonList.refund.this_month}}</td>
               <td class="is-center" v-cloak>{{commonList.refund_money.this_month}}</td>
            </tr>
            <tr>
               <td class="is-center">同比</td>
               <td class="is-center" v-cloak>{{commonList.subscribe_user.last_month_day}}</td>
               <td class="is-center" v-cloak>{{commonList.perfect_user.last_month_day}}</td>
               <td class="is-center" v-cloak>{{commonList.user_membership_rate.last_month_day.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order.last_month_day}}</td>
               <td class="is-center" v-cloak>{{commonList.open_up_order.last_month_day}}</td>
               <td class="is-center" v-cloak>{{commonList.membership_rate.last_month_day.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order_money.last_month_day}}</td>
               <td class="is-center" v-cloak>{{commonList.reward_use.last_month_day}}</td>
               <td class="is-center" v-cloak>{{commonList.refund.last_month_day}}</td>
               <td class="is-center" v-cloak>{{commonList.refund_money.last_month_day}}</td>
            </tr>
            <tr>
               <td class="is-center">上月</td>
               <td class="is-center" v-cloak>{{commonList.subscribe_user.last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.perfect_user.last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.user_membership_rate.last_month.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order.last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.open_up_order.last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.membership_rate.last_month.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order_money.last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.reward_use.last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.refund.last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.refund_money.last_month}}</td>
            </tr>
            <tr>
               <td class="is-center">前月</td>
               <td class="is-center" v-cloak>{{commonList.subscribe_user.before_last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.perfect_user.before_last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.user_membership_rate.before_last_month.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order.before_last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.open_up_order.before_last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.membership_rate.before_last_month.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order_money.before_last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.reward_use.before_last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.refund.before_last_month}}</td>
               <td class="is-center" v-cloak>{{commonList.refund_money.before_last_month}}</td>
            </tr>
            <tr>
               <td class="is-center">总计</td>
               <td class="is-center" v-cloak>{{commonList.subscribe_user.all}}</td>
               <td class="is-center" v-cloak>{{commonList.perfect_user.all}}</td>
               <td class="is-center" v-cloak>{{commonList.user_membership_rate.all.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order.all}}</td>
               <td class="is-center" v-cloak>{{commonList.open_up_order.all}}</td>
               <td class="is-center" v-cloak>{{commonList.membership_rate.all.toFixed(2)}}</td>
               <td class="is-center" v-cloak>{{commonList.order_money.all}}</td>
               <td class="is-center" v-cloak>{{commonList.reward_use.all}}</td>
               <td class="is-center" v-cloak>{{commonList.refund.all}}</td>
               <td class="is-center" v-cloak>{{commonList.refund_money.all}}</td>
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
      name: 'admin-statement',
      data(){
         return{
            commonList:{},
            Loading:true
         }
      },
      created(){
         httpGet(`report`).then(res => {
            this.commonList = {...res}
            this.Loading = false
         })
      }
   }
</script>

<style>
.data .title{margin:0;padding:12px 0;text-align:center;background:#fff;font-weight:bold;color:#909399;border:1px solid #ebeef5;border-bottom:none;}
</style>