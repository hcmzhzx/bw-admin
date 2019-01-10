<template>
   <d2-container class="reward">
      <template slot="header">
         <el-form class="flex end priceFrom" label-position="right" label-width="80px">
            <el-form-item label="提现状态">
               <el-select name="type" v-model="search.state" placeholder="请选择">
                  <el-option label="未完成" value="no"></el-option>
                  <el-option label="已完成" value="yes"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="支付类型">
               <el-select name="type" v-model="search.type" placeholder="请选择">
                  <el-option label="手机" value="phone"></el-option>
               </el-select>
            </el-form-item>
            <el-input name="key" v-model="search.key" placeholder="搜索内容"></el-input>
            <el-button type="primary" @click="searchBtn">搜索</el-button>
         </el-form>
      </template>
      <template>
         <el-table :data="data" border v-loading="loading">
            <el-table-column align="center" prop="id" label="id" width="100"></el-table-column>
            <el-table-column align="center" prop="trade" label="订单号" width="140"></el-table-column>
            <el-table-column align="center" prop="user.cname" label="用户" width="140"></el-table-column>
            <el-table-column align="center" prop="user.phone" label="手机号" width="140"></el-table-column>
            <el-table-column align="center" prop="account" label="支付宝账号" min-width="240"></el-table-column>
            <el-table-column align="center" prop="user.aname" label="支付宝姓名" width="140"></el-table-column>
            <el-table-column align="center" prop="methods" label="提现类型" width="140"></el-table-column>
            <el-table-column align="center" prop="amount" label="金额" width="120"></el-table-column>
            <el-table-column align="center" prop="addtime" label="提现时间" width="200"></el-table-column>
            <el-table-column align="center" prop="paytime" label="完成时间" width="200"></el-table-column>
         </el-table>
      </template>
      <template slot="footer">
         <el-pagination @current-change="handleCurrent" background layout="prev, pager, next, total" :current-page.sync="pageNo" :page-size="pageSize" :total="total"></el-pagination>
      </template>
   </d2-container>
</template>

<script>
   import {httpGet} from '@/api/sys/http'

   export default {
      name: 'admin-orders-reward',
      data(){
         return{
            data:[],
            search:{state:'', type:'', key:''},
            Search:false,
            pageNo: 1,
            pageSize:0,
            total:0,
            loading:true
         }
      },
      created(){
         httpGet(`reward_use`).then(res=>{
            this.data = res.data
            this.pageSize = res.per_page
            this.total = res.total
            this.loading = false
         })
      },
      methods:{
         searchBtn(){
            this.loading = this.Search = true
            httpGet(`reward_use?state=${this.aearch.state}&type=${this.aearch.type}&key=${this.aearch.key}`).then(res=>{
               this.pageNo = 1
               this.data = res.data
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         },
         handleCurrent(val){
            this.loading = true
            const url = this.Search ? `reward_use?state=${this.aearch.state}&type=${this.aearch.type}&key=${this.aearch.key}&page=${val}` : `reward_use?page=${val}`
            httpGet(url).then(res=>{
               this.data = res.data
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         }
      }
   }
</script>

<style>
.reward .d2-container-full__header .el-form-item{margin:0;}
.reward .d2-container-full__header .el-input{width:180px;}
.reward .d2-container-full__header .append .el-input{width:100px;}
</style>