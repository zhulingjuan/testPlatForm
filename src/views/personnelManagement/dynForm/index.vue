<template>
  <div class="test-form">
    <parser :key="key2" :form-conf="formConf" @submit="sumbitForm1" />
  </div>
</template>

<script>
  import Parser from './components/parser/Parser.vue'
  import { getRouterMenuContent, submitRequest } from '@/api/router'
  import axios from 'axios'

  // 若parser是通过安装npm方式集成到项目中的，使用此行引入
  // import Parser from 'form-gen-parser'

  export default {
    components: {
      Parser,
    },
    props: {},
    data() {
      return {
        key2: +new Date(),
        formConf: {},
        url: '',
      }
    },
    computed: {},
    watch: {},
    async created() {
      await this.fetchData()
    },
    mounted() {},
    methods: {
      async fetchData() {
        let a = window.location + ''
        let b = a.split('/')
        let reqeustParam = {
          firstPath: '/' + b[b.length - 2],
          secondPath: b[b.length - 1],
        }
        const responseData = await getRouterMenuContent(reqeustParam)
        this.formConf = responseData.data.data
        this.url = responseData.data.url
        this.key2 = +new Date()
      },
      async sumbitForm1(data) {
        const res = await submitRequest(this.url, data)
        const isSsuccess = res.code === 0 ? 'success' : 'error'
        this.$baseMessage(res.msg, isSsuccess)
        console.log('sumbitForm1提交数据：', data)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .test-form {
    margin: 15px auto;
    width: 800px;
    padding: 15px;
  }
</style>
