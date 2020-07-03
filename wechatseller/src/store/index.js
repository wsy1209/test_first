import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	defaultAddress: {}, //默认收货地址
	cartList: {}, // 加入购物车的商品列表
	userInfo: null, //用户信息
	login: true,//是否登录
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})