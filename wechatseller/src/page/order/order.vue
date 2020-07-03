 <template>
    <div class="first_level_page">
        <section class="tab_section">
            <div class="tab active"  @click="getAllOrderList">全部</div>
            <div class="tab" @click="getNoPayList">待支付</div>
            <div class="tab" @click="getNoInspectionList">待发货</div>
            <div class="tab" @click="getNoSureList">待收货</div>
            <div class="tab" @click="getCompletedList">已完成</div>
        </section>

        <scroll ref="orderlistscroll" class="wrapper">
            <div ref="orderwrapper" class="content">
                <div class="order_demo">
                    <div class="order_top" @click="showOrderDetail()">
                        <div class="left">001</div>
                        <div class="right">2018-08-12</div>
                    </div>
                    <div class="order_middle" @click="showOrderDetail()">
                        <div class="order_middle_top clear">
                            <div class="left">订单金额：￥300</div>
                            <div class="right">采购数量：20</div>
                        </div>
                        <div class="order_middle_bottom clear">
                            订单状态：<span>已支付</span>
                        </div>
                        <div class="arrow">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 20">
                                <polyline points="0,0 14,10 0,20" style="fill:none;stroke:rgb(153,153,153);stroke-width:4"/>
                            </svg> 
                        </div>
                    </div>
                     <div class="order_bottom">
                        <div class="order_btn left" @click.stop="cancelOrder(item.orderId)">
                            取消订单
                        </div>
<!--                   
                        <a class="order_btn left" v-else-if="item.orderState==2" href="tel:037155525080">
                            联系客服
                        </a>  -->
                    </div>
                </div>
                <div class="order_demo">
                    <div class="order_top" @click="showOrderDetail(item)">
                        <div class="left">001</div>
                        <div class="right">2018-08-12</div>
                    </div>
                    <div class="order_middle" @click="showOrderDetail(item)">
                        <div class="order_middle_top clear">
                            <div class="left">订单金额：￥300</div>
                            <div class="right">采购数量：20</div>
                        </div>
                        <div class="order_middle_bottom clear">
                            订单状态：<span>待支付</span>
                        </div>
                        <div class="arrow">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 20">
                                <polyline points="0,0 14,10 0,20" style="fill:none;stroke:rgb(153,153,153);stroke-width:4"/>
                            </svg> 
                        </div>
                    </div>
                    <div class="order_bottom">
                        <div class="order_btn left" @click.stop="payMoney(item)">
                                去付款
                        </div>
                    </div>
                </div>
                <div class="order_demo">
                    <div class="order_top" @click="showOrderDetail(item)">
                        <div class="left">001</div>
                        <div class="right">2018-08-12</div>
                    </div>
                    <div class="order_middle" @click="showOrderDetail(item)">
                        <div class="order_middle_top clear">
                            <div class="left">订单金额：￥300</div>
                            <div class="right">采购数量：20</div>
                        </div>
                        <div class="order_middle_bottom clear">
                            订单状态：<span>已完成</span>
                        </div>
                        <div class="arrow">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 20">
                                <polyline points="0,0 14,10 0,20" style="fill:none;stroke:rgb(153,153,153);stroke-width:4"/>
                            </svg> 
                        </div>
                    </div>
                    <div class="order_bottom">
                        <a class="order_btn left" href="tel:00000000000">
                            联系客服
                        </a>
                    </div>
                </div>
            </div>
            <div class="loading-wrapper"></div>
        </scroll>

<!--         <div v-if="Object.keys(data).length == 0" class="no_data">
            <img src="../../images/no_data.png" alt="">
        </div>  -->

        <div class="clear"></div>

        <section class="coverpart" v-if="show">
            <section class="cover-background"></section>
            <section class="cover-content " :class="{'cover-animate' : isEnter, 'cover-animate-leave' : isLeave}">
                <div class="sa-icon">
                    <img src="../../images/tipIcon.png">
                </div>
                <h2>确定取消订单吗？</h2>
                <div class="sa-botton">
                    <button class="waiting" @click.stop="waitingThing">再等等</button>
                    <button class="quitlogin"  @click.stop="confirm">确定</button>
                </div>
            </section>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
<!--         <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition> -->
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
 
    </div>
</template>

<script>
    import scroll from 'src/components/common/scroll'
    import {mapState, mapMutations} from 'vuex'
    import computeTime from 'src/components/common/computeTime'
    import loading from 'src/components/common/loading'
    import {getImgPath,loadMore} from 'src/components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'
    import {getOrderList, getNoPayList, getNoInspectionList, getNoSureList, getCompletedList, getOfenSalesList, cancelMyInOrder, WXcheckThirdPartyPay} from 'src/service/getData'
    import {formatDate} from 'src/config/date.js'
    import alertTip from 'src/components/common/alertTip'


    export default {
      data(){
            return{
                data: [],//订单列表
                pulldown: true,
                pullup: true,
                loadingDownStatus: {
                    isShow: true,
                    status: '正在加载...'
                },
                loadingUpStatus: {
                    isShow: true,
                    status: '正在加载...'
                },
                loadFinish: false,
                counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
                num : 10,  // 一次显示多少条
                pageStart : 0, // 开始页数
                pageEnd : 10, // 结束页数
                showLoading: true, //显示加载动画
                imgBaseUrl:'', // 图片地址
                orderStepFlag:'0', //订单状态标记
                show:false,     //显示提示框
                isEnter:true,  //是否登录
                isLeave:false, //是否退出
                orderId:'',     //订单id
                buyInfo:'',     //订单商品信息
                totalMoney:0,   //订单总金额
                warehouseCode: '',  //仓库编号
                voucherCode:'',  //礼券编号
                showAlert: false,
                alertText: '',
            }
        },
        mounted(){
            
        },
        components: {
            loading,
            computeTime,
            scroll,
            alertTip
        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        filters:{

        },
        methods: {
             ...mapMutations([
               'SAVE_ORDER'
            ]),
            //初始化获取信息
            async loadRefreshData(){
             
            },
            //加载更多
            async loadData(){
                
            },
            //显示所有订单列表
            getAllOrderList(){
                this.orderStepFlag='0';
            }, 
            //显示待支付订单列表
            getNoPayList(){
                this.orderStepFlag='1';
            }, 
            //显示待发货订单列表
            getNoInspectionList(){
               this.orderStepFlag='2'; 
            },  
            //显示待收货订单列表
            getNoSureList(){
                this.orderStepFlag='3';
            },  
            //显示已完成订单列表
            getCompletedList(){
                this.orderStepFlag='4';
            },          
            //显示订单详情页
            showOrderDetail(obj){
                this.$router.push({path: '/order/orderDetail', query: {}});
            },
            cancelOrder(orderid){
                this.show=true;
                this.isEnter=true;
                this.isLeave=false;
                this.orderId=orderid;
            },
            async payMoney(orderobj){
                
            },
            async payBalanceMoney(orderid,totalMoney){

            },
            async waitingThing(){

            },
            async confirm(){

            },
            getOrderState(orderStep, orderState){
                if(orderState == 0) {
                    return '已关闭';
                } else if (orderState == 3) {
                    return '取消中';
                } else if (orderState == 4) {
                    return '已关闭';
                } else if (orderStep == 1 &&orderState == 1) {
                    return '待支付';
                } else if (orderStep == 2 && orderState == 1) {
                    return '待支付确认';
                } else if (orderStep == 3 || orderStep == 4 || orderStep == 5) {
                    return '已订货';
                } else if (orderStep == 6 && orderState == 1) {
                    return '已发货';
                } else if (orderStep == 8 && orderState == 1) {
                    return '待验货';
                } else if (orderStep == 9 && orderState == 1) {
                    return '验货中';
                } else if (orderStep == 10 && orderState == 1) {
                    return '验货中';
                } else if (orderStep == 11 && orderState == 1) {
                    return '已验货';
                } else if (orderStep == 12 && orderState == 1) {
                    return '待确认交货';
                } else if (orderStep == 13 && orderState==2) {
                    return '已完成';
                } else if (orderStep == 14 && orderState == 1) {
                    return '待退货清点';
                } else if (orderStep == 15 && orderState == 1) {
                    return '退货清点中';
                } else if (orderStep == 16 && orderState == 2) {
                    return '已完成';
                }
            },
            //生产环境与发布环境隐藏loading方式不同
            hideLoading(){
                this.showLoading = false;
            },
        },
        watch: {
            $route: function(value){
                
            }
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
    .wrapper{
        position: absolute;
        top: .88rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }
    #orderListWrapper{
        position: absolute;
        top: .88rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }
    .order_demo{
        background: #fff;
        margin-top: .2rem;
        .order_top{
            @include wh(100%, .76rem);
            padding: 0 .2rem;
            border-bottom: .01rem solid #e3e3e3;
            line-height: .76rem;
            div{
                @include sc(.28rem, #ccc);
            }
        }
        .order_middle{
            position: relative;
            padding: .16rem 1.14rem 0 .2rem;
            border-bottom: .01rem solid #e3e3e3;
            @include wh(100%, 1.32rem);
            div{
                @include sc(.28rem, #333);
                height: .52rem;
                line-height: .52rem;
            }
            .order_middle_bottom{
                span{
                    color: $orange;
                }
            }
            .arrow{
                position: absolute;
                top: .51rem;
                right: .2rem;
                svg{
                    @include wh(.19rem, .3rem);
                    float: left;
                }
            }
        }
        .order_bottom{
            background: #fff;
            @include wh(100%, .78rem);
            padding: .12rem .2rem;
            .order_btn{
                @include wh(1.6rem, .54rem);
                @include sc(.28rem, #333);
                border-radius: .04rem;
                border: .01rem solid #a2a2a2;
                line-height: .52rem;
                text-align: center;
                margin-right: .2rem;
            }
        }
    }
    .no_data{
        position: absolute; 
        top: .88rem; 
        left: 0; 
        right: 0; 
        bottom: 0; 
        text-align: center; 
        padding-top: 3rem; 
        background: #f4f4f4; 
        z-index: 10;
        img{
            @include wh(1.88rem, 2.6rem);
        }
    }
    .coverpart{
        @include wh(100%,100%);
        @include allcover;
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
            top:5rem;
            left:50%;
            z-index:1000;
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
                display: flex;
                button{
                    flex: 1;
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
    .tab_section{
        display: flex;
        @include wh(100%, .88rem);
        line-height: .88rem;
        @include sc(.28rem, #333);
        background: #fff;
        .tab{
            flex: 1;
            text-align: center;
            margin: 0 .2rem;
        }
        .tab.active{
            color: $orange;
            border-bottom: .04rem solid $orange;
        }
    }
</style>
