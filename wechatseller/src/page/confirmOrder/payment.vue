 <template>
    <div class="first_level_page">
        <svg style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 38 38" id="circleSelectedActive"> 
                    <circle cx="19" cy="19" r="19" stroke-width="0" fill="#ffa101"/>
                    <line x1="8" y1="18" x2="16" y2="27"
                    style="stroke:#fff;stroke-width:2"/>
                    <line x1="16" y1="27" x2="31" y2="12"
                    style="stroke:#fff;stroke-width:2"/>
                </symbol>

                <symbol viewBox="0 0 38 38" id="circleSelectedDefault"> 
                    <circle cx="19" cy="19" r="17" stroke="rgb(229,229,229)"
                    stroke-width="2" fill="white"/>
                </symbol>

                <symbol viewBox="0 0 38 38" id="squareSelectedActive">
                    <rect x="1" y="1" rx="6" ry="6" width="36"
                    height="36" style="fill:white;stroke:#ffa101;stroke-width:2"/>
                    <line x1="8" y1="18" x2="16" y2="27"
                    style="stroke:#ffa101;stroke-width:2"/>
                    <line x1="16" y1="27" x2="31" y2="12"
                    style="stroke:#ffa101;stroke-width:2"/>
                </symbol>

                <symbol viewBox="0 0 38 38" id="squareSelectedDefault">
                    <rect x="1" y="1" rx="6" ry="6" width="36"
                    height="36" style="fill:white;stroke:rgb(229,229,229);stroke-width:2"/>
                </symbol>
            </defs>
        </svg>
        <div class="need_pay_container">
            应付金额：<span class="need_pay">￥0</span>
        </div>
        <div class="user_amount_container">
            <div class="user_amout_title">
                <img src="../../images/amountIcon.png">账户余额
            </div>
            <div class="user_amount_text">
                <span class="total_amount">账户余额：￥0</span>
                可用余额：<span class="available_amount">￥0</span>
            </div>
            <div class="icon_select_container" @click="amountSelect">
                <svg class="icon_style" >
                    <use href="#squareSelectedDefault"></use>
                </svg>
            </div>
        </div>
        <div class="pay_type_container">
            <div class="pay_type_demo"> 
                <div class="pay_type_title">
                    <img src="../../images/weixin.png">
                    <span>微信支付</span>
                </div>
                <div v-if="payType == 2" class="pay_type_value">
                    支付：<span>￥0</span>
                </div>
                <div class="icon_select_container" @click="payTypeSelect(2)">
                    <svg class="icon_style" >
                        <use href="#circleSelectedDefault"></use>
                    </svg>
                </div>
            </div>
            <div v-if="routerType == ''" class="pay_type_demo"> 
                <div v-if="payType == 4" class="pay_type_value">
                    支付：<span>￥9.67</span>
                </div>
                <div class="icon_select_container" @click="payTypeSelect(4)">
                    <svg class="icon_style" >
                        <use href="#circleSelectedDefault"></use>
                    </svg>
                </div>
            </div>
            <div class="pay_type_demo"> 
                <div class="pay_type_title">
                    <img src="../../images/hdfk.png">
                    <span>货到付款</span>
                </div>
                <div v-if="payType == 3" class="pay_type_value">
                    支付：<span>￥0</span>
                </div>
                <div class="icon_select_container" @click="payTypeSelect(3)">
                    <svg class="icon_style" >
                        <use href="#circleSelectedDefault"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="next_step_btn_container">
            <div class="next_step_btn" @click="nextStep">立即支付</div>
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <pay-password v-show="payShow" @closeMask="payShow = false" @pwdDone="pwdDone"></pay-password>
        <!-- 支付密码输入错误提示框 -->
        <div class="error_pwd" v-show="pwdErrorShow">
            <div class="error_main">
                <div class="error_text">
                    支付密码错误，请重试
                </div>
                <div class="error_btn">
                    <div class="forget_pwd" @click="forgetPwd">忘记密码</div>
                    <div class="try_again" @click="tryAgain">重试</div>
                </div>
            </div>
        </div>
        <div id="payTypeMoney" style="display:none">99</div>
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
    import {WXcheckbalance, validatePayPwd, WXbalanceFullPay, payInOrderCheck, getPayDate, payOrderUseNoneMoney, getJsConfig, getInOrderState,WXupdatePayChannel,getSellerInfo,WXcreditPay} from 'src/service/getData'
    import alertTip from 'src/components/common/alertTip'
    import payPassword from 'src/components/common/payPassword'
    import {fmoney} from 'src/config/mUtils'
    import {baseUrl} from 'src/config/env'
    import wx from 'weixin-js-sdk'
    import loading from 'src/components/common/loading'

    export default {
        data(){
            return{
                orderId: '', //订单ID
                payMoney: 0.00, //应付金额
               	payType: 0, //付款方式：1、支付宝；2、微信；3、货到付款
                isAmount: false, //是否使用账户余额
                payTypeMoney: 0.00, //除去账户余额部分需支付的金额
                showAlert: false,
                alertText: '',
                payShow: false,
                pwdErrorShow: false,
                buyInfo: '',
                voucherCode: '',
                warehouseCode: '',
                jsurl:'',
                wx,
                openId:'',
                baseUrl,
                payChannel:0,
                type:0,//1：在线支付，2：货到付款
                sellerAmount:0.00,//用户余额本金
                SellerRewardAmount:0.00,//用户余额奖励金
                frozenAmount:0.00,//冻结金额
                showLoading: false, //显示加载动画
                theMoney:0.00,//账户余额
                useMoney:0.00,//可用余额
                creditAmount:0.00,//授信额度
                routerType: '',
                pwdType: 0,//支付密码输入正确之后付款类型：1、全余额支付；2、翼分期
            }
        },
        components: {
            alertTip,
            payPassword,
            loading,
        },
        mounted(){

        },
        beforeDestroy(){
            clearInterval(this.timer);
        },
        props:[],
        computed: {
            ...mapState([
                'userInfo', 
            ])
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO', 'CLEAR_CART'
            ]),
            fmoney(s, n){
                return fmoney(s, n)
            },
            showTip(alertText){
                this.alertText = alertText;
                this.showAlert = true;
            }
        },
        watch:{
            
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
    .need_pay_container{
        @include wh(100%, 1.02rem);
        background: #fff;
        @include sc(.32rem, #333);
        line-height: .32rem;
        padding-top: .36rem;
        padding-left: .24rem;
        margin-bottom: .2rem;
        .need_pay{
            color: $orange;
        }
    }
    .user_amount_container{
        background: #fff;
        @include wh(100%, 1.38rem);
        padding-left: .24rem;
        position: relative;
        margin-bottom: .2rem;
        .user_amout_title{
            @include sc(.3rem, #333);
            padding-top: .26rem;
            line-height: .38rem;
            height: .64rem;
            img{
                @include wh(.4rem, .38rem);
                vertical-align: middle;
                margin-right: .22rem;
            }
        }
        .user_amount_text{
            @include sc(.26rem, #666);
            margin-top: .22rem;
            line-height: .26rem;
            height: .26rem;
            .total_amount{
                margin-right: .35rem;
            }
            .available_amount{
                color: $orange;
            }
        }
    }
    .icon_select_container{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        padding: 0 .2rem;
        padding-top: .3rem;
        svg{
            @include wh(.38rem, .38rem);
            float: left;
        }
    }
    .pay_type_container{
        background: #fff;
        .pay_type_demo{
            @include wh(100%, 1.42rem);
            padding-left: .24rem;
            border-bottom: .01rem solid #ededed;
            position: relative;
            .pay_type_title{
                padding-top: .28rem;
                @include sc(.3rem, #333);
                line-height: .4rem;
                height: .68rem;
                img{
                    @include wh(.4rem, .4rem);
                    vertical-align: middle;
                    margin-right: .22rem;
                }
                .side_title{
                    @include sc(.28rem, #666);
                    margin-right: .8rem;
                }
            }
            .pay_type_value{
                @include sc(.26rem, #666);
                margin-top: .24rem;
                line-height: .26rem;
                height: .26rem;
                span{
                    color: $orange;
                }
            }
        }
        .pay_type_demo:last-child{
            border-bottom: none;
        }
    }
    .next_step_btn_container{
        margin-top: .42rem;
        @include wh(100%, .88rem);
        padding: 0 .26rem;
        .next_step_btn{
            @include wh(100%, .88rem);
            text-align: center;
            @include sc(.34rem, #fff);
            line-height: .88rem;
            background: $orange;
            border-radius: .1rem;
        }
    }
    .error_pwd{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .6);
        .error_main{
            position: absolute;
            top: 45%;
            left: 1rem;
            right: 1rem;
            background: #fff;
            border: none;
            border-radius: .2rem;
            height: 1.8 rem;
            margin-top: -.9rem;
            .error_text{
                @include wh(100%, 1rem);
                line-height: 1rem;
                @include sc(.32rem, #333);
                text-align: center;
                font-weight: bold;
                border-bottom: .01rem solid #dedede;
            }
            .error_btn{
                display: flex;
                text-align: center;
                line-height: .8rem;
                @include wh(100%, .8rem);
                .forget_pwd{
                    flex: 1;
                    border-right: .01rem solid #dedede;
                    @include sc(.34rem, $orange);
                }
                .try_again{
                    flex: 1;
                    @include sc(.34rem, $orange);
                }
            }
        }
    }
</style>
