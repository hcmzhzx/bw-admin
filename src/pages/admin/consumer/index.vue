<template>
   <d2-container class="user">
      <template slot="header">
         <el-form class="flex end priceFrom" label-position="right" label-width="80px">
            <el-button type="primary" plain @click="loadData">刷新</el-button>
            <el-form-item label="类型">
               <el-select name="type" v-model="search.type" placeholder="请选择">
                  <el-option label="开通" value="1"></el-option>
                  <el-option label="过期" value="2"></el-option>
                  <el-option label="访客" value="3"></el-option>
                  <el-option label="用户" value="4"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="所属员工">
               <el-select name="admin_id" v-model="search.admin_id" placeholder="所属员工">
                  <el-option v-for="v in admin" :key="v.id" :label="v.username" :value="v.id"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="所属公司">
               <el-select name="brand_id" v-model="search.brand_id" placeholder="所属公司">
                  <el-option v-for="v in brand" :key="v.id" :label="v.name" :value="v.id"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item class="append" label="其他信息">
               <el-select name="other" v-model="search.other" placeholder="请选择">
                  <el-option label="手机号" value="phone"></el-option>
                  <el-option label="微信" value="wechat"></el-option>
               </el-select>
            </el-form-item>
            <el-input name="key" v-model="search.key" placeholder="搜索内容"></el-input>
            <el-button type="primary" @click="searchBtn">搜索</el-button>
         </el-form>
      </template>
      <template>
         <el-table :data="data" tooltip-effect="dark" border style="width:100%" @select="selecChange" @select-all="allselec" v-loading="loading">
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column align="center" prop="id" label="id" width="80"></el-table-column>
            <el-table-column align="center" prop="cname" label="用户名"></el-table-column>
            <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
            <el-table-column align="center" prop="wechat" label="微信"></el-table-column>
            <el-table-column align="center" prop="bid" label="公司"></el-table-column>
            <el-table-column align="center" prop="superior.cname" label="推荐人"></el-table-column>
            <el-table-column align="center" prop="superior_up.cname" label="推荐人上级"></el-table-column>
            <el-table-column align="center" prop="reward" label="推广比例(%)" width="90"></el-table-column>
            <el-table-column align="center" label="关注" width="90">
               <template slot-scope="scope">
                  <el-tag :type="scope.row.subscribe==0? 'danger' : 'success'">{{scope.row.subscribe==0 ? '未关注' : '已关注'}}</el-tag>
               </template>
            </el-table-column>
            <el-table-column align="center" label="用户类型" width="90">
               <template slot-scope="scope">
                  <el-tag data="1" v-if="(scope.row.role==0 || scope.row.role==1) && !scope.row.locktime" :type="scope.row.role ? '' : 'info'" plain>{{scope.row.role ? '用户' : '访客'}}</el-tag>
                  <el-tag time="1" :type="new Date(scope.row.locktime).getTime()<=new Date().getTime() ? 'danger' : 'success'" v-else>{{new Date(scope.row.locktime)<=new Date().getTime() ? '过期' : '开通'}}</el-tag>
               </template>
            </el-table-column>
            <el-table-column align="center" prop="locktime" label="到期时间" width="160"></el-table-column>
            <el-table-column align="center" prop="addtime" label="注册时间" width="160"></el-table-column>
            <el-table-column align="center" label="推广链接" width="90">
               <template slot-scope="scope">
                  <el-button type="success" @click="copyPlate(scope.row.popularize)" size="mini">复制</el-button>
               </template>
            </el-table-column>
            <el-table-column class="flex" align="center" fixed="right" label="操作" width="90">
               <template slot-scope="scope">
                  <el-button @click="$router.push({name:'admin-consumer-userInfo',query:{id:scope.row.id, type:'edit'}})" type="text" size="mini">编辑</el-button>
                  <el-button @click="$router.push({name:'admin-consumer-userInfo',query:{id:scope.row.id, type:'check'}})" type="text" size="mini">查看</el-button>
               </template>
            </el-table-column>
         </el-table>
      </template>
      <template slot="footer">
         <div class="between">
            <div class="flex left">
               <el-select v-model="Mcvalue" placeholder="分配合作" style="width:140px">
                  <el-option v-for="item in merchants" :key="item.id" :label="item.username" :value="item.id"></el-option>
               </el-select>
               <el-button type="primary" @click="merchant">分配</el-button>
            </div>
            <el-pagination @current-change="handleCurrent" background layout="prev, pager, next, total" :current-page.sync="pageNo" :page-size="pageSize" :total="total"></el-pagination>
         </div>
      </template>
   </d2-container>
</template>

<script>
   import {httpGet,httpPost,httpPat,httpPut} from '@/api/sys/http'

   export default {
      name: 'admin-consumer',
      data(){
         return {
            data: [],
            admin: [],
            brand: [],
            merchants: [],
            Mcvalue: '',
            user_ids: [],
            search: {type: '', admin_id: '', brand_id: '', other: 'phone', key: ''},
            Search: false,
            pageNo: 1,
            pageSize: 0,
            total: 0,
            loading: true
         }
      },
      async created(){
         await httpGet(`admins`).then(res=> {  // 员工
            for(let item of Object.values(res)){
               this.admin.push(item);
            }
         });
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
         await httpGet(`merchant`).then(res=>{  // 招商
            this.merchants = res
         })
         await this.loadData();
      },
      methods:{
         loadData(){
            this.loading = true; this.Search = false
            httpGet(`user/user_normal`).then(res=>{
               this.data = res.data.map((item)=>{
                  let json = {...item};
                  json.locktime = json.locktime == 0 ? '' : json.locktime
                  json.popularize = `http://${item.plateform}.eyooh.com/?pid=${item.id}`
                  json.bid = item.bid ? this.brand.find(val=>{return item.bid == val.id}).name : ''
                  return json
               })
               this.pageNo = 1
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            });
         },
         searchBtn(){
            if(this.loading) return false;
            this.loading = this.Search = true
            httpGet(`user/user_normal?type=${this.search.type}&admin_id=${this.search.admin_id}&brand_id=${this.search.brand_id}&other=${this.search.other}&key=${this.search.key}`).then(res=>{
               this.data = res.data.map((item)=>{
                  let json = {...item};
                  json.locktime = json.locktime == 0 ? '' : json.locktime
                  json.popularize = `http://${item.plateform}.eyooh.com/?pid=${item.id}`
                  json.bid = item.bid ? this.brand.find(val=>{return item.bid == val.id}).name : ''
                  return json
               })
               this.pageNo = 1
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            })
         },
         handleCurrent(val){
            this.loading = true
            const url = this.Search ? `user/user_normal?type=${this.search.type}&admin_id=${this.search.admin_id}&brand_id=${this.search.brand_id}&other=${this.search.other}&key=${this.search.key}&page=${val}` : `user/user_normal?page=${val}`
            httpGet(url).then(res=>{
               this.data = res.data.map((item)=>{
                  let json = {...item};
                  json.locktime = json.locktime == 0 ? '' : json.locktime
                  json.popularize = `http://${item.plateform}.eyooh.com/?pid=${item.id}`
                  json.bid = item.bid ? this.brand.find(val=>{return item.bid == val.id}).name : ''
                  return json
               })
               this.pageSize = res.per_page
               this.total = res.total
               this.loading = false
            });
         },
         selecChange(val){
            this.user_ids = val.map(item=>{return item.id})
         },
         allselec(val){
            this.user_ids = val.map(item=>{return item.id})
         },
         merchant(){
            if(this.user_ids.length){
               httpPut(`user/set_merchant`,{merchant_id:this.Mcvalue, user_ids:this.user_ids}).then(res=>{
                  this.$message({message: res.message, type: 'success'})
               })
            } else {
               this.$message({message: '请选择分配信息', type: 'warning'})
            }
         },
         copyPlate(txt) {
            let otext = document.createElement('textarea');
            otext.value = txt;
            otext.setAttribute('readonly', 'readonly');
            otext.setAttribute('id', 'copyPlate');
            otext.style = `font-size:12pt;border:0px;padding:0px;margin:0px;position:absolute;left:-9999px;top:0px;`;
            document.body.appendChild(otext);
            otext.select(); // 选中当前对象
            document.execCommand("Copy"); // 将当前选中区复制到剪贴板。
            this.$message({
               message: '复制成功',
               type: 'success',
               onClose: () => {
                  document.body.removeChild(document.querySelector('#copyPlate'))
               }
            })
         }
      }
   }
</script>

<style>
.user table{border-collapse: separate !important;}
.user .priceFrom .el-button{display:-webkit-box;margin-left:4px;}
.user .d2-container-full__header .el-form-item{margin:0;}
.user .d2-container-full__header .el-input{width:180px;}
.user .d2-container-full__header .append .el-input{width:100px;}
.user .el-dialog .el-dialog__body .el-col{margin-bottom:10px;}
</style>