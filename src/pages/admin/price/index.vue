<template>
   <d2-container class="price">
      <el-button type="primary" @click="$router.push({ name:'admin-price-addPrice' })">新增</el-button>
      <template>
         <d2-crud
            :columns="columns"
            :data="data"
            :rowHandle="rowHandle"
            :form-template="formTemplate"
            :form-options="formOptions"
            :form-rules="formRules"
            :options="options"
            :loading="loading"
            @row-edit="handleRowEdit"
            @dialog-cancel="handleDialogCancel"/>
      </template>
      <template slot="footer">
         <el-pagination @current-change="handleCurrent" background layout="prev, pager, next, total" :page-size="pageSize" :total="total"></el-pagination>
      </template>
   </d2-container>
</template>

<script>
   import { httpGet, httpPat } from '@/api/sys/http'
   import recom from './recom'

   export default {
      name: 'admin-price',
      components: { recom },
      data () {
         return {
            data: [],
            siteList: [],
            columns: [
               { title: '站点', key: 'plateform' },
               { title: '支付标题', key: 'body', width: '120' },
               { title: '月数', key: 'unit' },
               { title: '现价', key: 'price' },
               { title: '市场价', key: 'market' },
               { title: '推荐', key: 'commend', component: { name: recom } },
               { title: '排序', key: 'sortid' }
            ],
            rowHandle: {
               columnHeader: '编辑表格',
               width: '120',
               edit: {
                  icon: 'el-icon-edit',
                  text: '编辑',
                  size: 'small'
               }
            },
            formTemplate: {
              /* plateform:{title: '站点', component: {
                  name: 'el-select',
                  options: this.siteList,
                  size: 'small',
                  disabled () {
                     return false
                  }
               }}, */
               body: { title: '支付标题', value: '' },
               unit: { title: '月数', value: '' },
               price: { title: '现价', value: '' },
               market: { title: '市场价', value: '' },
               commend: {
                  title: '推荐',
                  value: 0,
                  component: {
                  name: 'el-select',
                  options: [
                     { value: 0, label: '不推荐' },
                     { value: 1, label: '推荐' }
                  ],
                  size: 'small'
               } },
               sortid: { title: '排序', value: '' }
            },
            formOptions: { labelWidth: '80px', labelPosition: 'left', saveLoading: false },
            formRules: {
               plateform: [{ required: true, message: '站点名不能为空', trigger: 'blur' }],
               body: [{ required: true, message: '支付标题不能为空', trigger: 'blur' }],
               unit: [{ required: true, message: '月数不能为空', trigger: 'blur' }],
               price: [{ required: true, message: '现价不能为空', trigger: 'blur' }],
               market: [{ required: true, message: '市场价不能为空', trigger: 'blur' }]
            },
            options: { stripe: true },

            pageSize: 0,
            total: 0,
            loading: true
         }
      },
      created () {
         httpGet(`payment`).then(res => {
            this.data = res.data
            this.pageSize = res.per_page
            this.total = res.total
            this.loading = false
         })
       },
      methods: {
         handleRowEdit ({ index, row }, done) {
            this.formOptions.saveLoading = true
            let Id = 0, posts = {}
            for (let [k, v = ''] of Object.entries(row)) {
               if (k == 'id') { Id = v; continue }
               if (k == 'plateform') continue
               k == 'body' ? posts[k] = v : posts[k] = Number(v)
            }
            httpPat(`payment/${Id}`, posts).then(res => {
               this.$message({ message: '编辑成功', type: 'success' })
               done()
               this.formOptions.saveLoading = false
            })
         },
         handleDialogCancel (done) {
            this.$message({ message: '取消编辑', type: 'warning' })
            done()
         },
         handleCurrent (val) {
            httpGet(`payment?page=${val}`).then(res => {
               this.data = res.data
               this.pageSize = res.per_page
               this.total = res.total
               this.page = res.current_page
            })
         }
      }
   }
</script>

<style>
.price .el-table th.is-leaf,.price .el-table .el-table__body td {border-right: 1px solid #ebeef5;text-align: center;}
</style>