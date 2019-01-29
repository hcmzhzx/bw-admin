<template>
   <d2-container class="article">
      <template slot="header">
         <el-form class="flex end priceFrom" label-position="right" label-width="90px">
            <el-form-item label="文章分类">
               <el-select name="type" v-model="search.cid" placeholder="请选择">
                  <el-option v-for="v in categorie" :key="v.id" :label="v.name" :value="v.id"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="品 牌">
               <el-select name="type" v-model="search.brand_id" placeholder="请选择">
                  <el-option v-for="v in brand" :key="v.id" :label="v.name" :value="v.id"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="分 类">
               <el-select name="type" v-model="search.sort" placeholder="请选择">
                  <el-option label="发表时间" value="id desc"></el-option>
                  <el-option label="浏览数" value="view"></el-option>
                  <el-option label="分享数" value="share"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="标题关键词">
               <el-input name="key" v-model="search.title" placeholder="搜索内容"></el-input>
            </el-form-item>
            <el-button type="primary" @click="searchBtn">搜索</el-button>
         </el-form>
      </template>
      <template>
         <el-table :data="data" border v-loading="loading">
            <el-table-column align="center" prop="id" label="id" width="100"></el-table-column>
            <el-table-column align="center" prop="brand" label="品牌" min-width="120"></el-table-column>
            <el-table-column align="center" prop="title" label="标题" min-width="200"></el-table-column>
            <el-table-column align="center" prop="creator" label="创建者" width="120"></el-table-column>
            <el-table-column align="center" prop="view" label="浏览数" width="140" v-if="search.sort=='view'"></el-table-column>
            <el-table-column align="center" prop="share" label="分享数" width="140" v-if="search.sort=='share'"></el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间" width="160"></el-table-column>
            <el-table-column align="center" label="操作" width="140">
               <template slot-scope="scope">
                  <el-button type="primary" @click="$router.push({name:'admin-article-detail',query:{id:scope.row.id}})" plain>查看详情</el-button>
               </template>
            </el-table-column>
         </el-table>
      </template>
      <template slot="footer">
         <el-pagination @current-change="handleCurrent" background layout="prev, pager, next, total" :current-page.sync="pageNo" :page-size="pageSize" :total="total"></el-pagination>
      </template>
   </d2-container>
</template>

<script>
   import {httpGet} from '@/api/sys/http'

   export default {
      name: 'admin-article',
      data(){
         return{
            data:[],
            brand:[],
            categorie:[],
            search:{cid:'',brand_id:'',sort:'',title:''},
            Search:false,
            pageNo: 1,
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
         await httpGet(`categories`).then(res=>{  // 获取分类
            this.categorie = res
         })
         await httpGet(`articles`).then(res=>{
            this.data = res.data.map(item=>{
               let json = {...item}, obj = this.brand.find(val=>{
                  return item.brand_id == val.id
               })
               json.brand = obj ? obj.name : ''
               return json
            })
            this.pageSize = res.per_page
            this.total = res.total
            this.loading = false
         })
      },
      methods:{
         searchBtn(){
            this.loading = this.Search = true
            httpGet(`articles?cid=${this.search.cid}&brand_id=${this.search.brand_id}&sort=${this.search.sort}&title=${this.search.title}`).then(res=>{
               this.data = res.data.map(item=>{
                  let json = {...item}, obj = this.brand.find(val=>{
                     return item.brand_id == val.id
                  })
                  json.brand = obj ? obj.name : ''
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
            const url = this.Search ? `articles?cid=${this.search.cid}&brand_id=${this.search.brand_id}&sort=${this.search.sort}&title=${this.search.title}&page=${val}` : `articles?page=${val}`
            httpGet(url).then(res=>{
               this.data = res.data.map(item=>{
                  let json = {...item}, obj = this.brand.find(val=>{
                     return item.brand_id == val.id
                  })
                  json.brand = obj ? obj.name : ''
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

<style>
.article .d2-container-full__header .el-form-item{margin:0;}
.article .d2-container-full__header .el-input{width:180px;}
</style>