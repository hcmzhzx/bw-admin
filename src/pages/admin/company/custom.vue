<template>
   <d2-container>
      <template>
         <el-table :data="Data" border :row-class-name="tableRowClassName" v-loading="loading">
            <el-table-column align="center" prop="cname" label="公司名"></el-table-column>
            <el-table-column align="center" prop="total" label="总计" width="100"></el-table-column>
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
      name: 'admin-company-custom',
      data(){
         return{
            Data:[],

            pageSize:0,
            total:0,
            loading:true
         }
      },
      created () {
         httpGet(`brand/apply`).then(res=>{
            this.Data = res.data
            this.pageSize = res.per_page
            this.total = res.total
            this.loading = false
         })
      },
      methods: {
         handleCurrent(val){
            this.loading = true
            httpGet(`brand/apply?page=${val}`).then(res=>{
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
