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

                <symbol viewBox="0 0 34 34" id="cancelIcon"> 
                    <line x1="0" y1="0" x2="34" y2="34"
                    style="stroke:rgb(132,134,137);stroke-width:2"/>
                    <line x1="34" y1="0" x2="0" y2="34"
                    style="stroke:rgb(132,134,137);stroke-width:2"/>
                </symbol>
            </defs>
        </svg>
        <section>
            <div class="cart_demo">
                <div class="cart_top">
                    <svg class="select_icon_style" @click="warehouseSelect()">
                        <use :xlink:href="'#selectedDefault'"></use>
                    </svg>
                    <div class="cart_warehouse">
                        <span class="cart_warehouse_name">
                            郑州菜篮子快消品公司
                        </span>
                        <span class="cart_warehouse_code">
                            (C000001)
                        </span>
                    </div>
                    <svg class="cancel_icon_style right" width="100%" height="100%" viewBox="0 0 34 34"  @click="warehouseDeleteConfirm()">
                        <use :xlink:href="'#cancelIcon'"></use>
                    </svg> 
                </div>
                <div class="cart_main">
                    <div class="cart_goods">
                        <svg class="select_icon_style" @click="goodsSelect()">
                            <use :xlink:href="'#selectedActive'"></use>
                        </svg>
                        <div class="cart_goods_img left">
                            <img src="../../images/goods01.png">
                            <div class="cart_goods_check">库存不足</div>
                        </div>
                        <div class="cart_goods_details">
                            <div class="cart_goods_name ellipsis">
                                康师傅绿茶
                            </div>
                            <div class="cart_goods_sku ellipsis">
                                瓶
                            </div>
                            <div class="cart_goods_price_buy">
                                <div class="cart_goods_price left">
                                    <span>￥</span>30.50
                                </div>
                                <cart-style class="right" 
                                            
                                            @minusCart="minusCart()"
                                            @addCart="addCart()"
                                            >
                                </cart-style>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart_bottom">
                    起订种类：1<span class="space">&nbsp;</span>起送金额： 0.00
                </div>
                <div class="cart_pay">
                    <div class="cart_pay_total left">
                        合计：
                        <span class="cart_pay_total_price">200(不包含运费)</span>
                    </div>
                    <div @click="toPay()" class="cart_pay_button right">
                        结算
                    </div>
                </div>
                 <div class="cart_top">
                    <svg class="select_icon_style" @click="warehouseSelect()">
                        <use :xlink:href="'#selectedDefault'"></use>
                    </svg>
                    <div class="cart_warehouse">
                        <span class="cart_warehouse_name">
                            郑州菜篮子快消品公司
                        </span>
                        <span class="cart_warehouse_code">
                            (C000001)
                        </span>
                    </div>
                    <svg class="cancel_icon_style right" width="100%" height="100%" viewBox="0 0 34 34"  @click="warehouseDeleteConfirm()">
                        <use :xlink:href="'#cancelIcon'"></use>
                    </svg> 
                </div>
                <div class="cart_main">
                    <div class="cart_goods">
                        <svg class="select_icon_style" @click="goodsSelect()">
                            <use :xlink:href="'#selectedActive'"></use>
                        </svg>
                        <div class="cart_goods_img left">
                            <img src="../../images/goods01.png">
                            <div class="cart_goods_check">库存不足</div>
                        </div>
                        <div class="cart_goods_details">
                            <div class="cart_goods_name ellipsis">
                                康师傅绿茶
                            </div>
                            <div class="cart_goods_sku ellipsis">
                                瓶
                            </div>
                            <div class="cart_goods_price_buy">
                                <div class="cart_goods_price left">
                                    <span>￥</span>30.50
                                </div>
                                <cart-style class="right" 
                                            
                                            @minusCart="minusCart()"
                                            @addCart="addCart()"
                                            >
                                </cart-style>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart_bottom">
                    起订种类：1<span class="space">&nbsp;</span>起送金额： 0.00
                </div>
                <div class="cart_pay">
                    <div class="cart_pay_total left">
                        合计：
                        <span class="cart_pay_total_price">200(不包含运费)</span>
                    </div>
                    <div @click="toPay()" class="cart_pay_button right">
                        结算
                    </div>
                </div>               
            </div>
        </section>
<!--         <div v-else class="cart_empty">
            <div>
                <img src="../../images/cartEmpty.png">
            </div>
        </div> -->
        <div class="heightBottom"></div>
<!--         <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
 -->        <confirm-model v-if="showConfirm" @cancel="showConfirm = false;" @confirm="confirmDos()" :confirmText="confirmText"></confirm-model>
<!--         <section class="coverpart" v-if="show">
            <section class="cover-background"></section>
            <section class="cover-content" :class="{'cover-animate' : show, 'cover-animate-leave' : !show}">
                <div class="sa-icon">
                    <img src="../../images/tipIcon.png">
                </div>
                <h2>{{coverText}}</h2>
                <div class="sa-botton">
                    <button class="waiting" @click="waitingCancle">取消</button>
                    <button class="quitlogin"  @click="shopMore">再逛逛</button>
                </div>
            </section>
        </section>
 -->
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import footGuide from 'src/components/footer/footGuide'
    import alertTip from 'src/components/common/alertTip'
    import confirmModel from 'src/components/common/confirmModel'
    import cartStyle from 'src/components/common/cartStyle'
    import {fmoney} from 'src/config/mUtils'
    import {WXcreateInOrderCheck} from 'src/service/getData'
    import loading from 'src/components/common/loading'

    export default {
        data(){
            return{
                alertText: '',
                showAlert: false,
                confirmText: '',
                showConfirm: false,
                confirmType: 0,//1、删除购物车整个仓库的商品；2、删除某个商品
                warehouseCode: '',
                item: {},
                tipType: 0, //alertTip确认键类型：1、转到设置默认地址页面
                showLoading: false, //显示加载动画
                show: false,     //显示提示框
                coverText: '',
                warehouseCode: '',
            }
        },
        mounted(){
            document.body.scrollTop = 0;
        },
        computed: {
            ...mapState([
                'userInfo','cartList','defaultAddress'
            ]),
        },
        components: {
            footGuide,
            alertTip,
            confirmModel,
            cartStyle,
            loading,
        },
        methods: {
            ...mapMutations([
                'ADD_CART','REDUCE_CART','INIT_BUYCART','WAREHOUSE_SELECT_CART','GOODS_SELECT_CART','WAREHOUSE_DELETE_CART','RECORD_CART_GOODS_CHECK'
            ]),
            async toPay(){
                this.$router.push({ name: 'confirmOrder', params: {}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .cart_demo{
        background: #fff;
        margin-bottom: .2rem;
        width: 100%;
        .cart_top{
            margin-left: .84rem;
            padding-top: .3rem;
            border-bottom: .01rem solid #eee;
            height: .88rem;
            background: #fff;
            position: relative;
            .select_icon_style{
                @include wh(.38rem, .38rem);
                position: absolute;
                top: 0;
                left: -.84rem;
                padding-top: .3rem;
                padding-left: .2rem;
                padding-right: .2rem;
                padding-bottom: .2rem;
            }
            .cart_warehouse{
                @include sc(.24rem, #333);
                line-height: .38rem;
                margin-right: .84rem;
                .cart_warehouse_name{
                    font-size: .3rem;
                }
            }
            .cancel_icon_style{
                @include wh(.34rem, .34rem);
                position: absolute;
                top: 0;
                right: 0;
                padding: .32rem .2rem;
                padding-bottom: .22rem;
            }
        }
        .cart_main{
            .cart_goods{
                margin-left: .84rem;
                height: 2.16rem;
                border-bottom: .01rem solid #eee;
                padding-top: .24rem;
                position: relative;
                .select_icon_style{
                    @include wh(.38rem, .38rem);
                    position: absolute;
                    top: 0;
                    left: -.84rem;
                    padding: 0 .2rem;
                    padding-top: .8rem;
                    padding-bottom: .98rem;
                }
                .cart_goods_img{
                    @include wh(1.5rem, 1.5rem);
                    position: relative;
                    img{
                        @include wh(100%, 100%);
                    }
                    .cart_goods_check{
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        height: .4rem;
                        background: rgba(0,0,0,.6);
                        @include sc(.24rem, #fff);
                        line-height: .4rem;
                        text-align: center;
                    }
                }
                .cart_goods_details{
                    margin-left: 1.68rem;
                    margin-right: .2rem;
                    .cart_goods_name{
                        @include sc(.28rem, #333);
                        line-height: .28rem;
                    }
                    .cart_goods_sku{
                        @include sc(.26rem, #848689);
                        margin-top: .1rem;
                        margin-bottom: .43rem;
                    }
                    .cart_goods_price_buy{
                        .cart_goods_price{
                            @include sc(.3rem, $orange);
                            line-height: .56rem;
                            span{
                                @include sc(.24rem, $orange);
                            }
                        }
                        .cart_goods_buy{
                            display: flex;
                            @include wh(2.64rem, .56rem);
                            .cart_goods_buy_minus{
                                @include wh(.78rem, 100%);
                                border: .01rem solid #dcdcdc;
                                border-right: none;
                                border-bottom-left-radius: .08rem;
                                border-top-left-radius: .08rem;
                            }
                            .cart_goods_buy_num{
                                @include wh(1.08rem, 100%);
                                border: .01rem solid #999;
                                @include sc(.28rem, #464645);
                                text-align: center;
                                line-height: .56rem;
                            }
                            .cart_goods_buy_add{
                                @include wh(.78rem, 100%);
                                border: .01rem solid #999;
                                border-left: none;
                                border-top-right-radius: .08rem;
                                border-bottom-right-radius: .08rem;
                            }
                            .buy_icon_style{
                                @include wh(.23rem, .23rem);
                                margin: .165rem .275rem;
                                float: left;
                            }
                        }
                    }
                }
            }
        }
        .cart_bottom{
            margin-left: .84rem;
            @include sc(.28rem, #333);
            height: .84rem;
            line-height: .84rem;
            .space{
                width: .38rem;
                display: inline-block;
            }
        }
        .cart_pay{
            @include wh(100%, .94rem);
                    line-height: .94rem;
            border-top: .01rem solid $bgColor;
            .cart_pay_total{
                @include sc(.3rem, #333);
                padding-left: .2rem;
                .cart_pay_total_price{
                    color: $orange;
                }
            }
            .cart_pay_button{
                background-color: $orange;
                @include wh(2.2rem, 100%);
                @include sc(.34rem, #fff);
                text-align: center;
            }
        }
    }
    .cart_empty{
        div{
            margin-top: 3.5rem;
            text-align: center;
            img{
                @include wh(2.64rem, 2.3rem);
            }
        }
    }

    .coverpart{
        @include wh(100%,100%);
        @include allcover;
        z-index: 200;
        .cover-background{
            @include wh(100%,100%);
            @include allcover;
            background: rgba(0,0,0,.7);
            z-index:100;
        }
        .cover-content{
            width: 5.4rem;
            background: #fff;
            padding: .2rem;
            position:absolute;
            top:50%;
            left:50%;
            z-index:1000;
            margin-top: -1.75rem;
            margin-left: -2.7rem;
            @include borderRadius(.1rem);
            .sa-icon{
                @include borderRadius(50%);
                margin:.2rem 0 .3rem;
                position:relative;
                text-align: center;
                @include wh(100%, 1.16rem);
                img{
                    @include wh(1.16rem, 1.16rem);
                }
            }
            h2{
                @include wh(100%, .3rem);
                text-align:center;
                @include sc(.3rem,#333);
                line-height: .3rem;
            }
            .sa-botton{
                margin-top: .38rem;
                @include wh(100%, .8rem);
                clear: both;
                button{
                    float: left;
                    width: 2.4rem;
                    display:inline-block;
                    @include borderRadius(.08rem);
                    @include sc(.3rem, #fff);
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                }
                .waiting{
                    background:#C1C1C1;
                    margin-right: .1rem;
                }
                .quitlogin{
                    margin-left: .1rem;
                    background: $orange;
                }
            }

        }
    }
    @-webkit-keyframes bounceIn {
      from, 20%, 40%, 60%, 80%, 100% {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      }

      0% {
        opacity: 0;
        -webkit-transform: scale3d(.3, .3, .3);
        transform: scale3d(.3, .3, .3);
      }

      20% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1);
        transform: scale3d(1.1, 1.1, 1.1);
      }

      40% {
        -webkit-transform: scale3d(.9, .9, .9);
        transform: scale3d(.9, .9, .9);
      }

      60% {
        opacity: 1;
        -webkit-transform: scale3d(1.03, 1.03, 1.03);
        transform: scale3d(1.03, 1.03, 1.03);
      }

      80% {
        -webkit-transform: scale3d(.97, .97, .97);
        transform: scale3d(.97, .97, .97);
      }

      100% {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }
    }

    @keyframes bounceIn {
      from, 20%, 40%, 60%, 80%, 100% {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      }

      0% {
        opacity: 0;
        -webkit-transform: scale3d(.3, .3, .3);
        transform: scale3d(.3, .3, .3);
      }

      20% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1);
        transform: scale3d(1.1, 1.1, 1.1);
      }

      40% {
        -webkit-transform: scale3d(.9, .9, .9);
        transform: scale3d(.9, .9, .9);
      }

      60% {
        opacity: 1;
        -webkit-transform: scale3d(1.03, 1.03, 1.03);
        transform: scale3d(1.03, 1.03, 1.03);
      }

      80% {
        -webkit-transform: scale3d(.97, .97, .97);
        transform: scale3d(.97, .97, .97);
      }

      100% {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }
    }
    @-webkit-keyframes zoomOut {
      from {
        opacity: 1;
      }

      50% {
        opacity: 0;
        -webkit-transform: scale3d(.3, .3, .3);
        transform: scale3d(.3, .3, .3);
      }

      100% {
        opacity: 0;
      }
    }

    @keyframes zoomOut {
      from {
        opacity: 1;
      }

      50% {
        opacity: 0;
        -webkit-transform: scale3d(.3, .3, .3);
        transform: scale3d(.3, .3, .3);
      }

      100% {
        opacity: 0;
      }
    }
    .coverpart .cover-animate{
        transition:all 1s;
        animation:bounceIn .6s;
    }
    .coverpart .cover-animate-leave{
        animation:zoomOut .4s;
    }
</style>
