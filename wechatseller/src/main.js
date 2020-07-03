import Vue from 'vue'

import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode,baseMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import AMap from 'vue-amap'
import VueLazyLoad from 'vue-lazyload'
import {getJsConfig, shareUrl} from 'src/service/getData'
import wx from 'weixin-js-sdk'

Vue.use(VueLazyLoad,{
    error:'http://image.xinlanjian.com/sys/default/goodsDefault.png',
    loading:'http://image.xinlanjian.com/sys/default/goodsDefault.png'
})

Vue.use(AMap);
AMap.initAMapApiLoader({
  key: 'ebb3c8a4059302230cf0d87e45e0a27b',
  plugin: [ 'AMap.Geolocation', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geocoder', 
  'AMap.Autocomplete', 'AMap.PlaceSearch',  'AMap.PolyEditor', 'AMap.CircleEditor',
  'Amap.AMapManager']

});

Vue.use(require('vue-wechat-title'))

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,
	base: '/wechat/sellers/',
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition ||0}
		}
	}
})

router.beforeEach((to, from, next) => {
    let sellerInfo = localStorage.getItem('sellerInfo');
    if (store.state.userInfo == null && sellerInfo != null) {
        store.state.userInfo = JSON.parse(sellerInfo);
        store.state.defaultAddress = JSON.parse(localStorage.getItem('defaultAddress'));
        store.state.cartList = {...JSON.parse(localStorage.getItem('buyCart'))};
    }
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //这里判断用户是否登录
        if (store.state.userInfo == null) {
            next({
                path: '/login',
                query: {redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        } else {
            if(to.fullPath == '/login'){
                next({
                    path: '/home',
                })
            }else{
                next()
            }
        }
    } else {
        if(to.fullPath == '/login'){
            next({
                path: '/home',
            })
        }else{
            next()
        }
    }
})

Vue.prototype.wxShare = async function (title, desc, link, img) {

};

new Vue({
	router,
	store,
}).$mount('#app')

