<template>
    <div>
        <head-top go-back="true"></head-top>
        <section class="order_section marginTop">
            <div class="order_div" @click="orderByDefault">综合排序</div>
            <div class="order_div" :class="{active: order.name=='sales'}" @click="orderBySale">
                按销量
                <img  src="../../images/orderDefault.png">
            </div>
            <div class="order_div" :class="{active: order.name=='price'}" @click="orderByPrice">
                按价格
                <img  src="../../images/orderDefault.png">
            </div>
        </section>
        <goods-list ref="goodslistref" class="goodsListWrapper" :class="{noOrder: flag == 1 }"    :data="data">
        </goods-list>
<!--         <div class="no_data">
            <img src="../../images/no_data.png" alt="">
        </div>  -->
        <hover-cart></hover-cart>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import headTop from 'src/components/header/head'
    import goodsList from 'src/components/common/goodsList'
    import {searchGoodsByKey,findGoodsByCategory} from 'src/service/getData'
    import hoverCart from 'src/components/common/hoverCart'
    import loading from 'src/components/common/loading'

    export default {
        data() {
            return {
                data: [],
                pulldown: true,
                pullup: true,
                loadingStatus: {
                    showIcon: true,
                    status: ''
                },
                loadFinish: false,
                counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
                num : 10,  // 一次显示多少条
                pageStart : 0, // 开始页数
                pageEnd : 10, // 结束页数,
                flag:1, //页面传递标记
                key:'', //页面传递标记 关键字
                plevel:1, //页面传递的分类级别
                warehouseCode:"",  //仓库编码
                order: {
                    name: 'sales', //''综合排序；sale按销量；price按价格
                    vaule: 'desc' //desc降序；asc升序
                },
                showLoading: true, //显示加载动画
            }
        },
        mounted() {
           // this.loadRefreshData();
        },
        components: {
            headTop,
            goodsList,
            hoverCart,
            loading,
        },
        computed: {
        ...mapState([
            'userInfo',
        ]),
        },
        methods: {
            async loadRefreshData() {

            },
            async loadData() {

            },
            orderByDefault(){
  
            },
            orderBySale(){

            },
            orderByPrice(){

            }
        },
        watch: {
            $route: function(){
                //this.loadRefreshData();
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .goodsListWrapper{
        position: absolute;
        top: 1.82rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }
    .noOrder{
        top: 1.08rem;
    }
    .order_section{
        width: 100%;
        height: .74rem;
        background: #fff;
        display: flex;
        border-bottom: .01rem solid #d6d6d6;
        .order_div{
            flex: 1;
            height: .3rem;
            border-right: .01rem solid #ccc;
            margin-top: .22rem;
            margin-bottom: .22rem;
            line-height: .3rem;
            font-size: .26rem;
            color: #666;
            text-align: center;
            img{
                width: .16rem;
                height: .18rem;
                margin-left: .08rem;
                display: inline-block;
            }
        }
        .order_div.active{
            color: #ffa101;
        }
        .order_div:nth-child(3){
            border-right: none;
        }
    }
    .no_data{
        position: absolute; 
        top: 1.82rem; 
        left: 0; 
        right: 0; 
        bottom: 0; 
        text-align: center; 
        padding-top: 3.5rem; 
        background: #f4f4f4; 
        z-index: 1;
        img{
            width: 1.88rem;
            height: 2.6rem;
        }
    }
</style>
