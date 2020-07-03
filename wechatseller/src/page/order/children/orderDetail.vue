<template>
    <div class="second_level_page order_detail_page">
        <section class="delivery_address_container">
            <div class="contacter clear">
                <div class="left"><span>收货人：</span>张默默</div>
                <div class="right">16890536789</div>
            </div>
            <div class="address clear">
                郑州市大学科技园c7a
            </div>
        </section>   
        <section class="mark clear">
            <div class="text left">备注：</div>
            <div class="value left">支付完成了吗</div>
        </section>
        <section class="order_info">
            <div><span>订单号：</span>201812980001</div>
            <div><span>下单时间：</span>2018-08-12</div>
            <div><span>付款方式：</span>货到付款</div>
            <div><span>订单状态：</span>未支付</div>
        </section>
        <section class="goods_info">
            <div class="title">商品信息</div>
            <div class="goods_list">
                <div class="goods_demo">
                    <div>
                        <div class="goods_demo-left left">
                            <img src="../../../images/goods01.png">
                        </div>
                        <div class="goods_demo-right">
                            <div class="goods_name ellipsis">康师傅凉茶</div>
                            <div class="goods_sku_sale">
                                <span class="goods_sku">瓶</span>
                            </div>
                            <div class="goods_price_buy">
                                <div class="goods_price left"> ￥5</div>
                                <div class="goods_buy right">
                                    ×20
                                </div>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>
        </section>
        <section class="money_info">
            <div class="money_demo clear">
                <div class="left">物流费用</div>
                <div class="right">￥{{orderData.deliveryFee || 0}}</div>
            </div>
            <div class="money_demo clear">
                <div class="left">优惠金额</div>
                <div class="right">￥{{orderData.reducedAmount || 0}}</div>
            </div>
            <div class="total_money_demo clear">
                <div class="left">应付款</div>
                <div class="right total_money_value">￥{{orderData.payMoney || 0}}</div>
            </div>
            <div class="money_demo clear">
                <div class="left">退款金额</div>
                <div class="right total_money_value">￥{{orderData.returnAmount || 0}}</div>
            </div>
            <div class="total_money_demo clear">
                <div class="left">实付款</div>
                <div class="right total_money_value">￥{{reallyPayMoney || 0}}</div>
            </div>
        </section>
        <!-- <div class="confirm_btn">
            确认验收
        </div> -->

    <!--     <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition> -->
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getImgPath} from 'src/components/common/mixin'
    import {getOrderDetail} from 'src/service/getData'
    import loading from 'src/components/common/loading'
    import BScroll from 'better-scroll'
    import {imgBaseUrl} from 'src/config/env'
    import {formatDate} from 'src/config/date.js'
    import {fmoney} from 'src/config/mUtils'

    export default {

      data(){
            return{
                showLoading: true, //显示加载动画
                orderData: {},
                imgBaseUrl: '', //图片路径
                orderId: '',     //订单id
                warehouseCode: '', //仓库编号
                goodsNum:0,     //购买商品总数量
                totalMoney:0,    //购买总金额
                reallyPayMoney:0 //实付总金额
            }
        },
        created(){
            this.initData();
        },
        mixins: [getImgPath],
        components: {
            loading,
        },
        computed: {
            ...mapState([
                'orderDetail', 'geohash', 'userInfo'
            ]),
        },
        filters:{
            formateDate(myTime)
            {
                let time=new Date(myTime);
                return formatDate(time,"yyyy-MM-dd hh:mm:ss");
            }
        },
        methods: {
            async initData(){

            },
            getPayType(payType, payChannel){
                if(payType == 1){
                    if(payChannel == 1){
                        return '支付宝支付';
                    }else if(payChannel == 2){
                        return '微信支付';
                    }else{
                        return '在线支付';
                    }
                }else if(payType == 2){
                    return '货到付款';
                }
            },
            getOrderState(orderStep, orderState){
                if(orderState === 0) {
                    return '已关闭';
                } else if (orderState === 3) {
                    return '取消中';
                } else if (orderState === 4) {
                    return '已关闭';
                } else if (orderStep === 1 &&orderState === 1) {
                    return '待支付';
                } else if (orderStep === 2 && orderState === 1) {
                    return '待支付确认';
                } else if (orderStep === 3 || orderStep === 4 || orderStep === 5) {
                    return '已订货';
                } else if (orderStep === 6 && orderState === 1) {
                    return '已发货';
                } else if (orderStep === 8 && orderState === 1) {
                    return '待验货';
                } else if (orderStep === 9 && orderState === 1) {
                    return '验货中';
                } else if (orderStep === 10 && orderState === 1) {
                    return '验货中';
                } else if (orderStep === 11 && orderState === 1) {
                    return '已验货';
                } else if (orderStep === 12 && orderState === 1) {
                    return '待确认交货';
                } else if (orderStep === 13 && orderState===2) {
                    return '已完成';
                } else if (orderStep === 14 && orderState === 1) {
                    return '待退货清点';
                } else if (orderStep === 15 && orderState === 1) {
                    return '退货清点中';
                } else if (orderStep === 16 && orderState===2) {
                    return '已完成';
                }
            },
        },
        watch: {
            userInfo: function (value) {
                if (value && value.uid) {
                    this.initData();
                }
            }
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';

    .delivery_address_container{
        background: #fff;
        margin-bottom: .2rem;
        @include sc(.28rem, #333);
        padding: .4rem .2rem .29rem;
        .contacter{
            @include wh(100%, .28rem);
            line-height: .28rem;
            span{
                @include sc(.28rem, #666);
            }
        }
        .address{
            line-height: .38rem;
            margin-top: .16rem;
        }
    }
    .mark{
        @include sc(.28rem, #333);
        background: #fff;
        padding: 0 .2rem;
        margin-bottom: .2rem;
        .text{
            color: #666;
            line-height: .8rem;
            width: .85rem;
        }
        .value{
            line-height: .38rem;
            width: 6.25rem;
            padding: .2rem 0; 
            text-align: justify;
        }
    }
    .order_info{
        background: #fff;
        padding: .15rem .2rem;
        line-height: .58rem;
        margin-bottom: .2rem;
        @include sc(.28rem, #333);
        span{
            color: #666;
        }
    }
    .goods_info{
        background: #fff;
        margin-bottom: .2rem;
        .title{
            @include wh(100%, .76rem);
            @include sc(.28rem, #333);
            border-bottom: .01rem solid #e3e3e3;
            line-height: .76rem;
            padding-left: .2rem;
        }
        .goods_list{
            .goods_demo{
                @include wh(100%, 2.1rem);
                background: #fff;
                clear: both;
                border-bottom: .01rem solid #e3e3e3;
                .goods_demo-left{
                    margin: .2rem;
                    @include wh(1.7rem, 1.7rem);
                    img{
                        @include wh(100%, 100%);
                    }
                }
                .goods_demo-right{
                    padding-top: .3rem;
                    padding-left: 2.1rem;
                    margin-right: .2rem;
                    .goods_name{
                        @include sc(.3rem, #333);
                        line-height: .3rem;
                        height: .3rem;
                    }
                    .goods_sku_sale{
                        margin-top: .2rem;
                        height: .24rem;
                        line-height: .24rem;
                        @include sc(.24rem, #999);
                        .goods_sku{
                            margin-right: .28rem;
                            @include sc(.24rem, #999);
                        }
                        .goods_sale{
                            @include sc(.24rem, #999);
                        }
                    }
                    .goods_price_buy{
                        height: .54rem;
                        margin-top: .35rem;
                        line-height: .54rem;
                        .goods_price{
                            display: inline-block;
                            @include sc(.36rem, #ffa101);
                        }
                        .goods_buy{
                            @include sc(.28rem, #999);
                            text-align: center;
                            margin-right: .2rem;
                        }
                    }
                }
            }
            .goods_demo:last-child{
                border-bottom: 0;
            }
        }
    }
    .money_info{
        background: #fff;
        margin-bottom: .2rem;
        padding: .15rem .2rem;
        .money_demo{
            div{
                @include sc(.28rem, #999);
                line-height: .58rem;
            }
        }
        .total_money_demo{
            div{
                @include sc(.3rem, #333);
                line-height: .6rem;
                font-weight: bold;
            }
            .total_money_value{
                color: $orange;
            }
        }
    }
    .confirm_btn{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: .96rem;
        @include sc(.32rem, #fff);
        line-height: .96rem;
        background: $orange;
        text-align: center;
    }    
</style>
