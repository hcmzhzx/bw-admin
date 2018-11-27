<template>
   <d2-container class="complain">
      <template>
         <el-table :data="data" border v-loading="loading">
            <el-table-column align="center" prop="id" label="id" width="80"></el-table-column>
            <el-table-column align="center" prop="user.cname" label="用户名" width="120"></el-table-column>
            <el-table-column align="center" prop="cname" label="提交姓名" width="120"></el-table-column>
            <el-table-column align="center" prop="contact" label="提交手机" width="120"></el-table-column>
            <el-table-column align="center" prop="content" label="投诉内容"></el-table-column>
            <el-table-column align="center" prop="article.title" label="投诉文章"></el-table-column>
            <el-table-column align="center" prop="addtime" label="投诉时间" width="190"></el-table-column>
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
      name: 'admin-message',
      data(){
         return{
            data: [],

            pageSize:0,
            total:0,
            loading:true
         }
      },
      created(){
         this.loadData()
      },
      methods:{
         loadData(){
            httpGet(`feed_back/0`).then(res=>{
               this.data = res.data
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         },
         handleCurrent(val){
            this.loading = true
            httpGet(`feed_back/0?page=${val}`).then(res=>{
               this.data = res.data
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         }
      }
   }
</script>