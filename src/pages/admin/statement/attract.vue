<template>
   <d2-container class="attract">
      <template slot="header">
         <el-form class="flex end priceFrom" label-position="right" label-width="80px">
            <el-button type="primary" plain @click="loadData" >刷新</el-button>
            <el-form-item label="开始时间">
               <el-date-picker
                  v-model="begin_time"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="timestamp">
               </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
               <el-date-picker
                  v-model="end_time"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="timestamp">
               </el-date-picker>
            </el-form-item>
            <el-button type="primary" @click="searchBtn">搜索</el-button>
         </el-form>
      </template>

      <table class="el-table el-table--fit el-table--border el-table--enable-row-transition el-table__body" style="width:100%;" v-if="!Loading">
         <thead>
         <tr class="active">
            <th class="is-center" style="width:80px;">姓名/日期</th>
            <th class="is-center" v-for="(item,key) in thead" :key="key">{{item}}</th>
            <th class="is-center" style="color:red">总计</th>
         </tr>
         </thead>
         <tbody>
         <tr v-if="Object.values(attractList).length==0">
            <td :colspan="thead.length+2">
               <div class="el-table__empty-block"><span class="el-table__empty-text">暂无数据</span></div>
            </td>
         </tr>
         <tr v-for="(v,k) in attractList" :key="k" v-if="k!='总计'">
            <td class="is-center">{{v.name}}</td>
            <td class="is-center" v-for="(item,key) in v" v-if="key!='name'" :data-id="k" :data-day="key">
               <a title="服务详情" href="javascript:;" v-if="item!=0" @click="started">{{item}}</a>
               <span style="color:#ccc" v-else>-</span>
            </td>
            <td class="is-center" style="color:red">{{rowTotal(v)}}</td>
         </tr>
         <tr v-for="(v,k) in attractList" :key="k" v-if="k=='总计'">
            <td class="is-center">{{v.name}}</td>
            <td class="is-center" v-for="(item,key) in v" v-if="key!='name'" :data-id="k" :data-day="key">{{item}}</td>
            <td class="is-center" style="color:red">{{rowTotal(v)}}</td>
         </tr>
         </tbody>
      </table>
      <el-button type="primary" v-loading.fullscreen.lock="Loading" v-else></el-button>
   </d2-container>
</template>

<script>
   import {httpGet} from '@/api/sys/http'

   //招商
   export default {
      name: 'admin-statement-attract',
      data(){
         return{
            thead:[],
            attractList:{},
            begin_time:'', //开始时间(时间戳)
            end_time:'',   //结束时间(时间戳)
            Loading:true
         }
      },
      created(){
         this.loadData();
      },
      methods:{
         loadData(){
            this.loading = true
            httpGet(`report/merchant`).then(res=>{
               for (let [key, val] of Object.entries(res.data)) {
                  key == 0 ? this.thead = val : this.attractList[key] = val;
               }
               this.Loading = false
            })
         },
         searchBtn(){
            this.loading = true
            httpGet(`report/merchant?begin_time=${this.begin_time/1000}&end_time=${this.end_time/1000}`).then(res=>{
               for (let [key, val] of Object.entries(res.data)) {
                  key == 0 ? this.thead = val : this.attractList[key] = val;
               }
               this.Loading = false
            })
         },
         started(e){
            let year = `${new Date().getFullYear()}-`, id = e.target.parentNode.getAttribute('data-id'), time = '';
            time = new Date(year + e.target.parentNode.getAttribute('data-day')).getTime()/1000;
            this.$router.push({name:'admin-statement-detail', query:{id,time,field:'sid'}})
         }
      }
   }
</script>

<style>
.attract .priceFrom .el-button{margin-left:4px;}
.attract .d2-container-full__header .el-form-item{margin:0;}
.attract .d2-container-full__header .el-input{width:180px;}
</style>