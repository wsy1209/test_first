import {
	RECORD_DEFAULT_ADDRESS,
	ADD_CART,
	REDUCE_CART,
	WAREHOUSE_SELECT_CART,
	GOODS_SELECT_CART,
	WAREHOUSE_DELETE_CART,
	GOODS_DELETE_CART,
	RECORD_CART_GOODS_CHECK,
	INIT_BUYCART,
	CLEAR_CART,
	RECORD_USERINFO,
	GET_USERINFO,
	OUT_LOGIN,
	RETSET_NAME,
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

import {localapi, proapi} from 'src/config/env'

export default {
	// 记录当前用户默认地址
	[RECORD_DEFAULT_ADDRESS](state, defaultAddress) {

	},
	// 加入购物车
	[ADD_CART](state, {

	}) {

	},
	// 移出购物车
	[REDUCE_CART](state, {

	}) {

	},
	// 购物车仓库选择
	[WAREHOUSE_SELECT_CART](state, {
		userId, //登录用户id
		warehouseCode, //仓库代码
	}) {

	},
	// 购物车商品选择
	[GOODS_SELECT_CART](state, {
		userId, //登录用户id
		warehouseCode, //仓库代码
		specificationId, //规格ID 
	}) {

	},
	// 购物车删除整个仓库的商品
	[WAREHOUSE_DELETE_CART](state, {
		userId, //登录用户id
		warehouseCode, //仓库代码
	}) {

	},
	// 购物车删除某个特定商品
	[GOODS_DELETE_CART](state, {
		userId, //登录用户id
		warehouseCode, //仓库代码
		specificationId, //规格ID
	}) {

	},
	//更改购物车商品校验信息
	[RECORD_CART_GOODS_CHECK](state,{
		userId,
		warehouseCode,
		specificationId,
		goodsCheck
	}) {

	},	
	//网页初始化时从本地缓存获取购物车数据
	[INIT_BUYCART](state) {

	},
	//清空当前商品的购物车信息
	[CLEAR_CART](state, shopid) {

	},
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.uid);
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
	//修改用户名
	[RETSET_NAME](state,username) {
		
	},
	//退出登录
	[OUT_LOGIN](state) {
		state.userInfo = null;
		state.login = false;
	},
}
