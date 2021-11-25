<template>
  <el-dialog :title="titleName" :visible.sync="dialogFormVisible" width="500px">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="form.path" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="vue文件路径" prop="component">
        <el-input v-model="form.component" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="content" prop="content">
        <el-input v-model="form.content" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="icon" prop="icon">
        <el-input v-model="form.icon" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="proxyPath" prop="proxyPath">
        <el-input v-model="form.proxyPath" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="false" label="parentId" prop="parentId">
        <el-input v-model="form.parentId" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/menuManagement'

  export default {
    name: 'MenuManagementEdit',
    data() {
      return {
        form: {},
        rules: {
          id: [{ required: true, trigger: 'blur', message: '请输入路径' }],
        },
        titleName: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.titleName = '添加'
        } else {
          this.titleName = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            console.log(JSON.stringify(this.form))
            const { msg } = await doEdit(this.form)
            this.$baseMessage(msg, 'success')
            this.$emit('fetch-data')
            this.close()
          } else {
            return false
          }
        })
      },
    },
  }
</script>
