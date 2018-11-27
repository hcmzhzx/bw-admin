<template>
   <d2-container class="orders">
      <template slot="header">
         <el-form class="flex end priceFrom" label-position="right" label-width="80px">
            <el-button type="primary" plain @click="loadData">刷新</el-button>
            <el-form-item label="所属站点">
               <el-select name="type" v-model="search.plateform" placeholder="请选择">
                  <el-option v-for="v in siteList" :label="v.name" :value="v.value"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="支付类型">
               <el-select name="type" v-model="search.payment" placeholder="请选择">
                  <el-option label="微信" value="wxpay"></el-option>
                  <el-option label="支付宝" value="alipay"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="订单状态">
               <el-select name="type" v-model="search.state" placeholder="请选择">
                  <el-option label="已支付" value="success"></el-option>
                  <el-option label="未支付" value="cancel"></el-option>
                  <el-option label="已退款" value="refund"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item class="append" label="其他信息">
               <el-select name="other" v-model="search.type" placeholder="请选择">
                  <el-option label="手机号" value="phone"></el-option>
                  <el-option label="微信" value="wechat"></el-option>
                  <el-option label="订单号" value="order_id"></el-option>
               </el-select>
            </el-form-item>
            <el-input name="key" v-model="search.key" placeholder="搜索内容"></el-input>
            <el-button type="primary" @click="searchBtn">搜索</el-button>
         </el-form>
      </template>
      <template>
         <el-table :data="data" border v-loading="loading">
            <el-table-column align="center" prop="id" label="id" width="80"></el-table-column>
            <el-table-column align="center" prop="user.cname" label="用户名"></el-table-column>
            <el-table-column align="center" prop="user.phone" label="手机号"></el-table-column>
            <el-table-column align="center" prop="brand.name" label="公司"></el-table-column>
            <el-table-column align="center" prop="fee" label="价格"></el-table-column>
            <el-table-column align="center" prop="unit" label="月数"></el-table-column>
            <el-table-column align="center" prop="payment" label="支付方式"></el-table-column>
            <el-table-column align="center" prop="addtime" label="下单时间"></el-table-column>
            <el-table-column align="center" label="支付时间">
               <template slot-scope="scope">
                  <el-tag type="danger" v-if="scope.row.paytime==0">未支付</el-tag>
                  <span v-else>{{scope.row.paytime}}</span>
               </template>
            </el-table-column>
            <el-table-column align="center" prop="reward[0].user.cname" label="推广人"></el-table-column>
            <el-table-column align="center" prop="reward[1].user.cname" label="推广人上级"></el-table-column>
            <el-table-column align="center" label="退款时间">
               <template slot-scope="scope">{{scope.row.refundtime == 0 ? '' : scope.row.refundtime}}</template>
            </el-table-column>
            <el-table-column align="center" label="退款金额">
               <template slot-scope="scope">{{scope.row.refundfee == 0 ? '' : scope.row.refundfee}}</template>
            </el-table-column>
         </el-table>
      </template>
      <template slot="footer">
         <el-pagination @current-change="handleCurrent" background layout="prev, pager, next, total" :page-size="pageSize" :total="total"></el-pagination>
      </template>
   </d2-container>
</template>

<script>
   import {httpGet} from '@/api/sys/http'

   export default {
      name: 'admin-orders',
      data(){
         return{
            data:[],
            search:{plateform:'',payment:'',state:'',type:'',key:''},
            Search:false,
            siteList:[],

            pageSize:0,
            total:0,
            loading:true
         }
      },
      async created(){
         await httpGet(`website`).then(res=>{  //站点
            for(let [k,v] of Object.entries(res)){
               let json = {}
               json.name = v.site.title
               json.value = k
               this.siteList.push(json)
            }
         })
         await this.loadData();
      },
      methods:{
         loadData(){
            this.loading = true; this.Search = false
            httpGet(`order`).then(res=>{
               let arr = []
               for(let [k,v] of Object.entries(res.data)){
                  arr.push(Object.assign(v))
               }
               this.data = arr
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         },
         searchBtn(){
            this.loading = this.Search = true
            httpGet(`order?plateform=${this.search.plateform}&payment=${this.search.payment}&state=${this.search.state}&type=${this.search.type}&key=${this.search.key}`).then(res=>{
               let arr = []
               if(!res){this.loading = false;this.data = [];this.pageSize = 0;this.total = 0;return false}
               for(let [k,v] of Object.entries(res.data)){
                  arr.push(Object.assign(v))
               }
               this.data = arr
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         },
         handleCurrent(val){
            this.loading = true
            const url = this.Search ? `order?plateform=${this.search.plateform}&payment=${this.search.payment}&state=${this.search.state}&type=${this.search.type}&key=${this.search.key}&page=${val}` : `order?page=${val}`
            httpGet(url).then(res=>{
               let arr = []
               for(let [k,v] of Object.entries(res.data)){
                  arr.push(Object.assign(v))
               }
               this.data = arr
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         }
      }
   }
</script>

<style>
.orders .d2-container-full__header .el-form-item{margin:0;}
.orders .d2-container-full__header .el-input{width:180px;}
.orders .d2-container-full__header .append .el-input{width:100px;}
</style>