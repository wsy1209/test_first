import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const category = r => require.ensure([], () => r(require('../page/category/category')), 'category')
const cart = r => require.ensure([], () => r(require('../page/cart/cart')), 'cart')
const goodsDetail = r => require.ensure([], () => r(require('../page/goodsDetail/goodsDetail')), 'goodsDetail')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const orderDetail = r => require.ensure([], () => r(require('../page/order/children/orderDetail')), 'orderDetail')
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const payment = r => require.ensure([], () => r(require('../page/confirmOrder/payment')), 'payment')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const address = r => require.ensure([], () => r(require('../page/profile/children/children/address')), 'address')
const add = r => require.ensure([], () => r(require('../page/profile/children/children/children/add')), 'add')
const modifyPassword = r => require.ensure([], () => r(require('../page/profile/children/children/modifyPassword')), 'modifyPassword')
const modifyPayPassword = r => require.ensure([], () => r(require('../page/profile/children/children/modifyPayPassword')), 'modifyPayPassword')

const addDetail = r => require.ensure([], () => r(require('../page/profile/children/children/children/children/addDetail')), 'addDetail')
const balance = r => require.ensure([], () => r(require('../page/balance/balance')), 'balance')
const balanceDetail = r => require.ensure([], () => r(require('../page/balance/children/detail')), 'balanceDetail')
const recharge = r => require.ensure([], () => r(require('../page/balance/children/recharge')), 'recharge')
const rechargeSuccess = r => require.ensure([], () => r(require('../page/balance/children/children/rechargeSuccess')), 'rechargeSuccess')
const regist = r => require.ensure([], () => r(require('../page/regist/regist')), 'regist')
const registSuccess = r => require.ensure([], () => r(require('../page/regist/children/registSuccess')), 'registSuccess')
const registProtocol = r => require.ensure([], () => r(require('../page/regist/children/registProtocol')), 'registProtocol')
const confirmPassword = r => require.ensure([], () => r(require('../page/forget/children/confirmPassword')), 'confirmPassword')
const offenList = r => require.ensure([], () => r(require('../page/goodsList/offenList')), 'offenList')
const goodsList = r => require.ensure([], () => r(require('../page/goodsList/goodsList')), 'goodsList')
const brandList = r => require.ensure([], () => r(require('../page/brand/brandList')), 'brandList')
const myMessages = r => require.ensure([], () => r(require('../page/profile/children/myMessages')), 'myMessages')
const newMechanisms = r => require.ensure([], () => r(require('../page/profile/children/children/newMechanisms')), 'newMechanisms')

const setPayPwd = r => require.ensure([], () => r(require('../page/confirmOrder/children/setPayPwd')), 'setPayPwd')
const confirmPayPwd = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/confirmPayPwd')), 'confirmPayPwd')
const paySuccess = r => require.ensure([], () => r(require('../page/confirmOrder/children/paySuccess')), 'paySuccess')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转login页面
        {
            path: '',
            redirect: '/login'
        },
        //首页
        {
            path: '/home',
            component: home,
            meta: {
                title: '量子商户端',
                requiresAuth: true,
                keepAlive: true
            }
        },
        //常购清单 --下拉
        {
            path: '/offenList',
            component: offenList,
            meta: {
                title: '常购清单',
                requiresAuth: true
            }
        },
        //品牌专区
        {
            path: '/brandList',
            component: brandList,
            meta: {
                title: '品牌专区',
                requiresAuth: true
            }
        },
        //注册
        {
            path: '/regist',
            component: regist,
            meta: {
                title: '注册'
            },
            children: [{
                path: 'registSuccess', //注册成功页
                component: registSuccess,
                meta: {
                    title: '注册成功'
                }
            },{
                path: 'registProtocol', //注册协议页
                component: registProtocol,
                meta: {
                    title: '注册协议'
                }
            }]
        },
        //订购分类页
        {
            path: '/category',
            component: category,
            meta: {
                title: '订购分类',
                requiresAuth: true,
                keepAlive: true
            }
        },
        //热销商品列表页和新品推荐列表页
        {
            path: '/goodsList',
            component: goodsList,
            meta: {
                title: '商品列表',
                requiresAuth: true
            }
        },
        //购物车页
        {
            path: '/cart',
            component: cart,
            meta: {
                title: '购物车',
                requiresAuth: true,
                keepAlive: true
            }
        },
        //商品详情页
        {
            path: '/goodsDetail',
            component: goodsDetail,
            meta: {
                title: '商品详情',
                requiresAuth: true
            }
        }, 
        //支付方式选择页面
        {
            path: '/payment', 
            name: 'payment',
            component: payment,
            meta: {
                title: '支付方式选择',
                requiresAuth: true
            },
            children: [{
                path: 'paySuccess',//支付结果页面
                component: paySuccess,
                name: 'paySuccess',
                meta: {
                    title: '支付结果',
                    requiresAuth: true
                }
            },{
                path: 'setPayPwd',
                component: setPayPwd,
                name: 'setPayPwd',
                meta: {
                    title: '设置支付密码',
                    requiresAuth: true
                },
                children: [{
                    path: 'confirmPayPwd', //设置支付密码
                    name: 'confirmPayPwd',
                    component: confirmPayPwd,
                    meta: {
                        title: '设置支付密码',
                        requiresAuth: true
                    }
                }]
            },{
                path: 'forgetPayPwd',
                component: setPayPwd,
                name: 'forgetPayPwd',
                meta: {
                    title: '找回支付密码',
                    requiresAuth: true,
                    type: 'forget'
                },
                children: [{
                    path: 'modifyPayPwd', //支付密码页
                    name: 'modifyPayPwd',
                    component: confirmPayPwd,
                    meta: {
                        title: '找回支付密码',
                        requiresAuth: true
                    }
                }]
            }]
        },
        //确认订单页
        {
            path: '/confirmOrder',
            name: 'confirmOrder',
            component: confirmOrder,
            meta: {
                title: '确认订单',
                requiresAuth: true
            },
            children: [{
                path: 'chooseAddress', //选择地址
                component: address,
                meta: {
                    title: '选择地址',
                    requiresAuth: true,
                    type: 'confirmOrder'
                },
                children: [{
                    path: 'addAddress', //添加地址
                    component: add,
                    meta: {
                        title: '添加地址',
                        requiresAuth: true,
                        type: 'confirmOrder'
                    },
                    children: [{
                        path: 'searchAddress', //搜索地址
                        name: 'searchAddress',
                        component: addDetail,
                        meta: {
                            title: '搜索地址',
                            requiresAuth: true,
                            type: 'confirmOrder'
                        }
                    }]
                }]
            }, ]
        },
        //登录页
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                title: '登录'
            }
        },
        //个人信息页
        {
            path: '/profile',
            component: profile,
            meta: {
                title: '我的',
                requiresAuth: true,
                keepAlive: true
            },
            children: [{
                path: 'info', //个人信息详情页
                component: info,
                meta: {
                title: '个人信息',
                requiresAuth: true
               },
                children: [{
                    path: 'modifyPassword', //修改密码页
                    component: modifyPassword,
                    meta: {
                        title: '修改密码',
                        requiresAuth: true
                    }
                },{
                    path: 'modifyPayPassword', //修改支付密码页
                    component: modifyPayPassword,
                    meta: {
                        title: '修改支付密码',
                        requiresAuth: true
                    }
                },{
                    path: 'address',
                    component: address,     //编辑地址
                    meta: {
                        title: '编辑地址',
                        requiresAuth: true
                    },
                    children:[{
                        path:'add',
                        component:add,
                        meta: {
                            title: '新增地址',
                            requiresAuth: true
                        },
                        children:[{
                            path:'addDetail',
                            name:'addDetail',
                            component:addDetail,
                            meta: {
                                title: '地图',                           
                                requiresAuth: true
                            },
                        }]
                    }]
                }]
            }]
        },
        //修改密码页
        {
            path: '/forget',
            component: forget,
            meta: {
                title: '找回密码'
            },
            children: [{
                path: 'confirmPassword', //确认修改密码页
                component: confirmPassword,
                meta: {
                    title: '确认修改密码'
                }
            }]
        },
        //订单列表页
        {
            path: '/order',
            component: order,
            meta: {
                title: '订单列表',
                requiresAuth: true
            },
            children: [{
                path: 'orderDetail', //订单详情页
                component: orderDetail,
                meta: {
                    title: '订单详情',
                    requiresAuth: true
                }
            }, ]
        },
        //资产管理
        {
            path: '/balance',
            component: balance,
            meta: {
                title: '我的钱包',
                requiresAuth: true
            },
            children: [{
                path: 'detail', //资产明细
                component: balanceDetail,
                meta: {
                    title: '资产明细',
                    requiresAuth: true
                     }
            },{
                path: 'recharge', //充值
                component: recharge,
                meta: {
                    title: '充值',
                    requiresAuth: true
                },
                children: [{
                    path: 'rechargeSuccess', //充值结果
                    component: rechargeSuccess,
                    meta: {
                        title: '充值结果',
                        requiresAuth: true
                    },
                }]
            },]
        },
        //消息中心
        {
            path: '/myMessages',
            component: myMessages,
            meta: {
                title: '消息中心',
                requiresAuth: true
            },
            children: [{
                path: 'newMechanisms', //新的供应商
                component: newMechanisms,
                meta: {
                    title: '新的供应商',
                    requiresAuth: true
                }
            }]
        }
    ]
}]
