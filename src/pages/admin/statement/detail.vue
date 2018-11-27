<template>
   <d2-container class="detail">
      <el-table :data="data" border v-loading="loading">
         <el-table-column align="center" prop="id" label="id" width="80"></el-table-column>
         <el-table-column align="center" prop="cname" label="用户名"></el-table-column>
         <el-table-column align="center" prop="bid" label="品牌" width="180"></el-table-column>
         <el-table-column align="center" prop="phone" label="手机号" width="180"></el-table-column>
         <el-table-column align="center" prop="fee" label="金额(元)" width="180"></el-table-column>
         <el-table-column align="center" prop="unit" label="月数" width="180"></el-table-column>
         <el-table-column align="center" prop="payment" label="支付方式" width="180"></el-table-column>
         <el-table-column align="center" prop="create_at" label="下单时间" width="180"></el-table-column>
         <el-table-column align="center" prop="pay_at" label="支付时间" width="180"></el-table-column>
      </el-table>
      <template slot="footer">
         <el-pagination @current-change="handleCurrent" background layout="prev, pager, next, total" :page-size="pageSize" :total="total"></el-pagination>
      </template>
   </d2-container>
</template>

<script>
   import {httpGet} from '@/api/sys/http'

   // 详情
   export default {
      name: 'detail',
      data(){
         return {
            brand:[],
            data:[],
            Id:'',
            time:'',
            field:'',

            pageSize:0,
            total:0,
            loading:true
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
         let {id,time,field} = {...this.$route.query}
         this.Id = id
         this.time = time
         this.field = field
         this.loadData(id,time,field)
      },
      methods:{
         loadData(Id,time,field){
            httpGet(`achievement_query/${time}/${Id}/${field}`).then(res=>{
               this.data = res.data.map(item=>{
                  let json = {...item};
                  if(item.bid){
                     json.bid = this.brand.find(val=>{return val.id == item.bid}).name
                  } else {
                     json.bid = ''
                  }
                  return json
               })
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         },
         handleCurrent(val){
            this.loading = true
            httpGet(`achievement_query/${this.time}/${this.Id}/${this.field}&page=${val}`).then(res=>{
               this.data = res.data.map(item=>{
                  let json = {...item};
                  if(item.bid){
                     json.bid = this.brand.find(val=>{return val.id == item.bid}).name
                  } else {
                     json.bid = ''
                  }
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