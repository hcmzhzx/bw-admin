<template>
   <d2-container>
      <template>
         <el-table :data="Data" border style="width:100%" :row-class-name="tableRowClassName" v-loading="loading">
            <el-table-column align="center" width="100" prop="id" label="id"></el-table-column>
            <el-table-column align="center" width="160" prop="pinyin" label="拼音"></el-table-column>
            <el-table-column align="center" width="160" prop="name" label="名字"></el-table-column>
            <el-table-column align="center" prop="cname" label="公司名"></el-table-column>
            <el-table-column align="center" prop="watchwords" label="描述"></el-table-column>
            <el-table-column align="center" width="200" prop="created_at" label="创建时间"></el-table-column>
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
      name: 'admin-company',
      data(){
         return{
            Data:[],

            pageSize:0,
            total:0,
            loading:true
         }
      },
      created () {
         httpGet(`brands`).then(res=>{
            this.Data = res.data
            this.pageSize = res.per_page
            this.total = res.total
            this.loading = false
         })
      },
      methods: {
         handleCurrent(val){
            this.loading = true
            httpGet(`brands?page=${val}`).then(res=>{
               this.Data = res.data
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         },
         // 控制行的颜色
         tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 == 1) {
               return 'warning-row';
            } else {
               return 'success-row';
            }
         }
      }
   }
</script>
