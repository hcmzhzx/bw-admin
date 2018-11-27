<template>
   <d2-container class="price">
      <el-form ref="form" :model="data" :rules="formRules" label-width="80px" v-loading="loading">
         <el-form-item label="站点" prop="plateform">
            <el-select v-model="data.plateform" placeholder="请选择活动区域">
               <el-option v-for="item in plateform" :label="item.label" :value="item.value"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="支付标题" prop="body">
            <el-input v-model="data.body"></el-input>
         </el-form-item>
         <el-form-item label="月数" prop="unit">
            <el-input type="number" v-model="data.unit"></el-input>
         </el-form-item>
         <el-form-item label="现价" prop="price">
            <el-input type="number" v-model="data.price"></el-input>
         </el-form-item>
         <el-form-item type="number" label="市价" prop="market">
            <el-input type="number" v-model="data.market"></el-input>
         </el-form-item>
         <el-form-item label="推荐">
            <el-select v-model="data.commend" placeholder="请选择活动区域">
               <el-option label="推荐" value='1'></el-option>
               <el-option label="不推荐" value='0'></el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="排序">
            <el-input type="number" v-model="data.sortid"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即添加</el-button>
         </el-form-item>
      </el-form>
   </d2-container>
</template>

<script>
   import {httpGet, httpPost, httpPat} from '@/api/sys/http'

   export default {
      name: 'admin-price',
      data(){
         return {
            data: {plateform:'', body:'', unit:'', price:'', market:'', commend:'', sortid:'100'},
            formRules:{
               plateform:[{required:true, message:'站点名不能为空',trigger:'change'}],
               body:[{required:true, message:'支付标题不能为空',trigger:'blur'}],
               unit:[{required:true, message:'月数不能为空',trigger:'blur'}],
               price:[{required:true, message:'现价不能为空',trigger:'blur'}],
               market:[{required:true, message:'市场价不能为空',trigger:'blur'}]
            },
            plateform:[],
            loading:true
         }
      },
      created(){
         httpGet(`website`).then(res => {
            for (let [k, v] of Object.entries(res)) {
               let json = {}
               json.value = k;
               json.label = v.site.title
               this.plateform.push(json)
            }
            this.loading = false
         })
      },
      methods: {
         onSubmit(form){
            this.$refs[form].validate((valid) => {
               this.loading = true
               if (valid) {
                  let postes = {};
                  for(let [k,v=0] of Object.entries(this.data)){
                     if(k != 'plateform' && k != 'body'){
                        postes[k] = Number(v)
                     } else {
                        postes[k] = v
                     }
                  }
                  httpPost(`payment`, postes).then(res => {
                     this.$message({
                        message: res.message,
                        type: 'success'
                     })
                     this.data = {plateform:'', body:'', unit:'', price:'', market:'', commend:'', sortid:'100'}
                     this.loading = false
                     this.$router.go(-1)
                  })
               } else {
                  this.$message({
                     message: '添加失败',
                     type: 'warning',
                     duration: 2 * 1000
                  })
               }
            })
         }
      }
   }
</script>

<style>
.price .el-table th.is-leaf, .price .el-table .el-table__body td {border-right:1px solid #ebeef5;text-align:center;}
</style>