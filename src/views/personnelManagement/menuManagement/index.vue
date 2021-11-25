<template>
  <div class="menuManagement-container">
    <el-divider content-position="left">
      演示环境仅做基础功能展示，若想实现不同角色的真实菜单配置，需将settings.js路由加载模式改为all模式，由后端全面接管路由渲染与权限控制
    </el-divider>
    <el-row>
      <el-col :xs="24" :sm="24" :md="16" :lg="20" :xl="20">
        <vab-query-form>
          <vab-query-form-top-panel :span="12">
            <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
              添加
            </el-button>
          </vab-query-form-top-panel>
        </vab-query-form>
        <el-table
          v-loading="listLoading"
          :data="list"
          :element-loading-text="elementLoadingText"
          row-key="path"
          border
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="name"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="id"
            label="id"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="path"
            label="路径"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="component"
            label="vue文件路径"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="title"
            label="标题"
          ></el-table-column>
          <el-table-column show-overflow-tooltip label="图标">
            <template #default="{ row }">
              <vab-icon v-if="row.icon" :icon="['fas', row.icon]"></vab-icon>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="proxyPath"
            label="proxyPath"
          ></el-table-column>
          <el-table-column
            v-if="false"
            show-overflow-tooltip
            prop="content"
            label="内容"
          ></el-table-column>
          <el-table-column show-overflow-tooltip label="操作" width="200">
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row, 'edit')">
                编辑
              </el-button>
              <el-button type="text" @click="handleDelete(row)">删除</el-button>
              <el-button
                v-if="row.children"
                type="text"
                @click="handleEdit(row, 'add')"
              >
                添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <edit ref="edit" @fetch-data="fetchData"></edit>
  </div>
</template>

<script>
  import { getRouterList as getList } from '@/api/router'
  import { doDelete } from '@/api/menuManagement'
  import Edit from './components/MenuManagementEdit'

  export default {
    name: 'MenuManagement',
    components: { Edit },
    data() {
      return {
        data: [],
        list: [],
        listLoading: true,
        elementLoadingText: '正在加载...',
      }
    },
    async created() {
      this.fetchData()
    },
    methods: {
      handleEdit(row, action) {
        if (action === 'add') {
          let rowcopy = {}
          rowcopy.parentId = row.id
          this.$refs['edit'].showEdit(rowcopy)
        } else if (row.path) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        }
      },
      async fetchData() {
        this.listLoading = true

        const { data } = await getList()
        this.list = data
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      },
      handleNodeClick(data) {
        this.fetchData()
      },
    },
  }
</script>
