<template>
   <d2-container class="page">
      <d2-page-cover title="事业爆文" sub-title="追求简约美感的后台管理系统集成方案">
         <d2-icon-svg style="width: 120px;" name="d2-admin"/>
         <template slot="footer">
            <div class="page__btn-group">
               <span @click="$open('https://github.com/d2-projects')">开源组织</span> |
               <span @click="$open('https://doc.d2admin.fairyever.com/zh/')">文档</span> |
               <span @click="$open('https://github.com/d2-projects/d2-admin-start-kit')">简化版</span> |
               <span @click="$open('https://alibaba.github.io/ice/scaffold?type=vue')">飞冰</span> |
               <span @click="$open('https://juejin.im/user/57a48b632e958a006691b946/posts')">掘金</span> |
               <span @click="$open('https://awesome.fairyever.com/daily/')">程序员日报</span>
               <!-- |<el-popover :width="172" trigger="hover">
                  <p class="d2-mt-0 d2-mb-10">D2Projects</p>
                  <img src="./image/qr@2x.png" style="width: 172px;">
                  <span slot="reference">微信公众号</span>
                  <p style="font-size:12px;margin-top:0px;margin-bottom:0px;">官方公众号，主要推送前端技术类文章、框架资源、学习教程，以及 D2 系列项目更新信息</p>
               </el-popover>-->
            </div>
         </template>
      </d2-page-cover>
   </d2-container>
</template>

<script>
   export default {
      name:'index'
   }
</script>

<style lang="scss" scoped>
   @import '~@/assets/style/public.scss';

   .page {
      .page__btn-group {
         color: $color-text-placehoder;
         font-size: 12px;
         margin-top: -10px;
         margin-bottom: 20px;
         span {
            color: $color-text-sub;
            &:hover {
               color: $color-text-main;
            }
         }
      }
   }
</style>
