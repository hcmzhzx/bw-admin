<template>
   <d2-container>
      <template>
         <el-form :model="Data" ref="ruleForm" :rules="rules" style="width:60%" label-position="left">
            <el-form-item label="站点标识" prop="site"><el-input v-model="Data.site"></el-input></el-form-item>
            <el-form-item label="公众号appid" prop="appid"><el-input v-model="Data.appid"></el-input></el-form-item>
            <el-form-item label="公众号secret" prop="appsecret"><el-input v-model="Data.appsecret"></el-input></el-form-item>
            <el-form-item label="品牌"><el-input v-model="Data.bid"></el-input></el-form-item>
            <el-form-item label="站点名"><el-input v-model="Data.title"></el-input></el-form-item>
            <el-form-item label="站点LOGO">
               <el-upload class="upload-demo"
                    action="string"
                    :beforeUpload="upLogo"
                    :file-list="Data.logo"
                    :multiple=false
                    list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
               </el-upload>
            </el-form-item>
            <el-form-item label="站点描述"><el-input v-model="Data.desc"></el-input></el-form-item>
            <el-form-item label="公众号二维码">
               <el-upload class="upload-demo"
                    action="string"
                    :before-upload="upCode"
                    :file-list="Data.wxcode"
                    :multiple=false
                    list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
               </el-upload>
            </el-form-item>
            <el-form-item label="客服电话"><el-input type="tel" maxlength="11" v-model="Data.phone"></el-input></el-form-item>
            <el-form-item label="客服微信"><el-input v-model="Data.wechat"></el-input></el-form-item>
            <el-form-item label="开启推广标识"><el-switch v-model="Data.reward" :active-value="1" :inactive-value="0" @change="SW" active-color="#13ce66" inactive-color="#ff4949"></el-switch></el-form-item>
            <el-form-item label="优客码"><el-input v-model="Data.youke"></el-input></el-form-item>
            <el-form-item label="站点类型"><el-input v-model="Data.plateform"></el-input></el-form-item>
            <el-form-item label="访客联系同志模板"><el-input v-model="Data.notify"></el-input></el-form-item>
            <el-form-item label="推广成功通知模板"><el-input v-model="Data.amount"></el-input></el-form-item>
            <el-form-item label="微信商户号"><el-input v-model="Data.mchid"></el-input></el-form-item>
            <el-form-item label="微信商户名称"><el-input v-model="Data.mchname"></el-input></el-form-item>
            <el-form-item label="微信支付秘钥"><el-input v-model="Data.keys"></el-input></el-form-item>
            <el-form-item label="公众号推动服务token"><el-input v-model="Data.token"></el-input></el-form-item>
            <el-form-item label="公众号推动加密秘钥"><el-input v-model="Data.aestoken"></el-input></el-form-item>
            <el-form-item>
               <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
            </el-form-item>
         </el-form>
      </template>
   </d2-container>
</template>

<script>
   import {httpGet, httpPost} from '@/api/sys/http'

   export default {
      name: 'look',
      data(){
         return {
            Data: {
               aestoken: "",
               amount: "",
               appid: "",
               appsecret: "",
               bid: "",
               desc: "",
               keys: "",
               logo: [],
               mchid: "",
               mchname: "",
               notify: "",
               phone: "",
               plateform: "",
               reward: "",
               site: "",
               title: "",
               token: "",
               wechat: "",
               wxcode: [],
               youke: ""
            },
            rules: {
               site: [{required: true, message: '请输入站点标识', trigger: 'blur'}],
               appid: [{required: true, message: '请输入公众号appid', trigger: 'blur'}],
               appsecret: [{required: true, message: '请输入公众号secret', trigger: 'blur'}]
            },

            Site: '', // 站点标识
            state:true
         }
      },
      created(){
         this.Site = this.$route.query.plate;
         // 判断路由是否代参
         if (this.Site) {
            this.state = false
            httpGet(`website/${this.Site}`).then(res => {
               let obj = Object.assign(res.site, res.tpl, res.wechat)
               for(let [k,v] of Object.entries(obj)){
                  if(k == 'logo' || k == 'wxcode'){
                     this.Data[k] = [{url:v}]
                     continue
                  }
                  this.Data[k] = v
                  this.Data.site = this.Site
               }
            })
         }
      },
      methods: {
         // 上传Logo
         upLogo(file){
            const form = new FormData();
            form.append('type', 'website_logo');
            form.append('image', file);
            httpPost(`upload/image`, form).then(res => {
               this.Data.logo = [{url: res.path}]
            })
         },

         // 上传Wxcode
         upCode(file){
            const form = new FormData();
            form.append('type', 'website_qrcode');
            form.append('image', file);
            httpPost(`upload/image`, form).then(res => {
               this.Data.wxcode = [{url: res.path}]
            })
         },

         // 创建按钮
         submitForm(formName){
            this.$refs[formName].validate((valid) => {
               if (valid) {
                  // 判断是新增还是编辑
                  let post = {}
                  for(let [k,v] of Object.entries(this.Data)){
                     if(k == 'logo' || k == 'wxcode'){
                        post[k] = v[0].url
                        continue
                     }
                     post[k] = v
                  }
                  if (this.Site) {
                     httpPost(`website/update`, post).then(()=>{
                        this.$message({
                           message: '上传成功',
                           type: 'success',
                           duration: 2 * 1000,
                           onClose: () => {
                              this.$router.go(-1)
                           }
                        })
                     })
                  } else {
                     httpPost(`website`, post).then(()=>{
                        this.$message({
                           message: '上传成功',
                           type: 'success',
                           duration: 2 * 1000,
                           onClose: () => {
                              this.$router.go(-1)
                           }
                        })
                     })
                  }
               } else {
                  this.$message({
                     message: '上传失败',
                     type: 'warning',
                     duration: 2 * 1000
                  })
               }
            })
         },

         // 赋值开关
         SW(val){
            this.Data.reward = val
         }
      }
   }
</script>