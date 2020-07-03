<template>
    <div class="first_level_page">
        <svg style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 38 38" id="selectedActive"> 
                    <circle cx="19" cy="19" r="19" stroke-width="0" fill="#ffa101"/>
                    <line x1="8" y1="18" x2="16" y2="27"
                    style="stroke:#fff;stroke-width:2"/>
                    <line x1="16" y1="27" x2="31" y2="12"
                    style="stroke:#fff;stroke-width:2"/>
                </symbol>

                <symbol viewBox="0 0 38 38" id="selectedDefault"> 
                    <circle cx="19" cy="19" r="17" stroke="rgb(229,229,229)"
                    stroke-width="2" fill="white"/>
                </symbol>
            </defs>
        </svg>
        <div class="confirm_order_main">
            <div class="delivery_address_container">
                <div class="custom_name_tel">
                    <div class="custom_name left">张无极</div>
                    <div class="custom_tel">13567829021</div>
                </div>
                <div class="address ellipsis">
                    郑州市梧桐街30号
                </div>
                <router-link to="/confirmOrder/chooseAddress" class="go_icon">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 30">
                        <polyline points="0,0 14,15 0,30" style="fill:none;stroke:rgb(153,153,153);stroke-width:4"/>
                    </svg> 
                </router-link>
            </div>
            <div class="goods_list_container">
                <div class="warehouse_container">
                    <div>河南好心情食品公司(410022)</div>
                </div>
                <div class="goods_list">
                    <div v-for="spec in payCart.goodsList" class="goods_demo">
                        <div class="goods_name ellipsis left">(奶油味)巧克力</div>
                        <div class="goods_buy right">
                            <div class="goods_price">￥10</div>
                            <div class="goods_buy_num">×20</div>
                            <div class="goods_total_price">￥200</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="discount_container">
                <div class="discount_title">折扣信息</div>
                <div class="discount_demo voucher_discount_demo">
                    <div class="voucher_select" @click="useVoucher">
                        <svg>
                            <use :xlink:href="'#selectedActive'"></use>
                        </svg>
                    </div>
                    <div class="discount_name left">提货券</div>
                       <div class="discount_value right">
                         <div class="select_div" @click="showVoucherList = true">
                            <span v-if="Object.keys(voucher).length > 0">{{voucher.voucherName}}</span>
                            <span v-else>请选择</span>
                            <div class="icon right">
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 26 16">
                                    <polyline points="0,0 13,14 26,0" style="fill:none;stroke:rgb(222,222,222);stroke-width:2"/>
                                </svg> 
                            </div>
                        </div>
                     </div>
                </div>
                <div class="discount_demo">
                    <div class="discount_name left">物流合计费用</div>
                    <div class="discount_value right">￥79</div>
                </div>
                <div class="discount_demo">
                    <div class="discount_name left">优惠金额</div>
                    <div class="discount_value right">￥20</div>
                </div>
                <div class="discount_demo">
                    <div class="discount_name left">
                        备注:
                        <input v-model="remark" maxlength="20" type="text" name="mark" placeholder="选填">
                    </div>
                </div>
            </div>
        </div>
        <div class="hover_notice">
            <div class="marquee">
                <span>已满100减10元</span>
                <span>{{fullAmountMessage}}</span>
                <span>{{fullAmountMessage}}</span>
                <span>{{fullAmountMessage}}</span>
                <span>{{fullAmountMessage}}</span>
            </div>
        </div>
        <div class="confirm_order_bottom">
            <div class="order_total left">
                合计：
                <span class="total_price">￥500</span>
            </div>
            <div class="confirm_order_btn right" @click="commitOrder">
                提交订单
            </div>
        </div>
        <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <!-- 提货券弹窗 -->
        <transition name="fade">
            <div v-if="showVoucherList" class="voucher_model">
                <div class="voucher_model_bg" @click.stop="showVoucherList = false"></div>
                <div class="voucher_main">
                    <div class="voucher_title">选择提货券</div>
                    <div class="voucher_list">
                        <div @click.stop="selectVoucher(voucher)" class="voucher_demo">
                            10元提货券
                        </div>
                        <div @click.stop="selectVoucher(voucher)" class="voucher_demo">
                            5元提货券
                        </div>
                    </div>
                </div>         
            </div>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>

        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import alertTip from 'src/components/common/alertTip'
    import {WXcreateInOrder, calculateLogistics} from 'src/service/getData'
    import {imgBaseUrl} from 'src/config/env'
    import {fmoney} from 'src/config/mUtils'
    import loading from 'src/components/common/loading'

    export default {
        data(){
            return {
                warehouseCode: '',
                payCart: {}, //购物车结算商品
                tickVoucherList: {}, //实物礼品列表
                voucherList: {}, //可用提货券列表
                deliveryFee: 0.00, //物流费
                discount: 0.00, //优惠金额
                showVoucherList: false,
                voucher: {}, //使用的提货券
                payMoney: 0.00, //合计
                remark: '',
                showAlert: false,
                alertText: '',
                tipType: 0, //1:跳转到选择支付方式页面,2:跳转到订单列表页,3:回到购物车页面
                showLoading: false, //显示加载动画
                fullAmountMessage: '',
                employeeId:''
            }
        },
        mounted(){

        },
        components: {
            alertTip,
            loading,
        },
        computed: {
            ...mapState([
                'userInfo','cartList','defaultAddress'
            ]),
            /**
             * 监听cartList变化，更新当前用户的购物车信息userCart，同时返回一个新的对象
             */
            userCart: function (){
                return Object.assign({},this.cartList[this.userInfo.id]);
            },
        },
        methods: {
            ...mapMutations([
                'GOODS_DELETE_CART'
            ]),
            initData(){

            },
            goodsPrice(priceRange, buyNum){
 
            },
            goodsTotalPrice(spec){
 
            },
            //是否使用提货券
            useVoucher(){

            },
            selectVoucher(voucher){

            },
            //合计计算
            goodsTotalAmount(){

            },
            closeTip(){
                this.showAlert = false;

            },
            showTip(tipType, alertText){
                this.tipType = tipType;
                this.alertText = alertText;
                this.showAlert = true;
            },
            async commitOrder(){
               // this.showLoading = true;
                this.$router.push({ name: 'payment', params: {}})
            }
        },
        watch: {
            userInfo: function (value) {

            },
            fullAmountMessage: function(value){
 
            },
            defaultAddress: async function(value){
 
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .confirm_order_main{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.38rem;
        overflow: auto;
        .delivery_address_container{
            position: relative;
            @include wh(100%, 1.46rem);
            background: url(../../images/addressBg.png) no-repeat;
            background-size: 100% .1rem;
            background-color: #fff;
            .custom_name_tel{
                @include wh(100%, .7rem);
                @include sc(.3rem, #333);
                padding-top: .4rem;
                line-height: .3rem;
                .custom_name{
                    margin-left: .24rem;
                    margin-right: .7rem;
                }
            }
            .address{
                @include sc(.28rem, #666);
                margin-left: .24rem;
                margin-top: .22rem;
                margin-right: .5rem;
            }
            .go_icon{
                position: absolute;
                right: 0;
                top: 0;
                margin-top: -.1rem;
                display: block;
                padding: .68rem .2rem .58rem;
                svg{
                    float: left;
                    @include wh(.16rem, .3rem);
                }
            }
        }
        .goods_list_container{
            background: #fff;
            margin-top: .2rem;
            .warehouse_container{
                @include sc(.3rem, #333);
                @include wh(100%, .9rem);
                border-bottom: .01rem solid #dedede;
                div{
                    margin-left: .24rem;
                    line-height: .9rem;
                }
            }
            .goods_list{
                background: #fff;
                .goods_demo{
                    margin-left: .5rem;
                    border-bottom: .01rem solid #dedede;
                    height: .84rem;
                    line-height: .84rem;
                    @include sc(.28rem, #333);
                    .goods_name{
                        @include wh(2.8rem, 100%);
                    }
                    .goods_buy{
                        margin-right: .2rem;
                        @include wh(4rem, 100%);
                        display: flex;
                        .goods_price{
                            width: 1.4rem;
                        }
                        .goods_buy_num{
                            width: 1rem;
                        }
                        .goods_total_price{
                            width: 1.6rem;
                            text-align: right;
                        }
                    }
                }
                .goods_demo:last-child{
                    border-bottom: none;
                }
            }
        }
        .gift_list_container{
            background: #fff;
            margin-top: .2rem;
            .gift_title{
                @include sc(.3rem, #333);
                height: .9rem;
                border-bottom: .01rem solid #dedede;
                padding-left: .24rem;
                line-height: .9rem;
            }
            .gift_list{
                background: #fff;
                .gift_demo{
                    margin-left: .5rem;
                    border-bottom: .01rem solid #dedede;
                    height: .84rem;
                    line-height: .84rem;
                    @include sc(.28rem, #333);
                    .gift_name{
                        @include wh(4.2rem, 100%);
                    }
                    .gift_buy{
                        margin-right: .2rem;
                        @include wh(2.6rem, 100%);
                        display: flex;
                        .gift_price{
                            width: 1.4rem;
                        }
                        .gift_buy_num{
                            width: 1.2rem;
                            text-align: right;
                        }
                    }
                }
                .gift_demo:last-child{
                    border-bottom: none;
                }
            }
        }
        .discount_container{
            background: #fff;
            margin-top: .2rem;
            margin-bottom: .2rem;
            .discount_title{
                padding-left: .24rem;
                height: .9rem;
                line-height: .9rem;
                @include sc(.3rem, #333);
                border-bottom: .01rem solid #dedede;
            }
            .discount_demo{
                @include sc(.28rem, #333);
                height: .84rem;
                margin-left: .5rem;
                padding-right: .2rem;
                border-bottom: .01rem solid #dedede;
                line-height: .82rem;
                position: relative;
                .discount_value{
                    .select_div{
                        @include wh(2.54rem, .48rem);
                        border: .01rem solid #dedede;
                        border-radius: .04rem;
                        line-height: .48rem;
                        margin-top: .18rem;
                        padding-left: .1rem;
                        padding-right: .2rem;
                        @include sc(.26rem, #333);
                        .icon{
                            @include wh(.26rem, .16rem);
                        }
                    }
                }
            }
            .discount_demo:last-child{
                border-bottom: none;
            }
            .voucher_discount_demo{
                .discount_name{
                    padding-left: .4rem;
                    input{
                        height: .82rem;
                        width: 6rem;
                        border: none;
                    }
                }
                .voucher_select{
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: .4rem;
                    padding: .28rem 0;
                    svg{
                        float: left;
                        @include wh(.28rem, .28rem);
                    }
                }            
            }
        }
    }
    .hover_notice{
        position: fixed;
        left: 0;
        right: 0;
        bottom: .94rem;
        height: .44rem;
        line-height: .44rem;
        background: #fff9ef;
        @include sc(.24rem, $orange);
        .marquee{
            display: block;
            width: 300%;
            height: .44rem;
            position: absolute;
            overflow: hidden;
            animation: marquee 10s linear infinite;
            span {
                @include sc(.24rem, #ff4400);
                float: left;
                padding: 0 .4rem;
            }
        }
        @keyframes marquee {
            0% { left: 0; }
            100% { left: -100%; }
        }
    }
    .confirm_order_bottom{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: .94rem;
        line-height: .94rem;
        background: #fff;
        .order_total{
            margin-left: .24rem;
            @include sc(.3rem, #333);
            .total_price{
                color: $orange;
            }
        }
        .confirm_order_btn{
            @include wh(2.5rem, 100%);
            background: $orange;
            @include sc(.34rem, #fefffe);
            text-align:center;
        }
    }
    .voucher_model{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .voucher_model_bg{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,.5);
            z-index: -1;
        }
        .voucher_main{
            @include wh(5.5rem, 5rem);
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -3rem;
            margin-left: -2.75rem;
            background: #efeff4;
            border-radius: .16rem;
            .voucher_title{
                border-top-left-radius: .16rem;
                border-top-right-radius: .16rem;
                background: #ebebeb;
                @include wh(100%, .86rem);
                @include sc(.32rem, #333);
                font-weight: bold;
                line-height: .86rem;
                text-align: center;
                border-bottom: .01rem solid #ccc;
            }
            .voucher_list{
                @include wh(100%, 4.14rem);
                overflow: auto;
                .voucher_demo{
                    @include wh(100%, .88rem);
                    border-bottom: .01rem solid #ccc;
                    @include sc(.3rem, #333);
                    text-align: center;
                    line-height: .88rem;
                    background: #fff;
                }
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .slid_up-enter-active, .slid_up-leave-active {
        transition: all .3s;
    }
    .slid_up-enter, .slid_up-leave-active {
        transform: translate3d(0,10rem,0)
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
