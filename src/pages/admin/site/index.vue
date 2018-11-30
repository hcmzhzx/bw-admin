<template>
   <d2-container>
      <el-button type="primary" @click="$router.push({name:'admin-site-look'})" style="margin-bottom:4px">新增</el-button>
      <el-table :data="Data" border style="width: 100%" :row-class-name="tableRowClassName">
         <el-table-column align="center" width="120" prop="site.title" label="站点名"></el-table-column>
         <el-table-column align="center" width="120" prop="plate" label="站点标识"></el-table-column>
         <el-table-column align="center" width="120" prop="plate" label="类型">
            <template slot-scope="scope">
               <span>{{scope.row.site.plateform==2 ? '爆文' : '保险'}}</span>
            </template>
         </el-table-column>
         <el-table-column align="center" prop="wechat.appid" label="公众号appid"></el-table-column>
         <el-table-column align="center" width="140" prop="site.phone" label="客服电话"></el-table-column>
         <el-table-column align="center" width="140" prop="site.wechat" label="客服微信"></el-table-column>
         <el-table-column align="center" width="120" prop="site.bid" label="品牌"></el-table-column>
         <el-table-column align="center" width="150" label="公众号二维码">
            <template slot-scope="scope">
               <img :src="scope.row.site.wxcode" class="qrcode">
            </template>
         </el-table-column>
         <el-table-column align="center" fixed="right" label="操作" width="140">
            <template slot-scope="scope">
               <el-button type="primary" @click="$router.push({name:'admin-site-look',query:{plate:scope.row.plate}})" size="mini">编辑</el-button>
            </template>
         </el-table-column>
      </el-table>
   </d2-container>
</template>

<script>
   import {httpGet,httpPost} from '@/api/sys/http'

   export default {
      name: 'admin-site',
      data(){
         return{
            brand:[],
            Data: []
         }
      },
      async created(){
         const brand = await this.getBrand()
         if(brand){
            this.brand = brand
         } else {
            httpGet(`brand_select`).then(res=>{  // 获取公司
               for(let item of Object.values(res)){
                  this.brand.push(item);
               }
               this.setBrand(this.brand)
            })
         }
         await httpGet(`website`).then(res=>{
            for(let [k,v] of Object.entries(res)){
               let obj = Object.assign({plate:k}, v)
               if(obj.site.bid){
                  obj.site.bid = brand.find(item=>{return obj.site.bid == item.id}).name
               } else {
                  obj.site.bid = '全品牌'
               }
               this.Data.push(obj)
            }
         })
      },
      methods: {
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

<style>
.el-table .warning-row {background: oldlace;}
.el-table .success-row {background: #f0f9eb;}
.el-table .qrcode{width:100px;height:100px;}
</style>