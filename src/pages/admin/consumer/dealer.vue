<template>
   <d2-container class="user">
      <template slot="header">
         <el-form class="flex end priceFrom" label-position="right" label-width="80px">
            <el-button type="primary" @click="loadData">刷新</el-button>
            <el-form-item label="类型">
               <el-select name="type" v-model="search.type" placeholder="请选择">
                  <el-option label="开通" value="1"></el-option>
                  <el-option label="过期" value="2"></el-option>
                  <el-option label="访客" value="3"></el-option>
                  <el-option label="用户" value="4"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="所属员工">
               <el-select name="admin_id" v-model="search.admin_id" placeholder="所属员工">
                  <el-option v-for="v in admin" :key="v.id" :label="v.username" :value="v.id"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="所属公司">
               <el-select name="brand_id" v-model="search.brand_id" placeholder="所属公司">
                  <el-option v-for="v in brand" :key="v.id" :label="v.name" :value="v.id"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item class="append" label="其他信息">
               <el-select name="other" v-model="search.other" placeholder="请选择">
                  <el-option label="手机号" value="phone"></el-option>
                  <el-option label="微信" value="wechat"></el-option>
               </el-select>
            </el-form-item>
            <el-input name="key" v-model="search.key" placeholder="搜索内容"></el-input>
            <el-button type="primary" @click="searchBtn">搜索</el-button>
         </el-form>
      </template>
      <template>
         <el-table :data="data" border style="width:100%" v-loading="loading">
            <el-table-column align="center" prop="id" label="id" width="90"></el-table-column>
            <el-table-column align="center" prop="cname" label="用户名" width="120"></el-table-column>
            <el-table-column align="center" prop="phone" label="手机号" width="120"></el-table-column>
            <el-table-column align="center" prop="wechat" label="微信" width="120"></el-table-column>
            <el-table-column align="center" prop="bid" label="公司" width="120"></el-table-column>
            <el-table-column align="center" prop="first_rate" label="普通佣金" width="100"></el-table-column>
            <el-table-column align="center" prop="second_rate" label="经销商佣金" width="100"></el-table-column>
            <el-table-column align="center" prop="sid.username" label="所属员工" width="120"></el-table-column>
            <el-table-column align="center" label="关注" width="100">
               <template slot-scope="scope">
                  <el-tag :type="scope.row.subscribe==0? 'danger' : 'success'">{{scope.row.subscribe==0 ? '未关注' : '已关注'}}</el-tag>
               </template>
            </el-table-column>
            <el-table-column align="center" prop="locktime" label="到期时间" width="160"></el-table-column>
            <el-table-column align="center" prop="addtime" label="注册时间" width="160"></el-table-column>
            <el-table-column class="flex" align="center" fixed="right" label="操作" width="100">
               <template slot-scope="scope">
                  <el-button @click="$router.push({name:'admin-consumer-userInfo',query:{id:scope.row.id, type:'edit'}})" type="text" size="mini">编辑</el-button>
                  <el-button @click="$router.push({name:'admin-consumer-userInfo',query:{id:scope.row.id, type:'check'}})" type="text" size="mini">查看</el-button>
               </template>
            </el-table-column>
         </el-table>
         </template>
      <template slot="footer">
         <el-pagination @current-change="handleCurrent" background layout="prev, pager, next, total" :current-page.sync="pageNo" :page-size="pageSize" :total="total"></el-pagination>
      </template>
   </d2-container>
</template>

<script>
   import { httpGet } from '@/api/sys/http'

   export default {
      name: 'admin-consumer-dealer',
      data () {
         return {
            data: [],
            admin: [],
            brand: [],
            search: { type: '', admin_id: '', brand_id: '', other: 'phone', key: '' },
            Search: false,
            pageNo: 1,
            pageSize: 0,
            total: 0,
            loading: true
         }
      },
      async created () {
         await httpGet(`admins`).then(res => { // 获取员工
            for (let item of Object.values(res)) {
               this.admin.push(item)
            }
         })
         const brand = await this.getBrand()
         if (brand) {
            this.brand = brand
         } else {
            httpGet(`brand_select`).then(res => { // 获取公司
               for (let item of Object.values(res)) {
                  this.brand.push(item)
               }
               this.setBrand(this.brand)
            })
         }
         await this.loadData()
      },
      methods: {
         loadData () {
            this.loading = true; this.Search = false
               httpGet(`user/user_dealer`).then(res => {
               this.data = res.data.map((item) => {
                  let json = { ...item }
                  json.locktime = json.locktime == 0 ? '' : json.locktime
                  json.bid = item.bid ? this.brand.find(val => { return item.bid == val.id }).name : ''
                  return json
               })
               this.pageNo = 1
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         },
         searchBtn () {
            this.loading = this.Search = true
            httpGet(`user/user_dealer?type=${this.search.type}&admin_id=${this.search.admin_id}&brand_id=${this.search.brand_id}&other=${this.search.other}&key=${this.search.key}`).then(res => {
               this.data = res.data.map((item) => {
                  let json = { ...item }
                  json.locktime = json.locktime == 0 ? '' : json.locktime
                  json.bid = item.bid ? this.brand.find(val => { return item.bid == val.id }).name : ''
                  return json
               })
               this.pageNo = 1
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         },
         handleCurrent (val) {
            this.loading = true
            const url = this.Search ? `user/user_dealer?type=${this.search.type}&admin_id=${this.search.admin_id}&brand_id=${this.search.brand_id}&other=${this.search.other}&key=${this.search.key}&page=${val}` : `user/user_dealer?page=${val}`
            httpGet(url).then(res => {
               this.data = res.data.map((item) => {
                  let json = { ...item }
                  json.locktime = json.locktime == 0 ? '' : json.locktime
                  json.bid = item.bid ? this.brand.find(val => { return item.bid == val.id }).name : ''
                  return json
               })
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         }
      }
   }
</script>

<style>
.user .priceFrom .el-button{display:-webkit-box;margin-left:4px;}
.user .d2-container-full__header .el-form-item{margin:0;}
.user .d2-container-full__header .el-input{width:180px;}
.user .d2-container-full__header .append .el-input{width:100px;}
.user .el-dialog .el-dialog__body .el-col{margin-bottom:10px;}
</style>