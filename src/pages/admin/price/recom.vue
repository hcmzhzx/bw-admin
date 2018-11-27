<template>
   <el-tag :type="type">{{ text }}</el-tag>
</template>

<script>
   export default {
      props: {
         value: {
            type: Number,
            require: true
         }
      },
      computed: {
         type () {
            return this.value ? 'success' : 'danger'
         },
         text () {
            return this.value ? '推荐' : '不推荐'
         }
      }
   }
</script>