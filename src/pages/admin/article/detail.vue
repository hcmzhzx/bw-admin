<template>
   <d2-container class="Details">
      <!--<el-form ref="form" :model="data" label-width="80px" v-loading="loading">
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
      </el-form>-->
      <div class="content" v-if="!loading">
         <div class="title">{{data.title}}</div>
         <div class="flex info">
            <span class="flex">作者:{{data.creator}}</span><span class="flex">创建时间:{{data.created_at}}</span>
         </div>
         <div class="audio" v-if="data.audio.title">
            <div class="cliptext">标题:{{data.audio.title}}</div>
            <div class="desc">描述:{{data.audio.desc}}</div>
            <a :href="data.audio" class="src">音频地址</a>
         </div>
         <div class="article" v-html="data.content"></div>
         <div class="between options">
            <span class="flex">阅读量:{{data.view}}</span><span class="flex">所属品牌:{{data.brand_id.name}}</span>
         </div>
      </div>
      <el-button type="primary" v-loading.fullscreen.lock="loading" v-else></el-button>
   </d2-container>
</template>

<script>
   import {httpGet} from '@/api/sys/http'

   export default {
      name: 'detail',
      data(){
         return {
            data: {brand_id: {name: ''}, audio: {title: ''}},
            loading: true
         }
      },
      created(){
         const Id = this.$route.query.id
         if (Id) {
            httpGet(`articles/${Id}`).then(res => {
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
.Details *{margin:0;padding:0;}
.Details .content{max-width:414px;max-height:736px;overflow-x:hidden;overflow-y:auto;padding:16px;background:#fff;}
.Details .content .title{font-size:24px;}
.Details .content .info{padding:10px 0 20px;}
.Details .content .info>span{padding-right:10px;font-size:16px;color:#999;}
.Details .content .article img{width:100%;object-fit:cover;}
.Details .content .options{padding-top:12px;border-top:1px solid #eee;}
.Details .content .options>span{font-size:16px;color:#999;}
</style>