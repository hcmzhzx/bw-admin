<template>
   <d2-container v-if="Type=='edit'">
      <el-form :model="Data" ref="ruleForm" :rules="rules" label-width="90px" label-position="left" v-loading="loading">
            <el-form-item label="手机号" prop="phone">
               <el-input type="tel" maxlength="11" v-model="Data.phone" :disabled="state"></el-input>
            </el-form-item>
            <el-form-item label="微信">
               <el-input v-model="Data.wechat" :disabled="state"></el-input>
            </el-form-item>
            <el-form-item label="关注">
               <el-switch v-model="Data.subscribe" :disabled="state" :active-value="1" :inactive-value="0" @change="SW" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="到期时间">
               <el-date-picker
                  v-model="Data.locktime"
                  :disabled="state"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp">
               </el-date-picker>
            </el-form-item>
            <el-form-item label="普通佣金" :rules="[{required:true, message:'第一项不能为空'}]">
               <el-input v-model="Data.reward[0]" :disabled="state" placeholder="不能为空"></el-input>
            </el-form-item>
            <el-form-item label="经销商佣金">
               <el-input v-model="Data.reward[1]" :disabled="state"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="onSubmit('ruleForm')" :disabled="state">提交</el-button>
            </el-form-item>
         </el-form>
   </d2-container>
   <d2-container class="dealer" v-else>
      <template>
         <el-table :data="tableData" border style="width:100%">
            <el-table-column align="center" prop="cname" label="昵称"></el-table-column>
            <el-table-column align="center" label="头像">
               <template slot-scope="scope">
                  <img :src="scope.row.head" class="qrcode" alt="暂无">
               </template>
            </el-table-column>
            <el-table-column align="center" prop="gender" label="性别"></el-table-column>
            <el-table-column align="center" prop="jod" label="职位"></el-table-column>
            <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
            <el-table-column align="center" prop="wechat" label="微信"></el-table-column>
            <el-table-column align="center" label="微信二维码">
               <template slot-scope="scope">
                  <img :src="scope.row.wxcode" class="qrcode" alt="暂无">
               </template>
            </el-table-column>
            <el-table-column align="center" label="优客码">
               <template slot-scope="scope">
                  <img :src="scope.row.youke" class="qrcode" alt="暂无">
               </template>
            </el-table-column>
            <el-table-column align="center" prop="aname" label="支付宝姓名"></el-table-column>
            <el-table-column align="center" prop="alipay" label="支付宝账号"></el-table-column>
         </el-table>
      </template>
   </d2-container>
</template>

<script>
   import {httpGet,httpPat} from '@/api/sys/http'

   export default {
      name: 'admin-consumer-userInfo',
      data(){
         return {
            Data:{
               phone:'',
               wechat:'',
               subscribe:0,
               locktime:'',
               reward:['0.3']
            },
            tableData:[],
            rules: {
               phone: [{pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号', trigger: 'blur'}]
            },

            Type:'edit',
            state:true,
            Id:'',
            loading:true
         }
      },
      created(){
         this.Id = this.$route.query.id, this.Type = this.$route.query.type
         if(this.Id){
            this.Type=='edit'? this.state = false : ''
            httpGet(`user/${this.Id}`).then(res=>{
               if(this.Type=='edit'){
                  let {phone,wechat,subscribe,locktime,reward} = res
                  this.Data.phone = phone
                  this.Data.wechat = wechat
                  this.Data.subscribe = subscribe
                  this.Data.locktime = locktime == 0 ? '' : locktime*1000
                  this.Data.reward = reward.split(',')
               } else {
                  let json = {}
                  for(let [k,v] of Object.entries(res)){
                     if(k == 'reward'){
                        json[k] = v.split(',')
                     } else if(k == 'locktime'){
                        json.locktime = v == 0 ? '' : v
                     } else if(k == 'gender'){
                        json.gender = v == 0 ? '无性别' : v == 1 ? '男' : '女'
                     } else {
                        json[k] = v
                     }
                  }
                  this.tableData.push(json)
               }
               this.loading = false
            })
         }
      },
      methods:{
         SW(val){ // 赋值开关
            this.Data.subscribe = val
         },
         onSubmit(formName){
            this.loading = true
            this.$refs[formName].validate((valid)=>{
               if(valid){
                  let data = {}
                  for(let [k,v] of Object.entries(this.Data)){
                     if(k == "reward" && v[0]==""){
                        continue
                     } else if(v === ""){
                        continue
                     }
                     data[k] = v
                  }
                  httpPat(`user/${this.Id}`, data).then(res=>{
                     this.$message({
                        message: '编辑成功',
                        type: 'success'
                     })
                     this.loading = false
                     this.$route.go(-1)
                  })
               }
            })
         }
      }
   }
</script>

<style>
.dealer .qrcode{width:132px;height:132px;object-fit:cover;}
</style>