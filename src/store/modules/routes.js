/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { getRouterList, getRouterMenuList } from '@/api/router'
import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes'
import EmptyLayout from '@/layouts/EmptyLayout'
import { json } from 'body-parser'

const state = () => ({
  routes: [],
  partialRoutes: [],
})
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setAllRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = constantRoutes.concat(routes)
  },
}
const actions = {
  async setRoutes({ commit }, permissions) {
    let { data } = await getRouterMenuList()
    let accessRoutes = convertRouter(data)
    var copyasyncRoutes = [].concat(accessRoutes).concat(asyncRoutes)
    //开源版只过滤动态路由permissions，admin不再默认拥有全部权限
    const finallyAsyncRoutes = await filterAsyncRoutes(
      [...copyasyncRoutes],
      permissions
    )
    console.log(JSON.stringify(copyasyncRoutes))
    commit('setRoutes', finallyAsyncRoutes)
    return finallyAsyncRoutes
  },
  async setAllRoutes({ commit }) {
    let { data } = await getRouterList()
    data.push({ path: '*', redirect: '/404', hidden: true })
    let accessRoutes = convertRouter(data)
    commit('setAllRoutes', accessRoutes)
    return accessRoutes
  },
  setPartialRoutes({ commit }, accessRoutes) {
    commit('setPartialRoutes', accessRoutes)
    return accessRoutes
  },
}
export default { state, getters, mutations, actions }
