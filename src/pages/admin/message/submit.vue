<template>
   <d2-container class="submit">
      <template>
         <d2-crud
            :columns="columns"
            :data="data"
            :rowHandle="rowHandle"
            :form-template="formTemplate"
            :loading="loading"
            :options="options"
            :form-options="formOptions"
            @row-edit="handleRowEdit"
            @row-remove="handleRowRemove"
            @dialog-cancel="handleDialogCancel"/>
      </template>
      <template slot="footer">
         <el-pagination @current-change="handleCurrent" background layout="prev, pager, next, total" :page-size="pageSize" :total="total"></el-pagination>
      </template>
   </d2-container>
</template>

<script>
   import { httpGet, httpPost, httpDel } from '@/api/sys/http'

   export default {
      name: 'admin-message-submit',
      data () {
         return {
            brand: [],
            columns: [
               { title: 'id', key: 'id', width: '80', align: 'center' },
               { title: '用户名', key: 'user.cname', width: '140', align: 'center' },
               { title: '品牌', key: 'user.bid', width: '140', align: 'center' },
               { title: '手机号', key: 'user.phone', width: '140', align: 'center' },
               { title: '内容', key: 'content', minWidth: '300', align: 'center' },
               { title: '审核链接', key: 'examine_url', minWidth: '300', align: 'center' },
               { title: '提交时间', key: 'addtime', width: '190', align: 'center' },
               { title: '审核时间', key: 'examine_at', width: '190', align: 'center' }
            ],
            data: [],
            rowHandle: {
               width: '160',
               align: 'center',
               fixed: 'right',
               columnHeader: '操作',
               edit: {
                  text: '审核',
                  size: 'small',
                  disabled (index, row) {
                     if (row.examine_url) { return true }
                     return false
                  }
               },
               remove: {
                  text: '删除',
                  size: 'small',
                  disabled (index, row) {
                     if (row.examine_url) { return true }
                     return false
                  }
               }
            },
            formTemplate:{
               examine_url: {title: '审核链接', value: '', component:{placeholder:'http://self.eyooh.com/detail?id=xxx'}},
            },
            formOptions: {labelWidth: '80', labelPosition: 'left', saveLoading: false},
            options:{border: true},
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
         await this.loadData()
      },
      methods:{
         loadData(){
            httpGet(`feed_back/1`).then(res=>{
               this.data = res.data.map(item=>{
                  let json = {...item}
                  json.user.bid = item.user.bid ? this.brand.find(val=>{return item.user.bid == val.id}).name : ''
                  return json
               })
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         },
         handleCurrent(val){
            this.loading = true
            httpGet(`feed_back/1?page=${val}`).then(res=>{
               this.data = res.data.map(item=>{
                  let json = {...item}
                  json.user.bid = item.user.bid ? this.brand.find(val=>{return item.user.bid == val.id}).name : ''
                  return json
               })
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         },

         handleRowEdit ({index, row}, done) {
            if(!row.examine_url) {
               this.$message({message: '不能为空', type: 'warning'})
               return false
            }
            this.formOptions.saveLoading = true
            httpPost(`feed_back/examine/${row.id}`,{examine_url:row.examine_url}).then(res=>{
               this.$message({message: res.message, type: 'success'})
               done()
               this.formOptions.saveLoading = false
            })
         },
         handleRowRemove ({index, row}, done) {
            httpDel(`feed_back/${row.id}`).then(res=>{
               this.$message({message: res.message, type: 'success'})
               done()
            })
         },
         handleDialogCancel (done) {
            this.$message({message: '取消编辑', type: 'warning'})
            done()
         }
      }
   }
</script>