<template>
   <d2-container class="details">
      <el-form ref="form" :model="data" label-width="80px" v-loading="loading">
         <el-form-item label="标题:"><input type="text" v-model="data.title" disabled></el-form-item>
         <el-form-item label="描述:"><input type="text" v-model="data.desc" disabled></el-form-item>
         <el-form-item label="创建时间:"><input type="text" v-model="data.created_at" disabled></el-form-item>
         <el-form-item label="作者:"><input type="text" v-model="data.creator" disabled></el-form-item>
         <el-form-item label="阅读量:"><input type="text" v-model="data.view" disabled></el-form-item>
         <el-form-item label="所属品牌:"><input type="text" v-model="data.brand_id.name" disabled></el-form-item>
         <el-form-item label="音乐:" v-if="data.audio.title">
            <input type="text" v-model="data.audio.title" disabled>
            <input type="text" v-model="data.audio.desc" disabled>
            <input type="text" v-model="data.audio.src" disabled>
         </el-form-item>
         <el-form-item label="封面图:" v-if="data.covers.length==3">
            <div class="flex imgs" v-for="v in data.covers"><img :src="v" class="flex fitimg"></div>
         </el-form-item>
         <el-form-item label="封面图:" v-else><div class="imgs"><img :src="data.cover" class="flex fitimg"></div></el-form-item>
         <el-form-item label="内容:"><div class="content" v-html="data.content"></div></el-form-item>
      </el-form>
   </d2-container>
</template>

<script>
   import {httpGet} from '@/api/sys/http'

   export default {
      name: 'admin-article-details',
      data(){
         return{
            data:{brand_id:{name:''},audio:{title:''},covers:[]}, loading:true
         }
      },
      created(){
         const Id = this.$route.query.id
         if(Id){
            httpGet(`articles/${Id}`).then(res=>{
               this.data = res
               this.loading = false
            })
         } else {
            this.$message({
               message: '请选择查看文章',
               type: 'warning'
            })
         }
      }
   }
</script>

<style>
.details .imgs{display:inline-block;width:100px;height:100px;margin-right:6px;}
.details .content{background:#fff;}
.details .content *{font-size:14px!important;}
</style>